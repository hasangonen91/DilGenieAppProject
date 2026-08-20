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
    food_and_drink: {
      en: 'Food and Drink',
      tr: 'Yiyecek ve İçecek',
      words: [
        {
          key: 1,
          en: 'bread',
          tr: 'ekmek',
          image: require('../assets/images/food_and_drink/bread.png'),
        },
        {
          key: 2,
          en: 'water',
          tr: 'su',
          image: require('../assets/images/food_and_drink/water.png'),
        },
        {
          key: 3,
          en: 'milk',
          tr: 'süt',
          image: require('../assets/images/food_and_drink/milk.png'),
        },
        {
          key: 4,
          en: 'apple',
          tr: 'elma',
          image: require('../assets/images/food_and_drink/apple.png'),
        },
        {
          key: 5,
          en: 'rice',
          tr: 'pirinç',
          image: require('../assets/images/food_and_drink/rice.png'),
        },
        {
          key: 6,
          en: 'chicken',
          tr: 'tavuk',
          image: require('../assets/images/food_and_drink/chicken.png'),
        },
      ],
      example_sentences: [
        'I eat bread with cheese every morning.',
        'She drinks water after running.',
      ],
      questions: [
        {
          question: 'Which word means "ekmek" in Turkish?',
          options: ['water', 'milk', 'bread', 'rice'],
          answer: 'bread',
        },
        {
          question: 'Which word means "süt"?',
          options: ['apple', 'chicken', 'milk', 'bread'],
          answer: 'milk',
        },
      ],
    },
  },
};

export default data;
