import Tts from 'react-native-tts';

// Kaliteli ses öncelik sırası (iOS premium/enhanced sesler)
// compact son ekli olanlar düşük kalite/dinamik indirilen seslerdir.
// premium/enhanced olanlar tam kalite neural sestir.
const PREFERRED_EN_VOICES = [
  'com.apple.ttsbundle.Samantha-premium',
  'com.apple.ttsbundle.Samantha',
  'com.apple.ttsbundle.Ava-premium',
  'com.apple.ttsbundle.Ava',
  'com.apple.ttsbundle.Zoe-premium',
  'com.apple.ttsbundle.Zoe',
  'com.apple.ttsbundle.Daniel-premium',
  'com.apple.ttsbundle.Daniel',
];

let isConfigured = false;

// iOS/Android'de mevcut en kaliteli İngilizce sesi seç
export async function setupSpeech() {
  if (isConfigured) {
    return;
  }
  try {
    // Sessiz modda da çalsın
    Tts.setIgnoreSilentSwitch?.('ignore');

    const voices = await Tts.voices();
    if (voices && voices.length > 0) {
      // 1) Önce PREFERRED listesinden mevcut olanı ara
      for (const preferredId of PREFERRED_EN_VOICES) {
        const found = voices.find(v => v.id === preferredId);
        if (found) {
          await Tts.setDefaultVoice(preferredId);
          await Tts.setDefaultLanguage(
            (found.language || 'en-US').replace('_', '-'),
          );
          isConfigured = true;
          return;
        }
      }
      // 2) Bulunamadıysa: quality=enhanced/premium olan İngilizce sesi bul
      const enVoices = voices.filter(
        v => v.language && v.language.toLowerCase().startsWith('en'),
      );
      const best = enVoices
        .filter(v => !String(v.id).includes('compact'))
        .sort((a, b) => {
          const qa =
            String(a.quality) === 'enhanced' || String(a.quality) === 'premium'
              ? 2
              : 0;
          const qb =
            String(b.quality) === 'enhanced' || String(b.quality) === 'premium'
              ? 2
              : 0;
          return qb - qa;
        })[0];
      if (best) {
        await Tts.setDefaultVoice(best.id);
        await Tts.setDefaultLanguage(
          (best.language || 'en-US').replace('_', '-'),
        );
      } else {
        // 3) Son çare: herhangi bir İngilizce ses
        const anyEn = enVoices[0];
        if (anyEn) {
          await Tts.setDefaultVoice(anyEn.id);
        }
      }
    }
    // Doğal konuşma hızı ve ton
    Tts.setDefaultRate?.(0.48, true);
    Tts.setDefaultPitch?.(1.0);
  } catch (e) {
    console.log('TTS kurulumu başarısız:', e);
  }
  isConfigured = true;
}

// Cümleyi konuş
export function speak(text: string) {
  if (!text) {
    return;
  }
  Tts.stop();
  Tts.speak(text);
}
