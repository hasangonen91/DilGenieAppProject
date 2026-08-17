interface A1LevelData {
  vocabulary: {
    en: string;
    tr: string;
    greetings: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    family: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    time_dates: {
      en: string;
      tr: string;
      days: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      months: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      example_sentences: {en: string; tr: string}[];
    };
    places_directions: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    food_drinks: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    colors_numbers_shapes: {
      en: string;
      tr: string;
      colors: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      numbers: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      shapes: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      example_sentences: {en: string; tr: string}[];
    };
  };
  grammar: {
    en: string;
    tr: string;
    pronouns: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    basic_verbs: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
    adjectives_adverbs: {
      en: string;
      tr: string;
      adjectives: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      adverbs: {
        en: string;
        tr: string;
        words: {en: string; tr: string}[];
      };
      example_sentences: {en: string; tr: string}[];
    };
    sentence_structures: {
      en: string;
      tr: string;
      positive: {
        en: string;
        tr: string;
        structure: {en: string; tr: string};
        example: {en: string; tr: string};
      };
      negative: {
        en: string;
        tr: string;
        structure: {en: string; tr: string};
        example: {en: string; tr: string};
      };
      question: {
        en: string;
        tr: string;
        structure: {en: string; tr: string};
        example: {en: string; tr: string};
      };
    };
    present_tense: {
      en: string;
      tr: string;
      simple_present: {
        en: string;
        tr: string;
        structure: {en: string; tr: string};
        example: {en: string; tr: string};
      };
      present_continuous: {
        en: string;
        tr: string;
        structure: {en: string; tr: string};
        example: {en: string; tr: string};
      };
    };
    prepositions: {
      en: string;
      tr: string;
      words: {en: string; tr: string}[];
      example_sentences: {en: string; tr: string}[];
    };
  };
  speaking_listening: {
    en: string;
    tr: string;
    listening_exercises: {
      en: string;
      tr: string;
      exercises: {
        title: {en: string; tr: string};
        script: {en: string; tr: string};
      }[];
    };
    speaking_practices: {
      en: string;
      tr: string;
      practices: {
        title: {en: string; tr: string};
        prompt: {en: string; tr: string};
        example_dialogue: {en: string; tr: string};
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
        title: {en: string; tr: string};
        content: {en: string; tr: string};
      }[];
    };
    writing_exercises: {
      en: string;
      tr: string;
      exercises: {
        title: {en: string; tr: string};
        prompt: {en: string; tr: string};
        example_answer: {en: string; tr: string};
      }[];
    };
  };
  interactive_activities_games: {
    en: string;
    tr: string;
    activities: {
      title: {en: string; tr: string};
      type: {en: string; tr: string};
      description: {en: string; tr: string};
      example_words?: {en: string; tr: string}[];
      example_sentence?: {en: string; tr: string};
      correct_answer?: {en: string; tr: string};
    }[];
  };
  cultural_content: {
    en: string;
    tr: string;
    topics: {
      topic: {en: string; tr: string};
      description: {en: string; tr: string};
    }[];
  };
  progress_tracking: {
    en: string;
    tr: string;
    achievements: {
      en: string;
      tr: string;
      list: {en: string; tr: string}[];
    };
  };
}
export const C1Data: A1LevelData = {
  vocabulary: {
    en: 'Vocabulary',
    tr: 'Kelime',
    greetings: {
      en: 'Greetings',
      tr: 'Selamlar',
      words: [
        {en: 'Hello', tr: 'Merhaba'},
        {en: 'Goodbye', tr: 'Güle güle'},
        {en: 'Please', tr: 'Lütfen'},
        {en: 'Thank you', tr: 'Teşekkür ederim'},
        {en: 'Sorry', tr: 'Üzgünüm'},
        {en: 'Exterior', tr: 'Dış cephe'},
        {en: 'Cloak', tr: 'Paletö'},
        {en: 'Timid', tr: 'Korkak'},
        {en: 'Reluctantly', tr: 'İsteiksizce'},
        {en: 'Concur', tr: 'Katılırmak'},
      ],
      example_sentences: [
        {
          en: 'The exterior of the building was recently renovated.',
          tr: 'Bina dış cepheleri récemment yenilendi.',
        },
        {
          en: 'She wore a warm cloak during the winter hike.',
          tr: 'Kış yürüyüşünde sıcak bir paletö giydi.',
        },
        {
          en: 'He felt timid speaking in front of the large audience.',
          tr: 'Büyük bir önönün önünde konuşurken korkak hissetti.',
        },
        {
          en: 'She reluctantly agreed to help with the project.',
          tr: 'Projeyle yardım etmeyi isteksizce kabul etti.',
        },
        {
          en: 'The committee members concur with the proposed changes.',
          tr: 'Komite üyeleri önerilen değişikliklerle katılırmakta.',
        },
      ],
    },
    family: {en: 'Family', tr: 'Aile', words: [], example_sentences: []},
    time_dates: {
      en: 'Time & Dates',
      tr: 'Zaman ve Tarihler',
      days: {en: 'Days', tr: 'Günler', words: []},
      months: {en: 'Months', tr: 'Aylar', words: []},
      example_sentences: [],
    },
    places_directions: {
      en: 'Places & Directions',
      tr: 'Yerler ve Yönler',
      words: [],
      example_sentences: [],
    },
    food_drinks: {
      en: 'Food & Drinks',
      tr: 'Yiyecek ve İçecek',
      words: [],
      example_sentences: [],
    },
    colors_numbers_shapes: {
      en: 'Colors, Numbers & Shapes',
      tr: 'Renkler, Sayılar ve Şekiller',
      colors: {en: 'Colors', tr: 'Renkler', words: []},
      numbers: {en: 'Numbers', tr: 'Sayılar', words: []},
      shapes: {en: 'Shapes', tr: 'Şekiller', words: []},
      example_sentences: [],
    },
  },
  grammar: {
    en: 'Grammar',
    tr: 'Gramer',
    pronouns: {
      en: 'Pronouns',
      tr: 'Zamirler',
      words: [],
      example_sentences: [],
    },
    basic_verbs: {
      en: 'Basic Verbs',
      tr: 'Temel Fiiller',
      words: [],
      example_sentences: [],
    },
    adjectives_adverbs: {
      en: 'Adjectives & Adverbs',
      tr: 'Sıfatlar ve Zarflar',
      adjectives: {en: 'Adjectives', tr: 'Sıfatlar', words: []},
      adverbs: {en: 'Adverbs', tr: 'Zarflar', words: []},
      example_sentences: [],
    },
    sentence_structures: {
      en: 'Sentence Structures',
      tr: 'Cümle Yapıları',
      positive: {
        en: 'Positive',
        tr: 'Olumlu',
        structure: {en: 'Subject + Verb + Object', tr: 'Özne + Fiil + Nesne'},
        example: {en: 'She reads books.', tr: 'O kitaplar okur.'},
      },
      negative: {
        en: 'Negative',
        tr: 'Olumsuz',
        structure: {
          en: 'Subject + do/does not + Verb + Object',
          tr: 'Özne + does/do not + Fiil + Nesne',
        },
        example: {en: 'She does not read books.', tr: 'O kitaplar okumaz.'},
      },
      question: {
        en: 'Question',
        tr: 'Soru',
        structure: {
          en: 'Do/Does + Subject + Verb + Object + ?',
          tr: 'Does/Do + Özne + Fiil + Nesne + ?',
        },
        example: {en: 'Does she read books?', tr: 'O kitaplar okur mu?'},
      },
    },
    present_tense: {
      en: 'Present Tense',
      tr: 'Şimdiki Zaman',
      simple_present: {
        en: 'Simple Present',
        tr: 'Basit Şimdiki',
        structure: {
          en: 'Subject + Verb (base form) + Object',
          tr: 'Özne + Fiil (kök) + Nesne',
        },
        example: {en: 'He works at a bank.', tr: 'O bir bankada çalışır.'},
      },
      present_continuous: {
        en: 'Present Continuous',
        tr: 'Şimdiki Süreklı',
        structure: {
          en: 'Subject + am/is/are + Verb-ing + Object',
          tr: 'Özne + am/is/are + Fiil-ing + Nesne',
        },
        example: {en: 'They are playing football.', tr: 'Olar futbol oynuyor.'},
      },
    },
    prepositions: {
      en: 'Prepositions',
      tr: 'Edatlar',
      words: [],
      example_sentences: [],
    },
  },
  speaking_listening: {
    en: 'Speaking & Listening',
    tr: 'Konuşma & Dinleme',
    listening_exercises: {
      en: 'Listening Exercises',
      tr: 'Dinleme Alıştırmaları',
      exercises: [],
    },
    speaking_practices: {
      en: 'Speaking Practices',
      tr: 'Konuşma Pratikleri',
      practices: [],
    },
  },
  reading_writing: {
    en: 'Reading & Writing',
    tr: 'Okuma & Yazma',
    reading_texts: {en: 'Reading Texts', tr: 'Okuma Metinleri', texts: []},
    writing_exercises: {
      en: 'Writing Exercises',
      tr: 'Yazma Alıştırmaları',
      exercises: [],
    },
  },
  interactive_activities_games: {
    en: 'Interactive Activities & Games',
    tr: 'Etkileşimli Etkinlikler & Oyunlar',
    activities: [],
  },
  cultural_content: {
    en: 'Cultural Content',
    tr: 'Kültürel İçerik',
    topics: [],
  },
  progress_tracking: {
    en: 'Progress Tracking',
    tr: 'İlerleme Takibi',
    achievements: {en: 'Achievements', tr: 'Başarılar', list: []},
  },
};
export default C1Data;
