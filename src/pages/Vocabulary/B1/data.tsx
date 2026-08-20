const data = {
  vocabulary: {
    en: 'Vocabulary',
    tr: 'Kelime Bilgisi',
    greetings: {
      en: 'Greetings',
      tr: 'Selamlaşmalar',
      words: [
        {
          key: 1,
          en: 'Hello',
          tr: 'Merhaba',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          en: 'Goodbye',
          tr: 'Hoşça kal',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 3,
          en: 'Good morning',
          tr: 'Günaydın',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 4,
          en: 'Good evening',
          tr: 'İyi akşamlar',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 5,
          en: 'How are you?',
          tr: 'Nasılsın?',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      example_sentences: [
        {
          key: 1,
          en: 'Hello, how are you today?',
          tr: 'Merhaba, bugün nasılsın?',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          en: "Good morning! It's a beautiful day.",
          tr: 'Günaydın! Güzel bir gün.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      questions: [
        {
          key: 1,
          question_en: "What is another way to say 'Goodbye'?",
          question_tr: "'Hoşça kal' demenin başka bir yolu nedir?",
          answer_en: 'Farewell',
          answer_tr: 'Elveda',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          question_en: 'How would you greet someone in the evening?',
          question_tr: 'Akşamleyin birini nasıl selamlarsın?',
          answer_en: 'Good evening',
          answer_tr: 'İyi akşamlar',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
    },
    family: {
      en: 'Family',
      tr: 'Aile',
      words: [
        {
          key: 6,
          en: 'Mother',
          tr: 'Anne',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 7,
          en: 'Father',
          tr: 'Baba',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 8,
          en: 'Sister',
          tr: 'Kız kardeş',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 9,
          en: 'Brother',
          tr: 'Erkek kardeş',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 10,
          en: 'Grandmother',
          tr: 'Büyükanne',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 11,
          en: 'Grandfather',
          tr: 'Dede',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      example_sentences: [
        {
          key: 1,
          en: 'My mother is a teacher.',
          tr: 'Annem bir öğretmen.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          en: 'I visit my grandparents every weekend.',
          tr: 'Her hafta sonu dedem ve büyükanemi ziyaret ederim.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      questions: [
        {
          key: 1,
          question_en: "What do you call your mother's sister?",
          question_tr: 'Amcanın kız kardeşi ne denir?',
          answer_en: 'Aunt',
          answer_tr: 'Hala',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          question_en: "Who is your father's father?",
          question_tr: 'Babanın babası kimdir?',
          answer_en: 'Grandfather',
          answer_tr: 'Dede',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
    },
    daily_routines: {
      en: 'Daily Routines',
      tr: 'Günlük Rutinler',
      words: [
        {
          key: 12,
          en: 'Wake up',
          tr: 'Uyanmak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 13,
          en: 'Brush teeth',
          tr: 'Diş fırçalama',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 14,
          en: 'Take a shower',
          tr: 'Duş almak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 15,
          en: 'Have breakfast',
          tr: 'Kahvaltı yapmak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 16,
          en: 'Go to work',
          tr: 'İşe gitmek',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 17,
          en: 'Go to bed',
          tr: 'Yatmak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      example_sentences: [
        {
          key: 1,
          en: "I usually wake up at 7 o'clock in the morning.",
          tr: "Normalde sabah 7'de uyanırım.",
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          en: 'She brushes her teeth after every meal.',
          tr: 'Her öğleden sonra dişlerini fırçalar.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      questions: [
        {
          key: 1,
          question_en: 'What do you do after you wake up in the morning?',
          question_tr: 'Sabah uyandıktan sonra ne yaparsın?',
          answer_en: 'Brush teeth',
          answer_tr: 'Diş fırçalama',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          question_en: 'When do you usually have breakfast?',
          question_tr: 'Normalde kahvaltıyı ne zaman yaparsın?',
          answer_en: 'In the morning',
          answer_tr: 'Sabahları',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
    },
    shopping: {
      en: 'Shopping',
      tr: 'Alışveriş',
      words: [
        {
          key: 18,
          en: 'price',
          tr: 'fiyat',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 19,
          en: 'buy',
          tr: 'almak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 20,
          en: 'sell',
          tr: 'satmak',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 21,
          en: 'cheap',
          tr: 'ucuz',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 22,
          en: 'expensive',
          tr: 'pahalı',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 23,
          en: 'shop',
          tr: 'mağaza',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      example_sentences: [
        {
          key: 1,
          en: 'The price of this shirt is too high.',
          tr: 'Bu gömmenin fiyatı çok yüksek.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          en: 'I want to buy a new phone.',
          tr: 'Yeni bir telefon almak istiyorum.',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
      questions: [
        {
          key: 1,
          question_en: 'What is the opposite of "expensive"?',
          question_tr: '"Pahalı"ın zıttı nedir?',
          answer_en: 'cheap',
          answer_tr: 'ucuz',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
        {
          key: 2,
          question_en: 'Where do you go to buy groceries?',
          question_tr: 'Market alışverişi yapmak için nereye gidersin?',
          answer_en: 'shop',
          answer_tr: 'mağaza',
          image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
        },
      ],
    },
  },
};

export default data;
