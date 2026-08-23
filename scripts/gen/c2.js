// C2 seviyesi — 6 kategori x 10 kelime (mastery level)
const {w, s, cat} = require('./helpers');

module.exports = {
  C2level: [
    {
      vocabulary: {
        en: 'Vocabulary',
        tr: 'Kelime Bilgisi',
        sophisticated_adjectives: cat('Sophisticated Adjectives', 'İleri Sıfatlar', [
          w('meticulous', 'aşırı dikkatli'), w('profound', 'derin'),
          w('intricate', 'karmaşık, girift'), w('inevitable', 'kaçınılmaz'),
          w('ambiguous', 'belirsiz'), w('compelling', 'ikna edici, surükleyici'),
          w('redundant', 'gereksiz, fazla'), w('pragmatic', 'pragmatik, işe dönük'),
          w('subtle', 'hafif, ince'), w('versatile', 'çok yönlü'),
        ], [
          s('Her meticulous work earned global respect.', 'Aşırı dikkatli çalışması küresel saygı kazandı.'),
          s('Change is inevitable in every industry.', 'Değişim her sektörde kaçınılmazdır.'),
          s('The film offers a compelling argument.', 'Film ikna edici bir argüman sunuyor.'),
          s('The difference is subtle but important.', 'Fark hafif ama önemli.'),
        ]),
        formal_writing: cat('Formal Writing', 'Resmi Yazı', [
          w('furthermore', '.ayrıca, bundan baska'), w('nevertheless', 'yine de'),
          w('consequently', 'sonuç olarak'), w('notwithstanding', '-e rağmen'),
          w('thereby', 'bu yolla'), w('whereas', 'oysa ki'),
          w('hence', 'bu nedenle'), w('albeit', '-mekla birlikte'),
          w('pursuant to', '.uyarın, geregi'), w('aforementioned', '.adı gecen'),
        ], [
          s('.Furthermore, the data supports our claim.', '.Ayrıca, veri iddiamızı destekliyor.'),
          s('The results were promising; nevertheless, caution is needed.', 'Sonuçlar umut verici; yine de dikkat gerek.'),
          s('The rule applies to the aforementioned cases.', '.Kural adı gecen durumlara uygulanir.'),
          s('He agreed, albeit reluctantly.', '.Kabul etti, mekla birlikte isteksizce.'),
        ]),
        nuances_collocations: cat('Nuances & Collocations', 'Nüanslar ve Kalıp Öbekleri', [
          w('utterly ridiculous', 'saçmalıkta sınırı asmis'), w('bitterly cold', '.dikine soğuk'),
          w('deeply concerned', '.derin kaygılı'), w('highly unlikely', 'pekc olası değil'),
          w('widely accepted', 'geniş kabul gormus'), w('stark contrast', '.kesin zidlik'),
          w('vast majority', 'buyuk cogunluk'), w('sheer luck', 'tamamen sans'),
          w('grave mistake', '.agir hata'), w('keen interest', '.guclu ilgi'),
        ], [
          s('There is a stark contrast between the two reports.', 'Iki rapor arasında kesin zidlik var.'),
          s('It was sheer luck that nobody was hurt.', 'Kimse zarar gormedi; tamamen sans.'),
          s('He made a grave mistake under pressure.', 'Baski altinda agir bir hata yaptı.'),
          s('The theory is widely accepted today.', 'Teori bugun genis kabul gormus durumda.'),
        ]),
        literature_criticism: cat('Literature & Criticism', '.Edebiyat ve Eleştiri', [
          w('allegory', 'alegori'), w('metaphor', 'metafor'),
          w('satire', 'mizah, yergi'), w('protagonist', 'ana karakter'),
          w('narrative', '.anlatı'), w('symbolism', 'sembolizm'),
          w('irony', 'ironi'), w('aesthetic', 'estetik'),
          w('interpretation', '.yorum, yorumlama'), w('discourse', 'soylem'),
        ], [
          s('The novel works as a political allegory.', 'Roman politik bir allegori olarak isler.'),
          s('Irony gives the story its power.', 'Ironi hikayeye gucunu veriyor.'),
          s('His interpretation of the poem is original.', '.Siiri yorumlamasi orijinal.'),
          s('The protagonist changes through the narrative.', '.Ana karakter anlatı boyunca degisir.'),
        ]),
        philosophy_ideas: cat('Philosophy & Ideas', 'Felsefe ve Fikirler', [
          w('consciousness', 'bilinc'), w('ethics', '.etik, ahlak'),
          w('rationality', '.rasyonalite, akilcilik'), w('paradox', 'paradoks'),
          w('determinism', '.determinizm, gereklircilik'), w('existential', '.varoluşsal'),
          w('subjective', '.oznel'), w('objective', 'nesnel'),
          w('morality', '.ahlak'), w('enlightenment', '.aydinlanma'),
        ], [
          s('Consciousness remains a philosophical mystery.', 'Bilinc felsefi bir gizem olarak kaliyor.'),
          s('Is morality objective or subjective?', '.Ahlak nesnel mi oznel mi?'),
          s('The paradox challenges our logic.', 'Paradoks mantigimize meydan okuyor.'),
          s('Existential questions define human thought.', '.Varoluşsal sorular insan dusuncesini tanimlar.'),
        ]),
        advanced_phrasal: cat('Advanced Phrasal Verbs', 'İleri Phrasal Verbs', [
          w('come to terms with', '.kabul etmek, alismak'), w('get away with', '...le/ile kacirmak'),
          w('look down on', '...e/kue bakmak'), w('put up with', '.katlanmak'),
          w('run into', '.tesaduf etmek'), w('stand up for', '...i savunmak'),
          w('take after', '.benzemek (aile)'), w('turn down', '.reddetmek'),
          w('break through', '.asilari elde etmek'), w('carry out', '.gerceklestirmek'),
        ], [
          s('She came to terms with her past.', '.Gecmisini kabul etti, onunla baristi.'),
          s('He never looks down on beginners.', 'Hicbir zaman yeni baslayanlari kucumsemez.'),
          s('They carried out the plan successfully.', 'Planı başarıyla gerçekleştirdiler.'),
          s('I ran into an old friend yesterday.', 'Dun eski bir arkadasima tesaduf ettim.'),
        ]),
      },
    },
  ],
};
