// ListeningData.ts

export interface Question {
  question: string;
  image: string;
  options: string[];
  correctOption: string;
  translation: string;
}

export interface CategoryData {
  questions: Question[];
}

// Kategoriler dinamik olarak dilgenie repo'sundan gelir (A1ListeningData.json).
// [key: string] index signature sayesinde yeni kategoriler (animals, food_drinks...)
// ekstra tip tanımı gerektirmeden çalışır.
export interface ListeningData {
  [key: string]: CategoryData;
}
