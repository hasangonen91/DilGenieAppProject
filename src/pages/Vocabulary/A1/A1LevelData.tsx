export interface A1LevelData {
  vocabulary: {
    greetings: CategoryData;
    family: CategoryData;
    months: CategoryData;
    years: CategoryData;
    colors_numbers_shapes: CategoryData;
    days: CategoryData;
    places: CategoryData;
    directions: CategoryData;
  };
}
export interface CategoryData {
  en: string;
  tr: string;
  category: {
    words: { en: string; tr: string; image: string }[];
    example_sentences: { en: string; tr: string; image: string }[];
  };
}
