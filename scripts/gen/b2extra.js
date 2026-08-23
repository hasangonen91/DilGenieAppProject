// B2 ekstra 4 kategori (mevcut 4 ile birleşecek)
const {w, s, cat} = require('./helpers');

module.exports = {
  arts_literature: cat('Arts & Literature', 'Sanat ve Edebiyat', [
    w('masterpiece', 'başyapıt'), w('plot', 'olay örgüsü'),
    w('character', 'karakter'), w('chapter', 'bölüm'),
    w('fiction', 'kurmaca'), w('poetry', 'şiir sanatı'),
    w('critic', 'eleştirmen'), w('inspiration', 'ilham'),
    w('imagination', 'hayal gücü'), w('heritage', 'kültürel miras'),
  ], [
    s('The novel is a masterpiece of modern fiction.', 'Roman, modern kurmacanın başyapıtı.'),
    s('The plot of the story is full of surprises.', 'Hikayenin olay örgüsü sürprizlerle dolu.'),
    s('Old buildings are part of our heritage.', 'Eski binalar kültürel mirasımızın parçası.'),
    s('Nature gives artists inspiration.', 'Doğa, sanatçılara ilham verir.'),
  ]),
  science_research: cat('Science & Research', 'Bilim ve Araştırma', [
    w('hypothesis', 'hipotez'), w('evidence', 'kanıt'),
    w('experiment', 'deney'), w('theory', 'teori'),
    w('analysis', 'analiz'), w('conclusion', 'sonuç'),
    w('data', 'veri'), w('observation', 'gözlem'),
    w('method', 'yöntem'), w('discovery', 'keşif'),
  ], [
    s('Scientists test a hypothesis with experiments.', 'Bilim insanları hipotezi deneylerle test eder.'),
    s('There is strong evidence for this theory.', 'Bu teori için güçlü kanıt var.'),
    s('Careful observation leads to discovery.', 'Dikkatli gözlem keşfe götürür.'),
    s('The analysis of the data took weeks.', 'Verilerin analizi haftalar aldı.'),
  ]),
  technology_society: cat('Technology & Society', 'Teknoloji ve Toplum', [
    w('artificial intelligence', 'yapay zeka'), w('innovation', 'yenilik'),
    w('privacy', 'gizlilik'), w('cybersecurity', 'siber güvenlik'),
    w('automation', 'otomasyon'), w('algorithm', 'algoritma'),
    w('digital footprint', 'dijital iz'), w('influencer', '.etkileyici'),
    w('screen time', 'ekran süresi'), w('remote work', 'uzaktan çalışma'),
  ], [
    s('Artificial intelligence changes the job market.', 'Yapay zeka iş piyasasını değiştiriyor.'),
    s('Protecting privacy online is essential.', 'Çevrimiçi gizliliği korumak şart.'),
    s('Screen time affects sleep quality.', 'Ekran süresi uyku kalitesini etkiler.'),
    s('Remote work became common after 2020.', 'Uzaktan çalışma 2020 sonrası yaygınlaştı.'),
  ]),
  opinions_abstract: cat('Opinions & Abstract Ideas', 'Fikirler ve Soyut Kavramlar', [
    w('advantage', 'avantaj'), w('disadvantage', 'dezavantaj'),
    w('opportunity', 'fırsat'), w('challenge', 'meydan okuma, zorluk'),
    w('solution', 'çözüm'), w('decision', 'karar'),
    w('experience', 'deneyim'), w('success', 'başarı'),
    w('failure', 'başarısızlık'), w('progress', 'ilerleme'),
  ], [
    s('Every challenge brings an opportunity.', 'Her zorluk bir fırsat getirir.'),
    s('Failure is a step towards success.', 'Başarısızlık, başarıya giden bir adımdır.'),
    s('We must consider the advantages and disadvantages.', 'Avantajları ve dezavantajları düşünmeliyiz.'),
    s('Learning from experience helps progress.', 'Deneyimden öğrenmek ilerlemeyi sağlar.'),
  ]),
};
