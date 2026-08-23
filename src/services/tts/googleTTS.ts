import * as RNFS from '@dr.pogodin/react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import {
  DEFAULT_GEMINI_API_KEY,
  GEMINI_TTS_MODEL,
  DEFAULT_VOICE_ID,
} from '../../config/ttsConfig';

const KEY_STORAGE = '@dilgenie/gemini_api_key';
const VOICE_STORAGE = '@dilgenie/tts_voice';
const CACHE_DIR = `${RNFS.CachesDirectoryPath}/tts-cache`;

export type TTSStatus =
  | 'idle'
  | 'loading'
  | 'playing-google'
  | 'playing-device';

// TTSAudioHost component'ine çalma isteği yollamak için.
export interface PlayRequest {
  uri: string;
}

let apiKey = '';
let selectedVoice = DEFAULT_VOICE_ID;
let lastFailAt = 0; // kota/hata sonrası 60 sn Gemini'ye dokunma

const statusListeners: Array<(s: TTSStatus) => void> = [];
const playListeners: Array<(r: PlayRequest | null) => void> = [];

function emit(s: TTSStatus) {
  statusListeners.forEach(l => l(s));
}

/** Görünmez audio host'unu bu modüle bağla (App mount'ta çağrılır). */
export function bindAudioHost(
  cb: (req: PlayRequest | null) => void,
): () => void {
  playListeners.push(cb);
  return () => {
    const i = playListeners.indexOf(cb);
    if (i >= 0) {
      playListeners.splice(i, 1);
    }
  };
}

function requestPlay(req: PlayRequest | null) {
  playListeners.forEach(l => l(req));
}

export function onTTSStatus(cb: (s: TTSStatus) => void) {
  statusListeners.push(cb);
  return () => {
    const i = statusListeners.indexOf(cb);
    if (i >= 0) {
      statusListeners.splice(i, 1);
    }
  };
}

export function isHDTTSAvailable() {
  return !!apiKey && Date.now() - lastFailAt > 60000;
}

export async function initGoogleTTS() {
  try {
    await RNFS.mkdir(CACHE_DIR);
  } catch {}
  try {
    const [savedKey, savedVoice] = await Promise.all([
      AsyncStorage.getItem(KEY_STORAGE),
      AsyncStorage.getItem(VOICE_STORAGE),
    ]);
    apiKey = savedKey || DEFAULT_GEMINI_API_KEY;
    selectedVoice = savedVoice || DEFAULT_VOICE_ID;
  } catch {}
}

export function setGeminiApiKey(key: string) {
  apiKey = key.trim();
  lastFailAt = 0;
  return AsyncStorage.setItem(KEY_STORAGE, apiKey);
}

export function setVoice(id: string) {
  selectedVoice = id;
  return AsyncStorage.setItem(VOICE_STORAGE, id);
}

export function getSelectedVoice() {
  return selectedVoice;
}

// --- yardımcılar -----------------------------------------------------------

function hashText(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

// Ham PCM (16-bit mono) verisine WAV header'ı sarar.
function pcmToWav(pcm: Uint8Array, sampleRate = 24000): Uint8Array {
  const header = new ArrayBuffer(44);
  const v = new DataView(header);
  const writeStr = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) {
      v.setUint8(offset + i, s.charCodeAt(i));
    }
  };
  const dataSize = pcm.length;
  writeStr(0, 'RIFF');
  v.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  v.setUint32(16, 16, true); // fmt chunk boyutu
  v.setUint16(20, 1, true); // PCM format
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true); // byte rate (16-bit mono)
  v.setUint16(32, 2, true); // block align
  v.setUint16(34, 16, true); // bits per sample
  writeStr(36, 'data');
  v.setUint32(40, dataSize, true);
  const wav = new Uint8Array(44 + dataSize);
  wav.set(new Uint8Array(header), 0);
  wav.set(pcm, 44);
  return wav;
}

function extractSampleRate(mimeType?: string): number {
  const m = /rate=(\d+)/.exec(mimeType || '');
  return m ? parseInt(m[1], 10) : 24000;
}

export function stopSpeaking() {
  requestPlay(null); // host videoyu duraklatır
  Tts.stop(false);
  emit('idle');
}

// --- Gemini TTS -------------------------------------------------------------

async function requestGoogleTTS(
  text: string,
  styleHint?: string,
): Promise<string | null> {
  const prompt = styleHint ? `${styleHint}: ${text}` : text;

  // Cache'te varsa ağı hiç meşgul etme.
  const fileName = `${selectedVoice}-${hashText(selectedVoice + text)}.wav`;
  const filePath = `${CACHE_DIR}/${fileName}`;
  try {
    if (await RNFS.exists(filePath)) {
      return filePath;
    }
  } catch {}

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [{parts: [{text: prompt}]}],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: selectedVoice}},
          },
        },
      }),
      signal: AbortSignal.timeout(20000),
    },
  );
  if (!res.ok) {
    throw new Error(`gemini-tts-http-${res.status}`);
  }
  const json = await res.json();
  const part = json?.candidates?.[0]?.content?.parts?.find(
    (p: any) => p.inlineData?.data,
  );
  if (!part?.inlineData?.data) {
    throw new Error('gemini-tts-empty-audio');
  }
  const sampleRate = extractSampleRate(part.inlineData.mimeType);
  const pcm = base64ToBytes(part.inlineData.data);
  const wav = pcmToWav(pcm, sampleRate);

  await RNFS.writeFile(filePath, bytesToBase64(wav), 'base64');
  return filePath;
}

function playDeviceTTS(text: string, rate: number) {
  requestPlay(null);
  emit('playing-device');
  Tts.stop(false);
  Tts.setDefaultRate?.(rate, true);
  Tts.setDefaultPitch?.(1.0);
  Tts.speak(text);
}

/**
 * Birincil: Google HD ses (Sadachbia vb.). Kota/ağ hatasında cihaz TTS'e düşer.
 * Dönüş: hangi kaynağın kullanıldığı.
 */
export async function speakSmart(
  text: string,
  opts?: {rate?: number; styleHint?: string},
): Promise<'google' | 'device'> {
  if (!text) {
    return 'device';
  }
  if (isHDTTSAvailable()) {
    emit('loading');
    try {
      const path = await requestGoogleTTS(text, opts?.styleHint);
      if (path) {
        requestPlay(null); // önce önceki sesi kes
        Tts.stop(false);
        requestPlay({uri: `file://${path}`});
        emit('playing-google');
        return 'google';
      }
    } catch (e) {
      lastFailAt = Date.now();
    }
  }
  playDeviceTTS(text, opts?.rate ?? 0.46);
  return 'device';
}

// Kolay arayüzler
export function speakWordHD(word: string) {
  return speakSmart(word, {
    rate: 0.42,
    styleHint: 'Say this single English word slowly and clearly',
  });
}

export function speakSentenceHD(sentence: string) {
  return speakSmart(sentence, {
    rate: 0.48,
    styleHint: 'Say this sentence naturally and friendly',
  });
}
