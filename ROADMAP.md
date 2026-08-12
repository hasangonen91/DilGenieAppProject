# DilGenie Yol Haritası

> Bu dosya, otomatik AI geliştirme botu (`.github/workflows/ai-dev.yml`) tarafından işlenir.
> Bot her çalıştığında ilk `- [ ]` işaretli görevi alır, kod üretir, PR açar.
> Hatasız merge edilen görevler `- [x]` işaretlenip bir sonraki göreve geçilir.
> Görev eklerken formatı bozma, başına/kategorisini koru.

## Çekirdek Modüller

- [ ] **SRS (Aralıklı Tekrar) Altyapısı** — Kelime tekrarı için spaced repetition motoru ekle. `src/services/srs/` klasörü oluştur, basit bir FSRS benzeri algoritma (kart, kolaylık faktörü, aralık günü, son gözden geçirme) yaz. Kullanıcı cevabına göre (again/hard/good/easy) aralığı güncelle. Zustand store (`src/store/`) ile kelime kartlarını yönet.
- [ ] **Günlük Hedef & Streak Sayaçları** — Ana ekrana günlük öğrenme hedefi (örn. 10 yeni kelime) ve yanma (streak) göstergesi ekle. Firebase Firestore'a kullanıcının günlük ilerlemesini kaydet, bugün kaç kelime öğrendiğini göster.
- [ ] **Kelime Kartları (Flashcards) Modülü** — Vocabulary ekranına kart çevirme (flip) animasyonlu flashcard modu ekle. `react-native-reanimated` ile flip animasyonu yap. Kartlar A1 kelimelerinden gelsin (`src/pages/Vocabulary/A1/A1LevelData.tsx`).
- [ ] **Telaffuz Pratiği & TTS Entegrasyonu** — Vocabulary ekranlarına `react-native-tts` ile kelimeyi sesli okuma butonu ekle. İngilizce telaffuz için ses ayarını doğru yapılandır, yavaş okuma seçeneği sun.
- [ ] **Kelime Dünyası Haritası** — Ana ekranda seviyeleri (A1→C2) planör/map tarzında gösteren bir ekran tasarla. Tamamlanan seviyeler altın, devam eden sarı, kilitli olanlar gri olsun. `@shopify/react-native-skia` ile çiz.
- [ ] **Karanlık / Açık Tema Desteği** — `src/theme/` altına karanlık tema ekle. `react-native-localize` ile sistem temasını algıla, kullanıcı tercihini `@react-native-async-storage/async-storage`'a kaydet. Tüm ekranlarda `useTheme` kullanılmaya başlansın.

## Oyunlar

- [ ] **Yeni Oyun: Kelime Avcısı (Word Hunt)** — Izgarada harflerden kelime bulma oyunu ekle. `src/pages/games/wordhunt/` oluştur, 4x4 ızgara, komşu harflerden kelime üretme, kelime listesi veri dosyası. Oyun sonunda skoru Firestore'a kaydet.
- [ ] **Oyuncu Rehberi (Hangman) İyileştirme** — Hangman oyunundaki kelime havuzunu Türkçe açıklamalı İngilizce kelimelerle zenginleştir. İpucu butonu ekle (kelimenin Türkçe karşılığını göster). `src/pages/games/hangman/Hangman.tsx`.
- [ ] **Flappy Bird Yüksek Skor Sistemi** — FlappyBird oyununa yerel yüksek skor kaydı ekle (MMKV veya AsyncStorage). Oyun bittiğinde skoru göster, rekor kırılırsa kutlama animasyonu (lottie) oynat.
- [ ] **Quiz Sonuç Ekranı İstatistikleri** — Quiz bitince doğru/yanlış oranı, en hızlı cevap, toplam süre gibi istatistikleri gösteren bir özet ekranı ekle. `src/pages/games/quiz/util.ts`'i genişlet.
- [ ] **Kelime Eşleştirme (Word Matching) Bonus** — WordMatching oyununa seviye sistemi ekle: her level'da kelime sayısı artar, süre azalır. Zorluk seçim ekranı koy.

## İçerik & Veri

- [ ] **A1 Kelime Verisi Genişletme** — `src/pages/Vocabulary/A1/A1LevelData.tsx` içindeki kelime listesini en az 100 yeni kelimeyle genişlet (isim, fiil, sıfat, günlük ifade kategorileri). Her kelime: ingilizce, türkçe, örnek cümle.
- [ ] **Dinleme Modülü İçerik Paketi** — `src/components/Listening/ListeningData.tsx` içine 10 yeni İngilizce dinleme metni ekle (A2 seviye, günlük hayat konulu). Her metne 3'er soru ve cevap anahtarı.
- [ ] **Türkçe Çeviri Eksiklerini Tamamlama** — `src/translations/tr.json` ile `en.json`'u karşılaştır, eksik anahtarları tespit edip çevir. Boş string kalan çevirileri doldur.

## Performans & Bakım

- [ ] **Import Yolu Düzenleme (Alias)** — Uzun bağıl importları (`../../../components/...`) temizlemek için `tsconfig.json` + babel module-resolver alias (örn. `@/` → `src/`) ekle. Tüm dosyalardaki importları yeni yapıya taşı.
- [ ] **Gereksiz Paket Temizliği** — `package.json` içindeki kullanılmayan bağımlılıkları tespit et (örn. `add`, `yarn` paketi, kullanılmayan oyun kütüphaneleri) ve kaldır. Kaldırma öncesi grep ile usage kontrolü yap.
- [ ] **Firestore Güvenlik Önerileri** — `src/services/firebase/firestoreService` benzeri servis katmanı oluştur: tüm istekleri tek yerde topla, hata yönetimini merkezileştir (try/catch + kullanıcı dostu hata mesajı). Mevcut ekranlardaki dağınık Firestore çağrılarını bu servise taşı.
- [ ] **Hata Yakalama (Error Boundary)** — Uygulama genelinde crash yerine kullanıcıya hata ekranı göstersin diye global ErrorBoundary bileşeni ekle. Loglama için basit bir utility yaz.
- [ ] **Test Dosyaları Ekleme** — `__tests__/` altına kritik utility fonksiyonları için unit testler ekle (örn. quiz skor hesaplama, SRS algoritması, çeviri yükleyici). Jest ile çalışmalı.