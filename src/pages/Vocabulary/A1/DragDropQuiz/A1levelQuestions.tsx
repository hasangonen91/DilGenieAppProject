export interface A1LevelQuestion {
    questions: {
        greetings: QuestionData;
        family: QuestionData;
        months: QuestionData;
        years: QuestionData;
        colors_numbers_shapes: QuestionData;
        days: QuestionData;
        places: QuestionData;
        directions: QuestionData;
    };
}

export interface QuestionData {
    en: string;
    tr: string;
    category: {
        questions: {
            sentence: string[];
            options: OptionData[];
            answer: string;
        }[];
    };
}

export interface OptionData {
    id: string;
    text: string;
}
