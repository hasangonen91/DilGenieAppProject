#!/usr/bin/env node
// DilGenie Kalite Denetimi — model çağırMAZ, saf statik analiz.
// Bulguları AUDIT.md'ye yazar, kritik ihlalleri ROADMAP'e düzeltme görevi ekler.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { execSync } from 'child_process';

const sh = (c) => execSync(c, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
const walk = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) acc = walk(p, acc);
    else if (['.tsx', '.ts', '.jsx', '.js', '.json'].includes(extname(p))) acc.push(p);
  }
  return acc;
};

const SRC = 'src';
const files = walk(SRC);

// EMOJI / Unicode sembol tespiti (ik çünkü görsel kuralımız var)
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2190}-\u{21FF}]/u;
const emojiHits = [];
for (const f of files) {
  const c = readFileSync(f, 'utf8');
  const m = c.match(EMOJI_RE);
  if (m) emojiHits.push(`${f}:${m[0]}`);
}

// console.log debug kodu
const logHits = [];
for (const f of files) {
  if (f.includes('components/')) continue;
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => { if (/console\.(log|debug)\(/.test(l)) logHits.push(`${f}:${i + 1}`); });
}

// any tipi kullanımı (kritik sayılmaz, raporlanır)
let anyCount = 0;
for (const f of files) {
  if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
  const c = readFileSync(f, 'utf8');
  anyCount += (c.match(/\bany\b/g) || []).length;
}

// 400+ satır dosyalar (component mimarisi ihlali adayı)
const longFiles = [];
for (const f of files) {
  if (!f.endsWith('.tsx')) continue;
  const n = readFileSync(f, 'utf8').split('\n').length;
  if (n > 400) longFiles.push(`${f} (${n})`);
}

// TODO / FIXME
let todoCount = 0;
for (const f of files) {
  const c = readFileSync(f, 'utf8');
  todoCount += (c.match(/TODO|FIXME|HACK/g) || []).length;
}

// Çıktı
const lines = [];
lines.push('# DilGenie Kalite Denetim Raporu');
lines.push('');
lines.push(`> Otomatik oluşturuldu: ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC`);
lines.push('> Model gerektirmez: tsc/eslint dışı statik kontroller (CI ayrıca tsc+eslint koşuyor).');
lines.push('');
lines.push('## Özet');
lines.push('');
lines.push(`- Taranan dosya: **${files.length}**`);
lines.push(`- Emoji/sembol görsel ihlali: **${emojiHits.length}**`);
lines.push(`- console.log debug kodu: **${logHits.length}**`);
lines.push(`- \`any\` tipi kullanımı: **${anyCount}**`);
lines.push(`- 400+ satır dosya: **${longFiles.length}**`);
lines.push(`- TODO/FIXME işareti: **${todoCount}**`);
lines.push('');

if (emojiHits.length) {
  lines.push('## Emoji / Unicode Sembol İhlalleri (görsel kuralı)');
  lines.push('');
  lines.push('> Kural: emoji ikon olarak KULLANILMAZ — react-native-svg ile ikon componenti yaz.');
  lines.push('');
  for (const h of emojiHits.slice(0, 30)) lines.push(`- \`${h}\``);
  lines.push('');
}
if (logHits.length) {
  lines.push('## console.log / console.debug');
  lines.push('');
  for (const h of logHits.slice(0, 20)) lines.push(`- \`${h}\``);
  lines.push('');
}
if (longFiles.length) {
  lines.push('## 400+ Satır Dosyalar (component mimarisi ihlali adayı)');
  lines.push('');
  for (const h of longFiles.slice(0, 15)) lines.push(`- \`${h}\``);
  lines.push('');
}
lines.push('---');
lines.push('_Rapor `scripts/audit/audit.mjs` tarafından üretilir._');
lines.push('');

writeFileSync('AUDIT.md', lines.join('\n'));
console.log('AUDIT.md yazildi. Ozet:', { files: files.length, emoji: emojiHits.length, logs: logHits.length, any: anyCount, long: longFiles.length, todo: todoCount });

// Kritik ihlalleri ROADMAP'e düzeltme görevi olarak ekle (tekrar oluşmasını engelle — görev çoktan varsa ekleme)
const roadmap = existsSync('ROADMAP.md') ? readFileSync('ROADMAP.md', 'utf8') : null;
if (roadmap && emojiHits.length) {
  const newTask = `- [ ] **Emoji İkonları Temizleme (Denetim Bulgusu)** — AUDIT.md raporundaki emoji/sembol ikonlarını bul ve react-native-svg ile yazılmış ikon componentleriyle değiştir (src/components/icons/ altında, width/height/color props). İlk ihlaller: ${emojiHits.slice(0, 5).join(', ')}. Yeni dosya yerine mevcut component mimarisini kullan.`;
  if (!roadmap.includes(newTask.slice(20, 60))) {
    const updated = roadmap + '\n' + newTask + '\n';
    writeFileSync('ROADMAP.md', updated);
    console.log('ROADMAP.md: emoji temizleme gorevi eklendi.');
  }
}