interface A1LevelData {
    vocabulary: {
        en: string;
        tr: string;
        greetings: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        family: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        time_dates: {
            en: string;
            tr: string;
            days: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            months: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            example_sentences: { en: string; tr: string }[];
        };
        places_directions: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        food_drinks: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        colors_numbers_shapes: {
            en: string;
            tr: string;
            colors: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            numbers: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            shapes: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            example_sentences: { en: string; tr: string }[];
        };
    };
    grammar: {
        en: string;
        tr: string;
        pronouns: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        basic_verbs: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
        adjectives_adverbs: {
            en: string;
            tr: string;
            adjectives: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            adverbs: {
                en: string;
                tr: string;
                words: { en: string; tr: string }[];
            };
            example_sentences: { en: string; tr: string }[];
        };
        sentence_structures: {
            en: string;
            tr: string;
            positive: {
                en: string;
                tr: string;
                structure: { en: string; tr: string };
                example: { en: string; tr: string };
            };
            negative: {
                en: string;
                tr: string;
                structure: { en: string; tr: string };
                example: { en: string; tr: string };
            };
            question: {
                en: string;
                tr: string;
                structure: { en: string; tr: string };
                example: { en: string; tr: string };
            };
        };
        present_tense: {
            en: string;
            tr: string;
            simple_present: {
                en: string;
                tr: string;
                structure: { en: string; tr: string };
                example: { en: string; tr: string };
            };
            present_continuous: {
                en: string;
                tr: string;
                structure: { en: string; tr: string };
                example: { en: string; tr: string };
            };
        };
        prepositions: {
            en: string;
            tr: string;
            words: { en: string; tr: string }[];
            example_sentences: { en: string; tr: string }[];
        };
    };
    speaking_listening: {
        en: string;
        tr: string;
        listening_exercises: {
            en: string;
            tr: string;
            exercises: {
                title: { en: string; tr: string };
                script: { en: string; tr: string };
            }[];
        };
        speaking_practices: {
            en: string;
            tr: string;
            practices: {
                title: { en: string; tr: string };
                prompt: { en: string; tr: string };
                example_dialogue: { en: string; tr: string };
            }[];
        };
    };
    reading_writing: {
        en: string;
        tr: string;
        reading_texts: {
            en: string;
            tr: string;
            texts: {
                title: { en: string; tr: string };
                content: { en: string; tr: string };
            }[];
        };
        writing_exercises: {
            en: string;
            tr: string;
            exercises: {
                title: { en: string; tr: string };
                prompt: { en: string; tr: string };
                example_answer: { en: string; tr: string };
            }[];
        };
    };
    interactive_activities_games: {
        en: string;
        tr: string;
        activities: {
            title: { en: string; tr: string };
            type: { en: string; tr: string };
            description: { en: string; tr: string };
            example_words?: { en: string; tr: string }[];
            example_sentence?: { en: string; tr: string };
            correct_answer?: { en: string; tr: string };
        }[];
    };
    cultural_content: {
        en: string;
        tr: string;
        topics: {
            topic: { en: string; tr: string };
            description: { en: string; tr: string };
        }[];
    };
    progress_tracking: {
        en: string;
        tr: string;
        achievements: {
            en: string;
            tr: string;
            list: { en: string; tr: string }[];
        };
    };
}
export default A1LevelData