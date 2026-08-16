// Video Listening veri tipleri
// Veriler dilgenie repo'sundaki videos.json'dan gelir (raw.githubusercontent).

export interface VideoQuestion {
  question: string;
  options: string[];
  correctOption: string;
  translation: string;
}

export interface VideoClip {
  id: string;
  title: string; // İngilizce başlık
  title_tr: string; // Türkçe başlık
  videoUrl: string; // mp4 URL (telifsiz/CC kaynak)
  thumbnail?: string;
  subtitle?: string; // kısa altyazı (İngilizce)
  subtitle_tr?: string; // Türkçe çeviri
  transcript: string; // diyalog metni
  transcript_tr: string; // Türkçe çevirisi
  questions: VideoQuestion[]; // video sonrası sorular
}

export interface VideoData {
  [category: string]: VideoClip[];
}
