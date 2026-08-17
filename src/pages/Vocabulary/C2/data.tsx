import React from 'react';
import {Image} from 'react-native';

export const vocabulary = {
  cefr_advanced: {
    en: 'Academically Advanced',
    tr: 'Akademik Gelişmiş',
    words: [
      {
        key: 1,
        en: 'ubiquitous',
        tr: 'her yerde bulunan',
        image: require('../assets/images/cefr_advanced/ubiquitous.png'),
      },
      {
        key: 2,
        en: 'meticulous',
        tr: 'detaycı',
        image: require('../assets/images/cefr_advanced/meticulous.png'),
      },
      {
        key: 3,
        en: 'ostentatious',
        tr: 'gösterişli',
        image: require('../assets/images/cefr_advanced/ostentatious.png'),
      },
      {
        key: 4,
        en: 'pernicious',
        tr: 'zararlı',
        image: require('../assets/images/cefr_advanced/pernicious.png'),
      },
      {
        key: 5,
        en: 'acerbic',
        tr: 'asit gibi',
        image: require('../assets/images/cefr_advanced/acerbic.png'),
      },
      {
        key: 6,
        en: 'equivocal',
        tr: 'çift anlamlı',
        image: require('../assets/images/cefr_advanced/equivocal.png'),
      },
    ],
    example_sentences: [
      {
        en: 'Smartphones have become ubiquitous in modern society.',
        tr: 'Akıllı telefonlar modern toplumda her yerde bulunan hale gelmiştir.',
      },
      {
        en: 'The researcher was meticulous in recording every detail of the experiment.',
        tr: 'Araştırmacı, deneyin her bir detayını kaydederken çok detaycıydı.',
      },
    ],
    questions: [
      {
        en: 'Which word means "present everywhere"?',
        tr: 'Hangisi "her yerde bulunan" anlamına gelir?',
        answer: 'ubiquitous',
      },
      {
        en: 'What is the opposite of "meticulous"?',
        tr: '"detaycı" kelimesinin zıttı nedir?',
        answer: 'careless',
      },
    ],
  },
};
