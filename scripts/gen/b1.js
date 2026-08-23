// B1 seviyesi — 4 kategori x 10 kelime
const {w, s, cat} = require('./helpers');

module.exports = {
  B1level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        work_career: cat('Work & Career', 'İş ve Kariyer', [
          w('promotion', 'terfi'), w('deadline', 'teslim tarihi'),
          w('colleague', 'iş arkadaşı'), w('salary', 'maaş'),
          w('employer', 'işveren'), w('employee', 'çalışan'),
          w('skills', 'beceriler'), w('meeting', 'toplantı'),
          w('resume', 'özgeçmiş'), w('interview', 'iş görüşmesi'),
        ], [
          s('She got a promotion after two years.', 'İki yıl sonra terfi aldı.'),
          s('The deadline is next Friday.', 'Teslim tarihi gelecek cuma.'),
          s('He prepared his resume for the interview.', 'Görüşme için özgeçmişini hazırladı.'),
          s('Communication skills are important at work.', 'İş yerinde iletişim becerileri önemlidir.'),
        ]),
        education: cat('Education', 'Eğitim', [
          w('degree', 'diploma'), w('course', 'kurs, ders'),
          w('scholarship', 'burs'), w('graduate', 'mezun olmak'),
          w('research', 'araştırma'), w('lecture', 'ders, konferans'),
          w('assignment', 'ödev, görev'), w('campus', 'kampüs'),
          w('tutor', 'özel öğretmen'), w('knowledge', 'bilgi'),
        ], [
          s('She won a scholarship to study abroad.', 'Yurt dışında okumak için burs kazandı.'),
          s('The lecture starts at nine sharp.', 'Ders dokuzda tam başlar.'),
          s('He graduated with a law degree.', 'Hukuk diplomasıyla mezun oldu.'),
          s('Sharing knowledge makes you stronger.', 'Bilgi paylaşmak seni güçlendirir.'),
        ]),
        travel_experiences: cat('Travel & Experiences', 'Seyahat ve Deneyimler', [
          w('abroad', 'yurt dışı'), w('journey', 'yolculuk'),
          w('sightseeing', 'gezip görme'), w('accommodation', 'konaklama'),
          w('itinerary', 'seyahat planı'), w('border', 'sınır'),
          w('souvenir', 'hatıra'), w('guidebook', 'gezi rehberi'),
          w('destination', 'varış yeri'), w('backpack', 'sırt çantası'),
        ], [
          s('Our accommodation was near the beach.', 'Konaklamamız plaja yakındı.'),
          s('We planned our itinerary together.', 'Seyahat planımızı birlikte yaptık.'),
          s('I bought a souvenir from every city.', 'Her şehirden hatıra aldım.'),
          s('Traveling abroad changes your perspective.', 'Yurt dışına seyahat bakış açını değiştirir.'),
        ]),
        health_fitness: cat('Health & Fitness', 'Sağlık ve Fitness', [
          w('injury', 'sakatlık'), w('recovery', 'iyileşme'),
          w('workout', 'antrenman'), w('nutrition', 'beslenme'),
          w('mental health', 'ruh sağlığı'), w('check-up', 'kontrol muayenesi'),
          w('prescription', 'reçete'), w('well-being', 'iyilik hali'),
          w('stretching', 'esneme'), w('hydration', 'su içme'),
        ], [
          s('Regular workouts improve mental health.', 'Düzenli antrenman ruh sağlığını iyileştirir.'),
          s('The doctor wrote a prescription for me.', 'Doktor bana reçete yazdı.'),
          s('Stretching prevents injuries.', 'Esneme sakatlıkları önler.'),
          s('Hydration is important during exercise.', 'Egzersizde su tüketimi önemlidir.'),
        ]),
      },
    },
  ],
};
