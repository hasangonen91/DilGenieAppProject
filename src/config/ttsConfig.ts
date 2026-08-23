// Google Gemini TTS konfigürasyonu — Chirp 3 HD ses paketleri.
// Key'i https://aistudio.google.com/apikey adresinden ücretsiz alabilirsin.
// Free tier: dakikada/günde sınırlı istek. Kota bitince app otomatik
// cihaz TTS'ine (offline) düşer, yani her koşulda çalışır.
export const DEFAULT_GEMINI_API_KEY = '';

export const GEMINI_TTS_MODEL = 'gemini-2.5-flash-preview-tts';

export interface VoiceOption {
  id: string; // Gemini voiceName
  name: string; // UI'da görünecek ad
  style: string; // Ses tarzı kısa açıklaması
}

// Google Chirp 3 HD ses ailesi — en popüler ve kaliteliler seçildi.
export const VOICES: VoiceOption[] = [
  {id: 'Sadachbia', name: 'Sadachbia', style: 'Canlı ve enerjik'},
  {id: 'Kore', name: 'Kore', style: 'Kararlı ve net'},
  {id: 'Puck', name: 'Puck', style: 'Neşeli ve parlak'},
  {id: 'Zephyr', name: 'Zephyr', style: 'Işıltılı'},
  {id: 'Charon', name: 'Charon', style: 'Bilgilendirici'},
  {id: 'Leda', name: 'Leda', style: 'Genç ve taze'},
  {id: 'Aoede', name: 'Aoede', style: 'Esintili ve yumuşak'},
  {id: 'Sulafat', name: 'Sulafat', style: 'Sıcakkanlı'},
];

export const DEFAULT_VOICE_ID = 'Sadachbia';
