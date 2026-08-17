# DilGenie Yol Haritası

> Bu dosya, otomatik AI geliştirme botu (`.github/workflows/ai-dev.yml`) tarafından işlenir.
> Bot her çalıştığında ilk `- [ ]` işaretli görevi alır, kod üretir, PR açar.
> Hatasız merge edilen görevler `- [x]` işaretlenip bir sonraki göreve geçilir.
> Görev eklerken formatı bozma, başına/kategorisini koru.

- [x] **Quiz Sonuç Skor Özeti** — `src/pages/games/quiz/Quiz.tsx` dosyasında `<GameOverModal` render edilmeden hemen ÖNCE (dosya sonuna doğru) bir skor özeti görünümü ekle.
  - Mevcut state kavramları: `score`, `maxScore`, `showScore`. `score > 0 && showScore` koşuluyla göster. `styles.tsx` içindeki mevcut stil kavramlarına uy, yeni stil tanımlaman gerekirse `styles.tsx` dosyasına `scoreSummary` adında yeni stil ekle.
  - Görünüm: `Skorun: {score}` ve `En İyi: {maxScore}` yazıları ve altına `src/pages/games/quiz/leaderData.ts` dosyasındaki `leaderData` dizisinin ilk 3 öğesini `name - score` olarak listele.
  - `import { leaderData } from './leaderData';` ifadesini Quiz.tsx'e ekle. Başka hiçbir dosyayı değiştirme, sadece Quiz.tsx + styles.tsx.
  - Sırayı bozma, mevcut quiz akışına dokunma.

## Öncelikli (Kullanıcı Deneyimi)

- [x] **Misafir Girişi Butonu** — `src/pages/Start/Auth/Login/index.tsx` dosyasının giriş formunun altına "Daha sonra" / "Misafir olarak devam et" butonu ekle. Butona basınca uygulama `uid: 'guest'` ile direkt ana ekrana (`BottomTab`) geçsin. Mevcut `login` fonksiyonundaki navigasyon mantığını takip et, `styles.tsx`'teki uygun stilini kullan. Sadece bu butonu ekle, başka şey değiştirme.

## Veri Genişletme (Kolay — modelin kesin yapabileceği)

- [x] **A2 Kelime Verisi: CEFR 'family' Kategorisi (İlk 6 Kelime)** — `src/pages/Vocabulary/A2/` klasöründeki Mevcut veri dosyasındaki (data.tsx varsa) yapıyı birebir kullan. Yoksa B1'deki `family` kategorisini örnek al. `words` dizisinde **SADECE coğrafi olarak aile temalı resmi CEFR A2 kelimelerden 6 tanesini** kullan (ör. acceptable, able, accept... değil; aunt/brother gibi A1'de — A2 havuzundan aile/kimlikle ilgili doğru seç). CEFR havuz: `scripts/cefr/cefr_words.json` level A2. `key` 1'den başlasın. example_sentences en az 2, questions en az 2. Mevcut stil ve image URL'lerini birebir taklit et.
- [x] **B2 Kelime Verisi: CEFR 'work' Kategorisi** — `src/pages/Vocabulary/B2/data.json` dosyasındaki mevcut `A1level` yapısına yeni `work` kategorisi ekle. Kelimeleri `scripts/cefr/cefr_words.json` dosyasından level B2 OLAN kelimeler arasından seç (iş/çalışma temalı: employment, colleague, salary, deadline, manager, negotiate vb.). `words` en az 6, `example_sentences` en az 2, `questions` en az 2. Mevcut JSON yapısını birebir koru.
- [ ] **C2 Kelime Verisi: İlk Kategori (cefr_advanced)** — `src/pages/Vocabulary/C2/` klasörü boş, yeni `data.tsx` oluştur. B1'deki data.tsx formatını birebir taklit et (`vocabulary` objesi, kategori objesi, `words`/`example_sentences`/`questions`). Kelimeleri `scripts/cefr/cefr_words.json` dosyasından level C2 OLAN kelimelerden seç (ilk kategori: academically advanced kelimeler — 6 kelime: exude, unravel, teem, unconstrained, indignant, eccentricity gibi ama kendi seç). `key` 1'den başlasın.
- [x] **B1 Kelime Verisi: Yeni Kategori Ekle (family)** — `src/pages/Vocabulary/B1/data.tsx` dosyasındaki `vocabulary` objesine `greetings` ile aynı formatta yeni bir `family` kategorisi ekle (`en`, `tr`, `words` dizisinde en az 6 `{key, en, tr, image}`, `example_sentences` en az 2, `questions` en az 2). `key` numaralarını greetings'ten sonra devam ettir (5'ten itibaren). Mevcut yapıyı ve image URL'lerini birebir taklit et.
- [x] **B1 Kelime Verisi: Yeni Kategori Ekle (daily_routines)** — `src/pages/Vocabulary/B1/data.tsx` dosyasındaki `vocabulary` objesine `family` ve `greetings` ile aynı formatta `daily_routines` kategorisi ekle (`words` en az 6, `example_sentences` en az 2, `questions` en az 2). `key` numaralarını sırayla devam ettir. Mevcut yapıyı ve image URL'lerini birebir taklit et.
- [x] **Hangman Kelime Havuzu Genişletme** — `src/pages/games/hangman/Hangman.tsx` dosyasındaki `puzzles` dizisine 12 yeni `{answer, hint}` ekle (mevcut 3 kelime: JAVASCRIPT, PYTHON, REACT). İpucuları İngilizce olsun, cevaplar İngilizce ve büyük harf. `answer` alanını boşluk içermesin.
- [x] **Quiz Veri Seti Genişletme** — `src/pages/games/quiz/quizData.ts` dosyasındaki `quizData` dizisine 8 yeni başkent sorusu ekle (mevcut format: `{question, options[4], answer}`). `answer` değeri `options` dizisinde bulunmalı, sorular farklı ülkelerden olsun ve mevcutlarla tekrar olmasın.
- [ ] **C1 Vocabulary Veri Genişletme** — `src/pages/Vocabulary/C1/data.tsx` dosyasındaki `greetings` kategorisinin `words` dizisine 5 yeni `{en, tr}` kelime ekle. `en` İngilizce, `tr` Türkçe, C1 seviyesine uygun olmalı. Mevcut formatı birebir takip et.
- [ ] **Quiz liderData Genişletme** — `src/pages/games/quiz/leaderData.ts` dosyasındaki veri yapısını incele, `questions` veya `surveys` alanına 5 yeni kayıt ekle. Mevcut formatı takip et, sıra/kod numaralarını boşluk bırakmadan devam ettir.

## Kod Kalitesi (Bot denetimi)

- [ ] **Kod Hata Taraması (Round 1)** — Tüm `src/` klasörünü tara: (1) `console.log` ile kalmış debug kodlarını tespit et; (2) kullanılmayan import/state değişkenlerini bul; (3) `try/catch` içinde sessizce yutulan hataları işaretle; (4) `any` tip kullanımını azalt. Bulduğun hataları düzelt, özet raporu PR body'sinde ver. Küçük adımlı, güvenli düzeltmeler yap — davranışı değiştirme.
- [ ] **Component Mimarisi İyileştirme** — `src/components/` klasörünü incele: (1) 2 dosyadan uzun olan bileşenleri küçük parçalara böl (örn. `GreetingsQuiz`, `TeachingPhase`); (2) tekrarlanan UI pattern'lerini (buton, kart, modal) ortak bileşene çıkar; (3) props tiplerini `interface` ile tanımla, `any` kullanma. Davranışı bozmadan yapısal iyileştirme yap, tüm import'ları güncelle.

## Oyun İyileştirmeleri (Orta)

- [ ] **Hangman İpucu Butonu** — `src/pages/games/hangman/Hangman.tsx` dosyasına "İpucu" (hint) butonu ekle. Butona basınca puzzle'ın hint alanını gösteren küçük bir text görünür hale gelsin. Mevcut `hint` state'ini ve `styles.tsx`'teki uygun stili kullan, mevcut oyun akışını bozma.
- [ ] **Quiz Kullanıcı Adı Girişi** — `src/pages/games/quiz/GameOverModal.tsx` dosyasında skor kaydı öncesi kullanıcıdan isim alan bir `TextInput` ekle. `leaderData.ts` yapısına uygun kayıt oluştur. Modal yapısını bozma.
- [ ] **WordCompletion Geri Bildirimi** — `src/pages/games/wordcompletion/WordCompletion.tsx` dosyasında cevap doğru/yanlış olduğunda ekranda renkli bir geri bildirim metni göster. Mevcut `styles.tsx` yapısına uygun stil ekle, oyun mantığını değiştirme.
- [ ] **FlappyBird Yüksek Skor Kaydı** — `src/pages/games/flappybird/` dosyalarını incele, AsyncStorage ile en yüksek skoru kaydet ve oyun sonunda göster. Paket kurulumu GEREKMİYOR — uygulamada AsyncStorage zaten kurulu mu kontrol et, yoksa `@react-native-async-storage/async-storage` importu kullanılıyorsa doğrudan kullan.

## Çekirdek Modüller (Zor — modele büyük değişiklik yaptırma)

- [ ] **Kelime Kartları (Flashcards) Modülü** — Vocabulary ekranına kart çevirme (flip) animasyonlu flashcard modu ekle. `src/pages/Vocabulary/B1/B1level.tsx` ekranına basit bir flip butonu ekle, `src/pages/Vocabulary/B1/data.tsx`'teki kelimeleri kullan. Karmaşık animasyon yerine `Animated` API ile basit scale/opacity geçişi yap.
- [ ] **Günlük Hedef & Streak Sayaçları** — Ana ekrana günlük öğrenme hedefi (örn. 10 yeni kelime) ve yanma (streak) göstergesi ekle. İlerlemeyi AsyncStorage'a kaydet, bugün kaç kelime öğrendiğini göster.
- [ ] **Karanlık / Açık Tema Desteği** — `src/theme/` altına basit bir tema objesi ekle (renk paleti), mevcut ekranlardaki hardcoded renklerden birkaçını bu objeyle değiştir. Tüm ekranları dönüştürmeye çalışma, sadece 2-3 dosyada örnek kullanım göster.

## Performans & Bakım (İleri — model zorlanabilir)

- [ ] **SRS (Aralıklı Tekrar) Altyapısı** — Kelime tekrarı için spaced repetition motoru ekle. `src/services/srs/` klasörü oluştur, basit bir FSRS benzeri algoritma (kart, kolaylık faktörü, aralık günü, son gözden geçirme) yaz. Kullanıcı cevabına göre (again/hard/good/easy) aralığı güncelle. Zustand store (`src/store/`) ile kelime kartlarını yönet.
- [ ] **Import Yolu Düzenleme (Alias)** — Uzun bağıl importları (`../../../components/...`) temizlemek için `tsconfig.json` + babel module-resolver alias (örn. `@/` → `src/`) ekle. Tüm dosyalardaki importları yeni yapıya taşı.
- [ ] **Hata Yakalama (Error Boundary)** — Uygulama genelinde crash yerine kullanıcıya hata ekranı göstersin diye global ErrorBoundary bileşeni ekle. Loglama için basit bir utility yaz.
- [ ] **Firestore Servis Katmanı** — `src/services/firebase/firestoreService` benzeri servis katmanı oluştur: tüm istekleri tek yerde topla, hata yönetimini merkezileştir (try/catch + kullanıcı dostu hata mesajı). Mevcut ekranlardaki dağınık Firestore çağrılarını bu servise taşı.
- [ ] **Test Dosyaları Ekleme** — `__tests__/` altına kritik utility fonksiyonları için unit testler ekle (örn. quiz skor hesaplama, çeviri yükleyici). Jest ile çalışmalı.

## Görsel Zenginleştirme (Premium Uygulama Hissi)
- [ ] **Kelime Görselleri: Kendi Asset Yönetimi** — `src/assets/images/vocabulary/` klasörü oluştur. Mevcut `random-image-pepebigotes.vercel.app` linkleri yerine, her kategori için uygun (CC0/royalty-free) görsel asset ekle. `scripts/cefr/cefr_words.json` kelimelerine göre: her kelime için uygun görsel URL'i veya yerel dosya yolu üret. Görseller `https://images.unsplash.com` veya `https://cdn.jsdelivr.net/gh/` üzerinden sabit linklerle eklensin (hotlink korumasız). 10 kategori × 6 kelime = 60 görsel başlangıç.
- [ ] **Oyun İçin Sprite/Asset Paketi** — `src/assets/images/games/` klasörü. Hangman, Quiz, FlappyBird, WordCompletion oyunları için uygun görseller (karakter, arka plan, buton, ikon). Format: `.webp` veya `.png`, sabit URL. Her oyun için en az 3 asset.
- [ ] **Splash Screen & App İkonu** — `src/assets/images/app/` klasörü: `splash.png` (1080x1920), `icon.png` (1024x1024), `adaptive-icon.png`. Renk paleti uygulamanın temasıyla tutarlı. Expo/config plugin ile `app.json`'a ekle.
- [ ] **Kategori Kapak Görselleri** — Her seviye (A1-C2) ana sayfada gösterilecek kapak görseli. `src/assets/images/levels/A1.png` ... `C2.png`. Tema: renkli, minimal, öğrenme hissiyatı veren.

## Yeni Oyun Geliştirme (Core Gameplay)
- [ ] **Memory Game (Kart Eşleştirme)** — `src/pages/games/memory/` klasörü. 4x4 grid, kelime-çeviri eşleştirme. CEFR seviyesine göre kart sayısı (A1: 8 çift, C2: 16 çift). `scripts/cefr/cefr_words.json`'dan seviyeye uygun kelimeleri çek. Skor + süre + hamle sayısı. `Animated` API ile kart çevirme animasyonu.
- [ ] **Word Builder (Harf Sıralama)** — `src/pages/games/wordbuilder/` klasörü. Verilen karışık harflerden kelime oluştur. CEFR seviyesine göre kelime uzunluğu (A1: 3-4 harf, C2: 7-9 harf). IPucu: kelime türü + tanım. Süre sayacı + puan.
- [ ] **Listening Challenge (Sesli Kelime Tanıma)** — `src/pages/games/listening/` klasörü. Web Speech API (veya expo-speech) ile kelime oku, kullanıcı 4 seçenekten doğru görseli/çeviriyi seçsin. CEFR seviyesine göre kelime havuzu. Skor + streaks.
- [ ] **Sentence Scramble (Cümle Kurma)** — `src/pages/games/sentencescramble/` klasörü. Karışık kelimelerden doğru cümle oluştur. `scripts/cefr/cefr_words.json`'dan `example_sentences` veya basit şablon cümleler. Seviye: A1 (SVO), B2 (karmaşık).

## Mevcut Oyun İyileştirmeleri (Polishing)
- [ ] **Hangman: Animasyonlu Adam Asma** — Mevcut `src/pages/games/hangman/Hangman.tsx` de: yanlış harf başına vücut parçası çizimi (canvas/svg), sonucunda tam adam asma animasyonu. `styles.tsx`'e ekle.
- [ ] **Quiz: Zamanlayıcı Görsel Geri Bildirim** — `src/pages/games/quiz/Quiz.tsx`: kalan süre < 5sn ise daire kırmızıya dönsün, pulse animasyonu. Doğru/yanlış anında yeşil/kırmızı flash + ses (expo-av).
- [ ] **FlappyBird: Seviye Temalı Engeller** — `src/pages/games/flappybird/`: Engeller kelime kartı şeklinde, geçince kelime + çeviri göster. Yüksek skor AsyncStorage.
- [ ] **WordCompletion: Çoklu Seviye Desteği** — `src/pages/games/wordcompletion/WordCompletion.tsx`: CEFR seviyesi seçimi (A1-C2), seviyeye göre kelime havuzu (`scripts/cefr/cefr_words.json`).
## Ertele (Login/Entegrasyon — diğer görevler bitince)

- [ ] **Google İle Devam Et Butonu** — `src/pages/Start/Auth/Login/index.tsx` ve `src/pages/Start/Auth/Register/index.tsx` dosyalarında Firefox config'i olan `GoogleSvg` asset'ini kullanarak "Google ile Devam Et" butonunu görsel olarak ekle. Tıklama davranışı için Firebase `signInWithCredential` + `@react-native-google-signin/google-signin` import'larını hazırla (GoogleSignin.configure + signIn sonrası credential oluşturma kodunu yaz), ama butona basınca şimdilik uyarı göstersin (alert) — tam çalışan entegrasyon sonraki görevde.
- [ ] **Auto-Login Hızlandırma** — `src/pages/Start/Auth/Login/index.tsx` dosyasındaki `checkUserSession` fonksiyonunu düzenle: kullanıcının kayıtlı session'ı varsa beklemeden direkt `BottomTab`'e yönlendirilsin. Mevcut `AsyncStorage` veri okuma dizisini en aza indir (tek seferde `MultiGet` kullan) — davranışı bozma, sadece hızlandır.
