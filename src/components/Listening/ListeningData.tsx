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

export interface ListeningData {
  greetings: CategoryData;
  family: CategoryData;
  months: CategoryData;
  years: CategoryData;
  colors_numbers_shapes: CategoryData;
  days: CategoryData;
  places: CategoryData;
  directions: CategoryData;
}
