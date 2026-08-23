// C1 seviyesi — 6 kategori x 10 kelime
const {w, s, cat} = require('./helpers');

module.exports = {
  C1level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        abstract_concepts: cat('Abstract Concepts', 'Soyut Kavramlar', [
          w('perception', 'algı'), w('awareness', 'farkındalık'),
          w('assumption', 'varsayım'), w('perspective', 'bakış açısı'),
          w('implication', 'ima, sonuç'), w('contradiction', 'çelişki'),
          w('consistency', 'tutarlılık'), w('intuition', 'sezgi'),
          w('ambiguity', 'belirsizlik'), w('criterion', 'ölçüt'),
        ], [
          s('Your perception shapes your reality.', 'Algın gerçekliğini şekillendirir.'),
          s('The assumption proved to be wrong.', 'Varsayım yanlış çıktı.'),
          s('There is a contradiction in his argument.', 'Argümanında bir çelişki var.'),
          s('Intuition often guides good decisions.', 'Sezgi genellikle iyi kararlara yol gösterir.'),
        ]),
        academic_vocab: cat('Academic Vocabulary', 'Akademik Kelimeler', [
          w('significant', 'anlamlı, önemli'), w('relevant', 'alakalı'),
          w('substantial', 'kayda değer'), w('preliminary', 'ön, başlangıç'),
          w('empirical', 'deneye dayalı'), w('theoretical', 'kuramsal'),
          w('comprehensive', 'kapsamlı'), w('systematic', 'sistematik'),
          w('valid', 'geçerli'), w('derive', 'türetmek'),
        ], [
          s('The study shows a significant improvement.', 'Çalışma anlamlı bir iyileşme gösteriyor.'),
          s('Keep your sources relevant to the topic.', 'Kaynakları konuyla alakalı tut.'),
          s('It was a comprehensive and systematic review.', 'Kapsamlı ve sistematik bir derleme oldu.'),
          s('The theory derives from earlier research.', 'Teori önceki araştırmalardan türetilmiştir.'),
        ]),
        environment_policy: cat('Environment & Policy', 'Çevre ve Politika', [
          w('legislation', 'mevzuat'), w('implementation', 'uygulama'),
          w('regulation', 'düzenleme'), w('sustainability', 'sürdürülebilirlik'),
          w('carbon footprint', 'karbon ayak izi'), w('biodiversity', 'biyoçeşitlilik'),
          w('renewable energy', 'yenilenebilir enerji'), w('urbanization', 'şehirleşme'),
          w('initiative', 'girişim'), w('advocacy', 'savunuculuk'),
        ], [
          s('New legislation limits carbon emissions.', 'Yeni mevzuat karbon salımını sınırlıyor.'),
          s('Biodiversity supports a healthy ecosystem.', 'Biyoçeşitlilik sağlıklı ekosistemi destekler.'),
          s('The initiative promotes sustainability.', 'Girişim sürdürülebilirliği destekliyor.'),
          s('Urbanization affects the natural habitat.', 'Şehirleşme doğal yaşam alanını etkiliyor.'),
        ]),
        professional_communication: cat('Professional Communication', 'Profesyonel İletişim', [
          w('negotiate', 'müzakere etmek'), w('delegate', 'görev devretmek'),
          w('facilitate', 'kolaylaştırmak'), w('coordinate', 'koordine etmek'),
          w('prioritize', 'önceliklendirmek'), w('implement', 'hayata geçirmek'),
          w('evaluate', 'değerlendirmek'), w('clarify', 'netleştirmek'),
          w('acknowledge', 'kabul etmek'), w('address', 'ele almak'),
        ], [
          s('We negotiated a better contract.', 'Daha iyi bir sözleşme müzakere ettik.'),
          s('Please prioritize the urgent tasks.', 'Lütfen acil görevlere öncelik ver.'),
          s('She facilitated the meeting effectively.', 'Toplantıyı etkili şekilde kolaylaştırdı.'),
          s('Let me clarify my main point.', 'Ana fikrimi netleştireyim.'),
        ]),
        technology_trends: cat('Technology & Trends', 'Teknoloji ve Trendler', [
          w('breakthrough', 'büyük atılım'), w('cutting-edge', 'son teknoloji'),
          w('disruptive', 'pazar bozucu'), w('scalable', 'ölçeklenebilir'),
          w('interconnected', 'birbirine bağlı'), w('autonomous', 'otonom'),
          w('virtual', 'sanal'), w('immersive', 'surükleyici'),
          w('obsolete', 'modası gecmis'), w('streamline', 'optimize etmek'),
        ], [
          s('The breakthrough surprised the industry.', 'Atılım sektori şaşırttı.'),
          s('They use cutting-edge technology.', 'Son teknolojiyi kullanıyorlar.'),
          s('Old systems quickly become obsolete.', 'Eski sistemler hızla modasını kaybediyor.'),
          s('Automation streamlines repetitive work.', 'Otomasyon tekrarlı işi optimize eder.'),
        ]),
        emotions_advanced: cat('Emotions Advanced', 'Duygular İleri', [
          w('resilience', 'dayanıklılık'), w('empathy', 'empati'),
          w('contentment', 'huzur'), w('frustration', 'hüsran'),
          w('gratitude', 'minnettarlık'), w('vulnerability', 'kırılganlık'),
          w('serenity', 'dinginlik'), w('melancholy', 'hüzün'),
          w('enthusiasm', 'heyecan, istek'), w('composure', 'soğukkanlılık'),
        ], [
          s('Resilience helps us recover from setbacks.', 'Dayanıklılık aksamlardan sonra toparlanmamızı sağlar.'),
          s('She faced the crisis with composure.', 'Krizi soğukkanlılıkla karşıladı.'),
          s('Gratitude improves overall well-being.', 'Minnettarlık genel iyilik halini artırır.'),
          s('A feeling of serenity filled the room.', 'Odada dinginlik hissi doldu.'),
        ]),
      },
    },
  ],
};
