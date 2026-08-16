import React from 'react';

const data = {
  vocabulary: {
    family: {
      en: 'Family',
      tr: 'Aile',
      words: [
        {
          key: 1,
          en: 'married',
          tr: 'evli',
          image: require('../assets/images/family/married.png'),
        },
        {
          key: 2,
          en: 'single',
          tr: 'bekar',
          image: require('../assets/images/family/single.png'),
        },
        {
          key: 3,
          en: 'engaged',
          tr: 'nişanlı',
          image: require('../assets/images/family/engaged.png'),
        },
        {
          key: 4,
          en: 'divorced',
          tr: 'boşanmış',
          image: require('../assets/images/family/divorced.png'),
        },
        {
          key: 5,
          en: 'widowed',
          tr: 'dul',
          image: require('../assets/images/family/widowed.png'),
        },
        {
          key: 6,
          en: 'parent',
          tr: 'ebeveyn',
          image: require('../assets/images/family/parent.png'),
        },
      ],
      example_sentences: [
        'She got married last year.',
        'He is single and lives alone.',
        'They are engaged and planning a wedding.',
        'After many years, they decided to get divorced.',
        'She became widowed after her husband passed away.',
        'Being a parent is both challenging and rewarding.',
      ],
      questions: [
        {
          question: 'Which word means "evli" in Turkish?',
          options: ['single', 'married', 'engaged', 'divorced'],
          answer: 'married',
        },
        {
          question: 'Which word means "bekar"?',
          options: ['widowed', 'parent', 'single', 'engaged'],
          answer: 'single',
        },
      ],
    },
  },
};

export default data;
