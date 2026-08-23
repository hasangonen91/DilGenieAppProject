const fs = require('fs');
const {A1, A2} = require('./a1a2');
const B1 = require('./b1');
const b2extra = require('./b2extra');
const C1 = require('./c1');
const C2 = require('./c2');
const exams = require('./exams');

// B2: mevcut repo içeriği + ekstra kategoriler
const existingB2 = JSON.parse(fs.readFileSync('/Users/hasangonen/Desktop/hasan/app/dilgenie/vocabulary/B2level.json', 'utf8'));
const oldB2Vocab = (existingB2.B2level && existingB2.B2level[0]?.vocabulary) || (existingB2[0]?.vocabulary) || {};
const mergedB2Vocab = {...oldB2Vocab, ...b2extra};

// final_exam ekleme yardımcı fonksiyonu
const withExam = (levelObj, levelName) => {
  const vocab = levelObj[levelName][0].vocabulary;
  vocab.final_exam = {
    en: 'Level Test',
    tr: 'Seviye Sınavı',
    category: {questions: exams[levelName.replace('level', '')]},
  };
  return levelObj;
};

const levels = {
  A1level: withExam(A1, 'A1level'),
  A2level: withExam(A2, 'A2level'),
  B1level: withExam(B1, 'B1level'),
  C1level: withExam(C1, 'C1level'),
  C2level: withExam(C2, 'C2level'),
};

// B2'yi elle kur (merge edilmiş)
levels.B2level = {
  B2level: [{
    vocabulary: {
      ...mergedB2Vocab,
      final_exam: {
        en: 'Level Test',
        tr: 'Seviye Sınavı',
        category: {questions: exams.B2},
      },
    },
  }],
};

// Yaz + raporla
Object.entries(levels).forEach(([name, obj]) => {
  let v;
  if (name === 'B2level') {
    v = obj.B2level[0].vocabulary;
  } else {
    v = obj[name][0].vocabulary;
  }
  let words = 0, cats = 0, sents = 0, qs = 0;
  Object.values(v).forEach(x => {
    if (x.category) {
      if (x.category.words) { cats++; words += x.category.words.length; }
      if (x.category.example_sentences) sents += x.category.example_sentences.length;
      if (x.category.questions) qs += x.category.questions.length;
    }
  });
  console.log(`${name}: ${cats} kategori | ${words} kelime | ${sents} örnek | ${qs} sınav sorusu`);
  const out = name === 'B2level' ? {B2level: obj.B2level} : obj;
  fs.writeFileSync(
    `/Users/hasangonen/Desktop/hasan/app/dilgenie/vocabulary/${name}.json`,
    JSON.stringify(out, null, 2),
  );
});
console.log('✅ Tüm seviye dosyaları yazıldı');
