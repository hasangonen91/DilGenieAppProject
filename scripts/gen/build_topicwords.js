// Part1 + Part2 birleştir, doğrula, JSON'ları üret
const p1 = require('./topicwords_part1.js').data;
const p2 = require('./topicwords_part2.js').data;
const fs = require('fs');

// part2'deki konular part1'i ezmesin — part2 zaten farklı konular
const data = {...p1, ...p2};

// Doğrulama
let ok = true;
Object.entries(data).forEach(([topic, words]) => {
  if (words.length !== 30) {
    console.log(`❌ ${topic}: ${words.length} (30 olmalı)`);
    ok = false;
  }
  const seen = new Set();
  words.forEach(word => {
    if (!word.en || !word.tr || !word.example) {
      console.log(`❌ ${topic}: eksik alan → ${JSON.stringify(word)}`);
      ok = false;
    }
    if (seen.has(word.en)) {
      console.log(`❌ ${topic}: tekrar → ${word.en}`);
      ok = false;
    }
    seen.add(word.en);
  });
});

console.log('Konu sayısı:', Object.keys(data).length);
if (!ok) { process.exit(1); }

// 1) Data repo: list/topicWords.json
const dataRepo = '/Users/hasangonen/Desktop/hasan/app/dilgenie/list/topicWords.json';
fs.mkdirSync(require('path').dirname(dataRepo), {recursive: true});
fs.writeFileSync(dataRepo, JSON.stringify(data, null, 2), 'utf8');
console.log('✅', dataRepo);

// 2) App fallback seed
const appSeed = '/private/var/folders/qk/3d0hpdsn3mdgp3hn7g4ckm_00000gn/T/opencode/DilGenieAppProject/src/data/topicWords.seed.json';
fs.writeFileSync(appSeed, JSON.stringify(data), 'utf8');
console.log('✅', appSeed);
