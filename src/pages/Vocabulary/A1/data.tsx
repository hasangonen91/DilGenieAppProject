const vocabulary = {
  greetings: {
    en: 'Greetings',
    tr: 'Selamlar',
    words: [
      {
        key: 1,
        en: 'hello',
        tr: 'merhaba',
        image: require('../../../assets/images/hello.png'),
      },
      {
        key: 2,
        en: 'hi',
        tr: 'hey',
        image: require('../../../assets/images/hi.png'),
      },
      {
        key: 3,
        en: 'good morning',
        tr: 'günaydın',
        image: require('../../../assets/images/good_morning.png'),
      },
      {
        key: 4,
        en: 'good afternoon',
        tr: 'iyi öğlenler',
        image: require('../../../assets/images/good_afternoon.png'),
      },
      {
        key: 5,
        en: 'good evening',
        tr: 'iyi akşamlar',
        image: require('../../../assets/images/good_evening.png'),
      },
      {
        key: 6,
        en: 'good night',
        tr: 'iyi geceler',
        image: require('../../../assets/images/good_night.png'),
      },
    ],
    example_sentences: ['Hello, how are you?', 'Good morning!'],
    questions: [
      {
        id: 1,
        question: 'What does "hello" mean?',
        options: ['merhaba', 'teşekkür ederim', 'lütfen', 'evet'],
        answer: 'merhaba',
      },
      {
        id: 2,
        question: 'Which phrase is used in the morning?',
        options: [
          'good night',
          'good evening',
          'good morning',
          'good afternoon',
        ],
        answer: 'good morning',
      },
    ],
  },
  colors_and_numbers: {
    en: 'Colors and Numbers',
    tr: 'Renkler ve Sayılar',
    words: [
      {
        key: 1,
        en: 'red',
        tr: 'kırmızı',
        image: require('../../../assets/images/red.png'),
      },
      {
        key: 2,
        en: 'blue',
        tr: 'mavi',
        image: require('../../../assets/images/blue.png'),
      },
      {
        key: 3,
        en: 'green',
        tr: 'yeşil',
        image: require('../../../assets/images/green.png'),
      },
      {
        key: 4,
        en: 'one',
        tr: 'bir',
        image: require('../../../assets/images/one.png'),
      },
      {
        key: 5,
        en: 'two',
        tr: 'iki',
        image: require('../../../assets/images/two.png'),
      },
      {
        key: 6,
        en: 'three',
        tr: 'üç',
        image: require('../../../assets/images/three.png'),
      },
    ],
    example_sentences: [
      'The apple is red.',
      'She has two cats.',
      'The sky is blue today.',
      'We need three chairs.',
    ],
    questions: [
      {
        id: 1,
        question: 'What color is the apple?',
        options: ['red', 'blue', 'green', 'yellow'],
        answer: 'red',
      },
      {
        id: 2,
        question: 'How many apples do you have if you have one and two more?',
        options: ['one', 'two', 'three', 'four'],
        answer: 'three',
      },
    ],
  },
};

export default vocabulary;
