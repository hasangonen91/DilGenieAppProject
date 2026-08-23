// B2level.json üretici — 4 kategori × 10 kelime + örnek cümleler (B2/Upper-Intermediate)
const fs = require('fs');

const IMG = 'https://random-image-pepebigotes.vercel.app/api/random-image';
const word = (en, tr) => ({en, tr, image: IMG});
const sent = (en, tr) => ({en, tr, image: IMG});

const category = (en, tr, words, sentences) => ({
  en,
  tr,
  category: {words, example_sentences: sentences},
});

const b2 = {
  B2level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        work_career: category(
          'Work & Career',
          'İş ve Kariyer',
          [
            word('promotion', 'terfi'),
            word('deadline', 'teslim tarihi'),
            word('colleague', 'iş arkadaşı'),
            word('salary', 'maaş'),
            word('employer', 'işveren'),
            word('employee', 'çalışan'),
            word('skills', 'beceriler'),
            word('meeting', 'toplantı'),
            word('resume', 'özgeçmiş'),
            word('interview', 'iş görüşmesi'),
          ],
          [
            sent('She got a promotion after two years of hard work.', 'İki yıl sıkı çalışmadan sonra terfi aldı.'),
            sent('The deadline for the report is next Friday.', 'Raporun teslim tarihi gelecek cuma.'),
            sent('He prepared his resume for the job interview.', 'İş görüşmesi için özgeçmişini hazırladı.'),
            sent('Good communication skills are important at work.', 'İyi iletişim becerileri iş yerinde önemlidir.'),
          ],
        ),
        environment: category(
          'Environment',
          'Çevre',
          [
            word('pollution', 'kirlilik'),
            word('climate change', 'iklim değişikliği'),
            word('recycling', 'geri dönüşüm'),
            word('renewable', 'yenilenebilir'),
            word('sustainable', 'sürdürülebilir'),
            word('waste', 'atık'),
            word('deforestation', 'ormansızlaşma'),
            word('ecosystem', 'ekosistem'),
            word('emissions', 'salım, emisyon'),
            word('conservation', 'koruma'),
          ],
          [
            sent('Air pollution is a serious problem in big cities.', 'Hava kirliliği büyük şehirlerde ciddi bir sorun.'),
            sent('Recycling paper saves trees and water.', 'Kağıt geri dönüşümü ağaçları ve suyu korur.'),
            sent('Solar power is a renewable source of energy.', 'Güneş enerjisi yenilenebilir bir enerji kaynağıdır.'),
            sent('Deforestation destroys the homes of many animals.', 'Ormansızlaşma birçok hayvanın yuvasını yok eder.'),
          ],
        ),
        technology: category(
          'Technology',
          'Teknoloji',
          [
            word('artificial intelligence', 'yapay zeka'),
            word('device', 'cihaz'),
            word('software', 'yazılım'),
            word('network', 'ağ'),
            word('privacy', 'gizlilik'),
            word('innovation', 'yenilik'),
            word('cybersecurity', 'siber güvenlik'),
            word('automation', 'otomasyon'),
            word('algorithm', 'algoritma'),
            word('digital', 'dijital'),
          ],
          [
            sent('Artificial intelligence is changing how we work.', 'Yapay zeka çalışma şeklimizi değiştiriyor.'),
            sent('Cybersecurity protects our personal data online.', 'Siber güvenlik kişisel verilerimizi çevrimiçi korur.'),
            sent('Automation makes factories faster and safer.', 'Otomasyon fabrikaları daha hızlı ve güvenli yapar.'),
            sent('This app was built with modern software tools.', 'Bu uygulama modern yazılım araçlarıyla yapıldı.'),
          ],
        ),
        society_media: category(
          'Society & Media',
          'Toplum ve Medya',
          [
            word('community', 'topluluk'),
            word('government', 'hükümet'),
            word('citizen', 'vatandaş'),
            word('journalism', 'gazetecilik'),
            word('social media', 'sosyal medya'),
            word('influence', 'etki'),
            word('advertisement', 'reklam'),
            word('opinion', 'görüş'),
            word('debate', 'tartışma, müzakere'),
            word('policy', 'politika'),
          ],
          [
            sent('Social media has a huge influence on young people.', 'Sosyal medyanın gençler üzerinde büyük etkisi var.'),
            sent('Every citizen should vote in the election.', 'Her vatandaş seçimde oy kullanmalı.'),
            sent('The new policy protects personal information.', 'Yeni politika kişisel bilgileri koruyor.'),
            sent('The debate about climate policy continues.', 'İklim politikası tartışması devam ediyor.'),
          ],
        ),
      },
    },
  ],
};

function w2(en, tr) { return {en, tr, image: IMG}; }

// Doğrulama
let total = 0;
Object.entries(b2.B2level[0].vocabulary).forEach(([k, v]) => {
  if (!v.category) return;
  console.log(k + ':', v.category.words.length, 'kelime,', v.category.example_sentences.length, 'örnek');
  total += v.category.words.length;
});
console.log('B2 TOPLAM KELİME:', total);

fs.writeFileSync(
  '/Users/hasangonen/Desktop/hasan/app/dilgenie/vocabulary/B2level.json',
  JSON.stringify(b2, null, 2),
);
console.log('✅ vocabulary/B2level.json yazıldı');
