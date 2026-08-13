# DilGenie Yol Haritası

> Bu dosya, otomatik AI geliştirme botu (`.github/workflows/ai-dev.yml`) tarafından işlenir.
> Bot her çalıştığında ilk `- [ ]` işaretli görevi alır, kod üretir, PR açar.
> Hatasız merge edilen görevler `- [x]` işaretlenip bir sonraki göreve geçilir.
> Görev eklerken formatı bozma, başına/kategorisini koru.

## Veri Genişletme (Kolay — modelin kesin yapabileceği)

- [x] **B1 Kelime Verisi: Yeni Kategori Ekle (family)** — `src/pages/Vocabulary/B1/data.tsx` dosyasındaki `vocabulary` objesine `greetings` ile aynı formatta yeni bir `family` kategorisi ekle (`en`, `tr`, `words` dizisinde en az 6 `{key, en, tr, image}`, `example_sentences` en az 2, `questions` en az 2). `key` numaralarını greetings'ten sonra devam ettir (5'ten itibaren). Mevcut yapıyı ve image URL'lerini birebir taklit et.
- [x] **B1 Kelime Verisi: Yeni Kategori Ekle (daily_routines)** — `src/pages/Vocabulary/B1/data.tsx` dosyasındaki `vocabulary` objesine `family` ve `greetings` ile aynı formatta `daily_routines` kategorisi ekle (`words` en az 6, `example_sentences` en az 2, `questions` en az 2). `key` numaralarını sırayla devam ettir. Mevcut yapıyı ve image URL'lerini birebir taklit et.
- [x] **Hangman Kelime Havuzu Genişletme** — `src/pages/games/hangman/Hangman.tsx` dosyasındaki `puzzles` dizisine 12 yeni `{answer, hint}` ekle (mevcut 3 kelime: JAVASCRIPT, PYTHON, REACT). İpucuları İngilizce olsun, cevaplar İngilizce ve büyük harf. `answer` alanını boşluk içermesin.
- [ ] **Quiz Veri Seti Genişletme** — `src/pages/games/quiz/quizData.ts` dosyasındaki `quizData` dizisine 8 yeni başkent sorusu ekle (mevcut format: `{question, options[4], answer}`). `answer` değeri `options` dizisinde bulunmalı, sorular farklı ülkelerden olsun ve mevcutlarla tekrar olmasın.
- [ ] **C1 Vocabulary Veri Genişletme** — `src/pages/Vocabulary/C1/data.tsx` dosyasındaki `greetings` kategorisinin `words` dizisine 5 yeni `{en, tr}` kelime ekle. `en` İngilizce, `tr` Türkçe, C1 seviyesine uygun olmalı. Mevcut formatı birebir takip et.
- [ ] **Quiz liderData Genişletme** — `src/pages/games/quiz/leaderData.ts` dosyasındaki veri yapısını incele, `questions` veya `surveys` alanına 5 yeni kayıt ekle. Mevcut formatı takip et, sıra/kod numaralarını boşluk bırakmadan devam ettir.

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