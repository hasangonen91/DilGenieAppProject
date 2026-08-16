/**
 * DilGenie AI Dev Bot — OpenRouter üzerinden günlük otomatik geliştirme.
 *
 * Akış:
 *  1. ROADMAP.md'deki ilk `- [ ]` görevi bul
 *  2. Görevle ilgili dosyaları oku, OpenRouter modeline bağlam olarak gönder
 *  3. Modelin döndürdüğü edit'leri uygula (her "old" string birebir eşleşmeli)
 *  4. tsc --noEmit + eslint çalıştır, hata varsa değişiklikleri geri al
 *  5. Temizse: yeni branch, commit, push, PR aç (ROADMAP görevi [x] yapılır)
 *
 * Çalışma ortamı: Node >= 18, git + gh CLI kurulu olmalı.
 * Env: OPENROUTER_API_KEY (zorunlu), GH_TOKEN (zorunlu), COPYRIGHT_BOT (ops.)
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const REPO = process.env.GITHUB_REPOSITORY || 'hasangonen91/DilGenieAppProject';
const BRANCH_BASE = 'main';
const MODEL = process.env.BOT_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free';
const API_KEY = process.env.OPENROUTER_API_KEY;
const BOT_NAME = process.env.BOT_NAME || 'DilGenie AI Dev Bot';
const MAX_EDITS = 12;

if (!API_KEY) {
  console.error('❌ OPENROUTER_API_KEY gerekli');
  process.exit(1);
}

function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts }).trim();
}

// Komutu çalıştır; hata olursa hatanın stdout+stderr çıktısını döndür, temizse null
function runQuiet(cmd) {
  try {
    sh(cmd);
    return null;
  } catch (e) {
    return String(e.stdout || '') + String(e.stderr || '');
  }
}

function read(p) {
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

function readdirSafe(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function walk(dir, base = '') {
  const out = [];
  for (const entry of readdirSafe(dir)) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'android', 'ios', 'Podfile.lock'].includes(entry.name)) continue;
      out.push(`${rel}/`);
      out.push(...walk(full, rel));
    } else {
      out.push(rel);
    }
  }
  return out;
}

// Mevcut açık AI PR var mı? Varsa aynı görev tekrar denenmesin.
function openAiPrExists() {
  try {
    const out = sh(`gh pr list --repo ${REPO} --state open --json headRefName,title --limit 50`);
    const prs = JSON.parse(out);
    return prs.some((p) => p.headRefName.startsWith('ai/dev-'));
  } catch {
    return false;
  }
}

// ROADMAP.md'den ilk yapılmamış görevi çek ve [x] yap
function pickTask() {
  const rm = read('ROADMAP.md');
  if (!rm) throw new Error('ROADMAP.md bulunamadı');
  const lines = rm.split('\n');
  let taskText = null;
  let taskIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^\s*- \[ \]/)) {
      taskText = lines[i].replace(/^\s*- \[ \]\s*/, ''); // başlık kısmı
      taskIdx = i;
      break;
    }
  }
  if (!taskText) return null; // hepsi bitti
  // Görev başlığını "**X** — açıklama" formatından ayıkla
  const m = taskText.match(/^\*\*(.+?)\*\*\s*—\s*(.*)/);
  const title = m ? m[1].trim() : taskText.split('—')[0].trim();
  const detail = m ? m[2].trim() : taskText;
  // ROADMAP'te görevi [x] yap (PR'a dahil edilecek)
  lines[taskIdx] = lines[taskIdx].replace('- [ ]', '- [x]');
  writeFileSync('ROADMAP.md', lines.join('\n'));
  return { title, detail, rawLine: lines[taskIdx] };
}

// Görev metnindeki yol ifadelerini topla (örn. src/pages/.../*.tsx)
function taskFiles(detail) {
  const found = new Set();
  const re = /[A-Za-z0-9_./\-]+\.(tsx?|jsx?|json)/g;
  for (const m of detail.matchAll(re)) {
    const p = m[0].replace(/^\.\//, '');
    if (existsSync(p) && statSync(p).isFile()) {
      found.add(p);
    }
  }
  return [...found];
}

// OpenRouter çağrısı (retry + JSON parse)
async function callModel(messages, { json = true } = {}) {
  const body = {
    model: MODEL,
    messages,
    temperature: 0.3,
    max_tokens: 16000,
  };
  if (json) body.response_format = { type: 'json_object' };

  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
          'HTTP-Referer': `https://github.com/${REPO}`,
          'X-Title': 'DilGenie AI Dev Bot',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start === -1 || end <= start) throw new Error('JSON blok bulunamadı');
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch (e) {
      lastErr = e;
      console.log(`⚠️  deneme ${attempt} başarısız: ${e.message}`);
      await new Promise((r) => setTimeout(r, 5000 * attempt));
    }
  }
  throw lastErr;
}

// Modelin döndürdüğü edit'leri uygula
function applyEdits(edits) {
  const applied = [];
  if (!Array.isArray(edits)) throw new Error('edits bir dizi değil');
  for (const e of edits) {
    if (!e || typeof e.path !== 'string') throw new Error('geçersiz edit: path yok');
    if (e.type === 'create') {
      if (!e.content) throw new Error(`create ${e.path}: content eksik`);
      mkdirSync(path.dirname(e.path), { recursive: true });
      writeFileSync(e.path, e.content);
      applied.push(`+ ${e.path} (yeni)`);
    } else if (e.type === 'edit' || (!e.type && e.old !== undefined)) {
      const oldText = e.old;
      const newText = e.new;
      if (typeof oldText !== 'string' || typeof newText !== 'string') {
        throw new Error(`edit ${e.path}: old/new eksik`);
      }
      const cur = read(e.path);
      if (cur === null) throw new Error(`edit ${e.path}: dosya yok`);
      const count = cur.split(oldText).length - 1;
      if (count !== 1) {
        throw new Error(`edit ${e.path}: 'old' ${count} kez eşleşti (1 olmalı). Model çıktısı hatalı.`);
      }
      writeFileSync(e.path, cur.replace(oldText, newText));
      applied.push(`~ ${e.path}`);
    } else {
      throw new Error(`bilinmeyen edit tipi: ${JSON.stringify(e).slice(0, 120)}`);
    }
  }
  return applied;
}

// Web araştırması: görev başlığından anahtar kelimelerle DuckDuckGo'da arama yap,
// sonuçları kısa bağlam olarak döndür (model için bilgi kaynağı)
async function webResearch(taskTitle) {
  const keywords = taskTitle
    .replace(/^\[.*?\]\s*/, '')
    .replace(/[^\w\sÇĞİÖŞÜçğıöşü]/g, ' ')
    .trim();
  if (keywords.length < 6) return '';
  const queries = [
    `duolingo babbel language learning app ${keywords}`,
    `english vocabulary ${keywords} common words list`,
  ];
  const results = [];
  for (const q of queries.slice(0, 2)) {
    try {
      const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } });
      if (!res.ok) continue;
      const html = await res.text();
      // <a class="result__a">...</a> başlıklarını ve snippet'lerini çıkar
      const links = [...html.matchAll(/result__a[^>]*>(.*?)<\/a>/g)].slice(0, 5)
        .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim())
        .filter(Boolean);
      const snips = [...html.matchAll(/result__snippet[^>]*>(.*?)<\/a>/g)].slice(0, 5)
        .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim())
        .filter(Boolean);
      results.push(`Sorgu: ${q}\n${links.map((l, i) => `- ${l}${snips[i] ? ': ' + snips[i] : ''}`).join('\n')}`);
    } catch (e) {
      // sessizce geç
    }
  }
  return results.join('\n\n');
}

async function main() {
  const started = Date.now();
  console.log(`🤖 ${BOT_NAME} başladı (model: ${MODEL})`);

  // Git başlangıç durumu
  sh(`git checkout ${BRANCH_BASE} && git pull origin ${BRANCH_BASE}`);

  // Açık AI PR varsa bugün pas geç
  if (openAiPrExists()) {
    console.log('⏭️  Açık ai/dev-* PR var, bugün atlıyorum (merge edilmesi bekleniyor)');
    return;
  }

  const task = pickTask();
  if (!task) {
    console.log('✅ ROADMAP tamamlandı — yapılacak görev kalmadı 🎉');
    return;
  }
  console.log(`🎯 Görev: ${task.title}`);

  // Bağlam topla: dosya ağacı + ilgili dosyalar + package.json + ROADMAP
  const tree = walk('src').filter((p) => !p.endsWith('.mp4') && !p.endsWith('.png') && !p.endsWith('.ttf')).join('\n');
  const contextFiles = [...taskFiles(task.detail), 'package.json'];
  const fileContents = [];
  for (const f of contextFiles) {
    const c = read(f);
    if (c !== null) {
      fileContents.push(`=== DOSYA: ${f} ===\n${c.slice(0, 20000)}`);
    }
  }
  const roadmap = read('ROADMAP.md') || '';

  // Web araştırması: görev başlığından anahtar kelimelerle sektörel/best-practice bilgisi topla
  const research = await webResearch(task.title);

  const systemPrompt = `Sen ${BOT_NAME}sın. ${REPO} adlı React Native (TypeScript) dil öğrenme uygulamasını geliştiriyorsun.
Kurallar:
- Bu PREMIUM bir dil öğrenme uygulaması: Duolingo / Babbel / Busuu seviyesinde kalite hedefle. Kod kalitesi, UX ve estetik profesyonel olmalı.
- ASLA emoji kullanma (kod, yorum, metin, UI string, log — her yerde YASAK). Yalnızca UTF-8 metin sembolleri kullanılabilir. UI'daki simgeler için metin/ikon kütüphanesi kullan.
- TEMA SADAKATİ: Uygulamanın mevcut renk paletini, stil yapısını ve tasarım dilini KORU. Mevcut stil dosyalarını (styles.tsx) temel al, yeni renkler/desenler dayatma. Mevcut tema ile uyumlu ilerle.
- COMPONENT MİMARİSİ: Mevcut bileşen yapısına saygı göster. Tekrar eden UI öğelerini (buton, kart, modal) doğru bileşene bağla. Her bileşen tek sorumluluk taşımalı; bir dosya 400 satırı geçecekse parçala. Props tiplerini interface ile tanımla, any tipini kullanma. Yaptığın ekleme mevcut mimariyle çelişiyorsa mevcut mimariyi koru.
- KOD KALİTESİ: console.log ile debug kodu bırakma, kullanılmayan import ortaya çıkarma, sessiz catch blogu yazma (en azından log bas). Yazdığın her fonksiyon TS'te tip güvenli olmalı.
- Önce MEVCUT dosyaları incele, mevcut kod stiline ve bileşen yapısına saygı göster. Gereksiz değişiklik yapma.
- Yalnızca verilen bağlamdaki dosyaları ve görevde adı geçen dosyaları değiştir.
- Yeni dosya gerekiyorsa type:"create" kullan, dosyanın TAM içeriğini ver.
- Mevcut dosyayı değiştiriyorsan type:"edit" kullan; "old" alanı dosyada BİREBİR ve TAM 1 kez olmalı, "new" ile değiştir.
- Kod yazarken proje stilini takip et (function component, .tsx uzantı, mevcut import düzeni).
- Eklediğin her şey TypeScript'te derlenmeli ve eslint kurallarına uymalı.
- Asla App.tsx'teki köklü navigasyonu bozma, yeni ekranı mevcut navigasyon yapısına uygun ekle.
- REACT NATIVE ORTAMINDA ÇALIŞIYORSUN: localStorage, window, document, navigator (tarayıcı API'leri) YOKTUR. Kalıcı veri için @react-native-async-storage/async-storage (import AsyncStorage from '@react-native-async-storage/async-storage') veya react-native-mmkv kullan.
- Zustand persist kullanımı için TAM GEÇERLİ ÖRNEK (zustand v4.5.2, TS — BİREBİR bu kalıbı uygula):
  import { create } from 'zustand';
  import { persist, createJSONStorage } from 'zustand/middleware';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  type MyState = {
    items: string[];
    addItem: (s: string) => void;
  };

  export const useMyStore = create<MyState>()(
    persist(
      (set) => ({
        items: [],
        addItem: (s) => set((state) => ({ items: [...state.items, s] })),
      }),
      {
        name: 'my-store',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  );
  Not: 'create<MyState>()(...)' CURRIED form zorunlu (iki parantez). düz 'create(persist(...))' yazma, TS hatası verir. createJSONStorage küçük c ile.
- ASLA test dosyası yazma: __tests__ klasörü, *.test.ts, *.spec.ts YASAK. Sadece production kaynak kodu üret.
- Güncelleme/dağıtım: projede react-native-livepatch (CodePush'un ücretsiz alternatifi, JS/asset anında güncelleme) ve react-native-starship (kablosuz deploy) paketleri VAR. import { LivePatch } from 'react-native-livepatch' ile LivePatch.configure + sync() kullanılabilir. Bu paketlerin modüllerine kendi istediğin gibi import yapabilirsin.
- Görev bir "altyapı"/"modül" ise production dosyalarının TAMAMINI tek seferde üret (servis, tipler, store). Import ettiğin her dosyayı mutlaka create et, eksik bırakma.
- Veri ekleme görevlerinde (kelime, soru, kategori): MEVCUT veri formatına ve seviye/bağlama uygun, dilbilgisi doğru, gerçekçi ve kullanışlı içerik üret. Kaliteyi düşürme, tekrara düşme.
- Verilen "WEB ARAŞTIRMASI" bölümündeki bilgileri görevi yaparken dikkate al.
- Yalnızca JSON cevap ver, başka metin yazma.`;

  const userPrompt = `# GÖREV (ROADMAP'ten)
Başlık: ${task.title}
Ayrıntı: ${task.detail}

# WEB ARAŞTIRMASI (görevle ilgili güncel best practice / içerik önerisi)
${research || '(araştırma yapılamadı, mevcut bilgiyle ilerle)'}

# DOSYA AĞACI (src/)
${tree}

# İLGİLİ DOSYA İÇERİKLERİ
${fileContents.join('\n\n').slice(0, 120000)}

# ROADMAP (bağlam için)
${roadmap.slice(0, 4000)}

Cevap JSON formatında olmalı:
{
  "summary": "kısa Türkçe özet, ne yaptın",
  "edits": [
    {"type": "edit", "path": "dosya/yolu", "old": "mevcut metin (birebir)", "new": "yeni metin"},
    {"type": "create", "path": "yeni/dosya/yolu", "content": "tam dosya içeriği"}
  ]
}`;

  // En fazla 4 deneme: model ilk üretimde hata yaparsa, hata mesajını verip düzelttir
  let result;
  let applied;
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt++) {
    const msgs = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];
    if (attempt > 1) {
      // Hatalı dosyaların mevcut içeriklerini topla (düzeltme için bağlam)
      const errPaths = [...new Set((lastError.match(/src\/[A-Za-z0-9_./\-]+\.(ts|tsx|js|jsx)/g) || []))];
      const errContents = [];
      for (const p of errPaths.slice(0, 5)) {
        const c = read(p);
        if (c !== null) errContents.push(`=== ${p} ===\n${c.slice(0, 15000)}`);
      }
      msgs.push({
        role: 'assistant',
        content: JSON.stringify(result || { summary: 'önceki üretim', edits: [] }),
      });
      msgs.push({
        role: 'user',
        content: `Önceki cevabın derleme/lint hataları verdi. İşte hatalar:\n${lastError.slice(0, 4000)}\n\n${
          errContents.length
            ? `Hatalı dosyaların GÜNCEL içerikleri (üzerlerine düzeltme yap):\n${errContents.join('\n\n').slice(0, 60000)}`
            : '(Hatalı dosya içeriği bulunamadı, önceki cevabındaki dosyaları koru.)'
        }\n\nLütfen BU DOSYALAR ÜZERİNDEN minimal düzeltme edit'leri üret (type:"edit" ile old→new). Sadece hataları gider, büyük değişiklik yapma, yeni dosya üretme. Sadece JSON döndür.`,
      });
    }

    try {
      result = await callModel(msgs);
    } catch (e) {
      lastError = e.message;
      console.log(`❌ Deneme ${attempt} model hatası: ${lastError.slice(0, 500)}`);
      // model hatası da olsa denemelere devam et (callModel kendi içinde 3 kez dener)
      continue;
    }
    // Deneme 2+: modelin edit'leri mevcut dosya içeriklerine göre üretildiği için,
    // uygulamadan önce önceki denemede oluşturulan DEĞİŞİMleri koru (silme).
    const edits = result.edits || [];
    if (!edits.length) {
      lastError = 'Model edit üretmedi (boş edits dizisi)';
      console.log(`⚠️  Model edit üretmedi (deneme ${attempt})`);
      continue;
    }

    try {
      // Deneme 1: temiz başla. Deneme 2+: mevcut dosyaları koru, sadece düzeltme üzerine kur.
      if (attempt === 1) {
        resetWorkingDir();
      }
      applied = applyEdits(edits);
      console.log(`🔧 Uygulanan (deneme ${attempt}): ${applied.length} dosya`);
      applied.forEach((a) => console.log('  ' + a));

      // Doğrulama: tsc + eslint
      const tscOut = runQuiet('npx tsc --noEmit');
      if (tscOut !== null) throw new Error(`TypeScript:\n${tscOut.slice(0, 2500)}`);

      const changed = edits.map((e) => e.path).filter((p) => p.endsWith('.ts') || p.endsWith('.tsx'));
      if (changed.length) {
        const lintOut = runQuiet(`npx eslint ${changed.join(' ')} --fix`);
        if (lintOut !== null) throw new Error(`ESLint:\n${lintOut.slice(0, 2500)}`);
      }

      console.log('✅ TypeScript + ESLint temiz');
      break; // başarılı
    } catch (e) {
      lastError = e.message;
      console.log(`❌ Deneme ${attempt} doğrulama hatası:\n${lastError.slice(0, 1200)}`);
      if (attempt === 4) {
        console.log('↩️  4 deneme de başarısız, değişiklikler geri alınıyor...');
        rollback();
      }
    }
  }

  if (!applied || !applied.length) {
    console.log('⚠️  Uygulanabilir değişiklik üretilemedi, bugünlük atlıyorum');
    sh(`git checkout ROADMAP.md 2>/dev/null || true`);
    return;
  }

  // Commit + push + PR
  // Git identity (GitHub Actions runner'da ayarlı olmayabilir)
  // NOT: 'ai-dev-bot@users.noreply.github.com' EMAIL'i GitHub'da TANIMLI bir AI-DEV-BOT hesabına ait!
  // Yabancı hesabın commit'leri gibi görünmesin diye hasangonen91 hesabının noreply emailini kullan.
  sh(`git config user.email "45069041+hasangonen91@users.noreply.github.com"`);
  sh(`git config user.name "HASAN GÖNEN"`);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const branch = `ai/dev-${date}`;
  const existing = sh(`git branch --list ${branch}`);
  if (existing) sh(`git branch -D ${branch}`);
  sh(`git checkout -b ${branch}`);
  sh(`git add -A`);
  sh(`git commit -m "🤖 ${task.title} (otomatik AI geliştirme)"`);
  sh(`git push --force-with-lease origin ${branch} 2>/dev/null || git push origin ${branch}`);

  const prBody = `## 🤖 Otomatik AI Değişikliği
**Görev:** ${task.title}

${task.detail}

**Model:** ${MODEL}

**Yapılan değişiklikler:**
${applied.map((a) => `- ${a}`).join('\n')}

**Özet:** ${result.summary || '-'}

---
*Bu PR, günlük AI geliştirme botu tarafından otomatik oluşturuldu. Lütfen inceleyip merge et, ROADMAP ilerlemeye devam etsin.*`;

  // Body'yi dosyaya yaz (backtick/Türkçe karakter shell kaçışını önler)
  writeFileSync('/tmp/pr-body.md', prBody, 'utf8');
  sh(`gh pr create --repo ${REPO} --base ${BRANCH_BASE} --head ${branch} --title "🤖 AI: ${task.title}" --body-file /tmp/pr-body.md`);
  console.log('🎉 PR açıldı');

  // OTONOM MOD: PR'ı bekletmeden doğrula ve kendisi merge et (insan onayı beklenmez).
  // GitHub Actions'ın PR oluşturup onaylamasına izin verildi (repo ayarı).
  const prNum = sh(`gh pr list --repo ${REPO} --head ${branch} --json number --jq '.[0].number'`).trim();
  console.log('🔁 PR kendiliğinden merge ediliyor (otonom mod)...');
  try {
    sh(`gh pr merge ${prNum} --repo ${REPO} --squash --delete-branch`);
    console.log('✅ PR merged — next-task otomatik sıradaki görevi başlatacak');
  } catch (e) {
    // Merge engellenirse PR açık kalsın, günlük görev bunu raporlar
    console.warn(`⚠️  Merge yapılamadı: ${e.message.split('\n')[0]} — PR #${prNum} açık kaldı`);
  }
  console.log(`⏱️  Toplam süre: ${((Date.now() - started) / 1000).toFixed(0)} sn`);
}

function rollback() {
  console.log('↩️  Değişiklikler geri alınıyor...');
  resetWorkingDir();
  sh('git checkout -- ROADMAP.md 2>/dev/null || true');
  process.exit(1);
}

// Çalışma dizinini temiz duruma getir (tüm yerel değişiklikler ve yeni dosyalar)
function resetWorkingDir() {
  const files = sh('git status --porcelain').split('\n').filter(Boolean);
  for (const line of files) {
    const f = line.slice(3).trim();
    if (!f) continue;
    try {
      sh(`git checkout -- ${f} 2>/dev/null || rm -f ${f}`);
    } catch {
      /* yoksay */
    }
  }
}

main().catch((e) => {
  console.error(`💥 Hata: ${e.message}`);
  try {
    sh('git checkout -- ROADMAP.md 2>/dev/null || true');
  } catch {}
  process.exit(1);
});