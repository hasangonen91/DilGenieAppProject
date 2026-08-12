# DilGenie Yol Haritası

> Bu dosya, otomatik AI geliştirme botu (`.github/workflows/ai-dev.yml`) tarafından işlenir.
> Bot her çalıştığında ilk `- [ ]` işaretli görevi alır, kod üretir, PR açar.
> Hatasız merge edilen görevler `- [x]` işaretlenip bir sonraki göreve geçilir.
> Görev eklerken formatı bozma, başına/kategorisini koru.

## Basit Görevler (Kolay kazanımlar)

- [ ] **A1 Kelime Verisi Genişletme** — `src/pages/Vocabulary/A1/A1LevelData.tsx` içindeki kelime listesine 30 yeni İngilizce kelime ekle (isim + fiil kategorileri). Her kelime için: ingilizce, türkçe, örnek cümle alanlarını mevcut listedeki formatla aynı şekilde doldur.
- [ ] **Türkçe Çeviri Eksiklerini Tamamlama** — `src/translations/tr.json` ile `en.json`'u karşılaştır, eksik anahtarları tespit edip Türkçe çevirilerini ekle. Boş string kalan çevirileri doldur. Anahtar yapısını değiştirme.
- [ ] **Hangman Kelime Havuzu Genişletme** — `src/pages/games/hangman/Hangman.tsx` dosyasındaki kelime listesine 20 yeni yaygın İngilizce kelime ve Türkçe anlamlarıyla ipucu ekle. Mevcut veri yapısını takip et.
- [ ] **Quiz Veri Seti Genişletme** — `src/pages/games/quiz/quizData.ts` içindeki soru listesine 10 yeni İngilizce-Türkçe kelime sorusu ekle. Mevcut soru formatını (soru, şıklar, doğru cevap) BİREBİR takip et.
- [ ] **A1 Seviye Soruları Genişletme** — `src/pages/Vocabulary/A1/A1levelQuestions.tsx` içindeki soru listesine 10 yeni soru ekle. Mevcut formatı takip et, seçenekler ve doğru cevap yapısını koru.

## Çekirdek Modüller (Orta zorluk)

- [ ] **Kelime Kartları (Flashcards) Modülü** — Vocabulary ekranına kart çevirme (flip) animasyonlu flashcard modu ekle. `react-native-reanimated` ile flip animasyonu yap. Kartlar A1 kelimelerinden gelsin (`src/pages/Vocabulary/A1/A1LevelData.tsx`).
- [ ] **Telaffuz Pratiği & TTS Entegrasyonu** — Vocabulary ekranlarına `react-native-tts` ile kelimeyi sesli okuma butonu ekle. İngilizce telaffuz için ses ayarını doğru yapılandır, yavaş okuma seçeneği sun.
- [ ] **Günlük Hedef & Streak Sayaçları** — Ana ekrana günlük öğrenme hedefi (örn. 10 yeni kelime) ve yanma (streak) göstergesi ekle. İlerlemeyi AsyncStorage'a kaydet, bugün kaç kelime öğrendiğini göster.
- [ ] **Karanlık / Açık Tema Desteği** — `src/theme/` altına karanlık tema ekle. `react-native-localize` ile sistem temasını algıla, kullanıcı tercihini `@react-native-async-storage/async-storage`'a kaydet. Tüm ekranlarda `useTheme` kullanılmaya başlansın.
- [ ] **Flappy Bird Yüksek Skor Sistemi** — FlappyBird oyununa yerel yüksek skor kaydı ekle (AsyncStorage). Oyun bittiğinde skoru göster, rekor kırılırsa kutlama mesajı göster.
- [ ] **Quiz Sonuç Ekranı İstatistikleri** — Quiz bitince doğru/yanlış oranı, toplam süre gibi istatistikleri gösteren bir özet ekranı ekle. `src/pages/games/quiz/util.ts`'i genişlet.

## Oyunlar (Zor)

- [ ] **Kelime Eşleştirme (Word Matching) Bonus** — WordMatching oyununa seviye sistemi ekle: her level'da kelime sayısı artar, süre azalır. Zorluk seçim ekranı koy.
- [ ] **Yeni Oyun: Kelime Avcısı (Word Hunt)** — Izgarada harflerden kelime bulma oyunu ekle. `src/pages/games/wordhunt/` oluştur, 4x4 ızgara, komşu harflerden kelime üretme, kelime listesi veri dosyası.
- [ ] **Word Puzzle Oyun İyileştirme** — `src/pages/games/wordpuzzle/WordPuzzle.tsx` oyununa kelime seçim ekranı ekle. En az 10 farklı kelime (ve ipucu) arasından rastgele oyun başlatsın. Mevcut sabit 'REACT' kelimesi yerine seçilen kelime kullanılsın.

## Performans & Bakım (İleri)

- [ ] **SRS (Aralıklı Tekrar) Altyapısı** — Kelime tekrarı için spaced repetition motoru ekle. `src/services/srs/` klasörü oluştur, basit bir FSRS benzeri algoritma (kart, kolaylık faktörü, aralık günü, son gözden geçirme) yaz. Kullanıcı cevabına göre (again/hard/good/easy) aralığı güncelle. Zustand store (`src/store/`) ile kelime kartlarını yönet.
- [ ] **Kelime Dünyası Haritası** — Ana ekranda seviyeleri (A1→C2) planör/map tarzında gösteren bir ekran tasarla. Tamamlanan seviyeler altın, devam eden sarı, kilitli olanlar gri olsun. `@shopify/react-native-skia` ile çiz.
- [ ] **Import Yolu Düzenleme (Alias)** — Uzun bağıl importları (`../../../components/...`) temizlemek için `tsconfig.json` + babel module-resolver alias (örn. `@/` → `src/`) ekle. Tüm dosyalardaki importları yeni yapıya taşı.
- [ ] **Firestore Servis Katmanı** — `src/services/firebase/firestoreService` benzeri servis katmanı oluştur: tüm istekleri tek yerde topla, hata yönetimini merkezileştir (try/catch + kullanıcı dostu hata mesajı). Mevcut ekranlardaki dağınık Firestore çağrılarını bu servise taşı.
- [ ] **Hata Yakalama (Error Boundary)** — Uygulama genelinde crash yerine kullanıcıya hata ekranı göstersin diye global ErrorBoundary bileşeni ekle. Loglama için basit bir utility yaz.
- [ ] **Test Dosyaları Ekleme** — `__tests__/` altına kritik utility fonksiyonları için unit testler ekle (örn. quiz skor hesaplama, SRS algoritması, çeviri yükleyici). Jest ile çalışmalı.