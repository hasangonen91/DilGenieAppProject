const data = {
    vocabulary: {
        en: "Vocabulary",
        tr: "Kelime Bilgisi",
        greetings: {
            en: "Greetings",
            tr: "Selamlaşmalar",
            words: [
                { key: 1, en: "Hello", tr: "Merhaba", image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
                { key: 2, en: "Goodbye", tr: "Hoşça kal", image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
                { key: 3, en: "Good morning", tr: "Günaydın", image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
                { key: 4, en: "Good evening", tr: "İyi akşamlar", image: 'https://random-image-pepebigotes.vercel.app/api/random-image' },
                { key: 5, en: "How are you?", tr: "Nasılsın?", image: 'https://random-image-pepebigotes.vercel.app/api/random-image' }
            ],
            example_sentences: [
                {
                    key: 1,
                    en: "Hello, how are you today?",
                    tr: "Merhaba, bugün nasılsın?",
                    image: 'https://random-image-pepebigotes.vercel.app/api/random-image'
                },
                {
                    key: 2,
                    en: "Good morning! It's a beautiful day.",
                    tr: "Günaydın! Güzel bir gün.",
                    image: 'https://random-image-pepebigotes.vercel.app/api/random-image'
                }
            ],
            questions: [
                {
                    key: 1,
                    question_en: "What is another way to say 'Goodbye'?",
                    question_tr: "'Hoşça kal' demenin başka bir yolu nedir?",
                    answer_en: "Farewell",
                    answer_tr: "Elveda",
                    image: 'https://random-image-pepebigotes.vercel.app/api/random-image'
                },
                {
                    key: 2,
                    question_en: "How would you greet someone in the evening?",
                    question_tr: "Akşamleyin birini nasıl selamlarsın?",
                    answer_en: "Good evening",
                    answer_tr: "İyi akşamlar",
                    image: 'https://random-image-pepebigotes.vercel.app/api/random-image'
                }
            ]
        },
    }
};

export default data;


