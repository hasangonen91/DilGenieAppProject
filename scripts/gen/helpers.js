// TÜM SEVİYELER için kelime verisi üretici — A1/A2/B1/B2/C1/C2
// Her kategori: 10 kelime + 4 örnek cümle. Her seviyeye final_exam (10 soru).
const fs = require('fs');
const IMG = 'https://random-image-pepebigotes.vercel.app/api/random-image';
const w = (en, tr) => ({en, tr, image: IMG});
const s = (en, tr) => ({en, tr, image: IMG});
const cat = (en, tr, words, sentences) => ({
  en,
  tr,
  category: {words, example_sentences: sentences},
});
// Soru: gap-fill formatı (GreetingsQuiz tarzı)
const q = (parts, options, answer) => ({sentence: parts, options, answer});

module.exports = {fs, IMG, w, s, cat, q};
