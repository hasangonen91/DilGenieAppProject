// Konu kelimeleri LOADER'ı — veri KODUN İÇİNDE DEĞİL.
// 1) Önce data repo'dan (dilgenie/list/topicWords.json) çeker — bot gece besler
// 2) Olmazsa bundle içindeki topicWords.seed.tsx ile çalışır (offline fallback)
// Kullanım: const words = await getTopicWords();  words['Nature'][0].en
import {topicWordsSeed as seed} from './topicWords.seed';

export interface TopicWord {
  en: string;
  tr: string;
  example: string;
  /** İsteğe bağlı tek cümlelik Türkçe ipucu — bot hattı doldurur */
  tip?: string;
}
export type TopicWordsMap = Record<string, TopicWord[]>;

const REMOTE_URL =
  'https://raw.githubusercontent.com/hasangonen91/dilgenie/main/list/topicWords.json';

let cache: TopicWordsMap | null = null;
let loading: Promise<TopicWordsMap> | null = null;

/** Uzak JSON'u getir; başarısızsa bundle fallback. Sonucu cache'ler. */
export async function getTopicWords(): Promise<TopicWordsMap> {
  if (cache) return cache;
  if (!loading) {
    loading = (async () => {
      try {
        const response = await fetch(REMOTE_URL);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const json = (await response.json()) as TopicWordsMap;
        // Basit şekil kontrolü
        if (json && typeof json === 'object' && Object.keys(json).length > 0) {
          cache = json;
          return cache;
        }
        throw new Error('empty payload');
      } catch (error) {
        console.log('topicWords remote yüklenemedi, fallback kullanılıyor:', error);
        cache = seed as TopicWordsMap;
        return cache;
      }
    })();
  }
  return loading;
}

/** Async beklemek istemeyen yerler için anlık erişim (remote gelmediyse fallback). */
export function getTopicWordsSync(): TopicWordsMap {
  return cache ?? (seed as TopicWordsMap);
}

/** Remote güncellemeyi arka planda tetikle (app açılışında çağır). */
export function prefetchTopicWords(): void {
  getTopicWords().catch(() => {});
}

// Geriye dönük uyumluluk: eski kod `topicWords[topic]` diye sync okuyordu.
// Bu proxy, cache dolunca gerçek veriyi gösterir; dolana kadar fallback döner.
export const topicWords: TopicWordsMap = new Proxy(
  {},
  {
    get(_t, prop: string) {
      return getTopicWordsSync()[prop];
    },
    has(_t, prop: string) {
      return prop in getTopicWordsSync();
    },
  },
) as TopicWordsMap;
