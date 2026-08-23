// topicWords.seed.json -> topicWords.seed.tsx dönüştürücü
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('src/data/topicWords.seed.json', 'utf8'));

const header =
  '// Konu kelimeleri FALLBACK verisi — canlı kaynak: dilgenie repo/list/topicWords.json\n' +
  '// Bot hattı günceller; buradaki veri offline yedektir.\n' +
  "import type {TopicWordsMap} from './topicWords';\n\n" +
  'export const topicWordsSeed: TopicWordsMap = ';

fs.writeFileSync(
  'src/data/topicWords.seed.tsx',
  header + JSON.stringify(d, null, 2) + ';\n',
);
fs.unlinkSync('src/data/topicWords.seed.json');
console.log('OK - topicWords.seed.tsx,', Object.keys(d).length, 'konu');
