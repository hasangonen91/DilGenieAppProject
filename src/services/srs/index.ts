export interface SRSCard {
  id: string;
  word: string;
  easeFactor: number;
  interval: number; // days
  repetitions: number;
  lastReview: number; // timestamp ms
  nextReview: number; // timestamp ms
}

export const createSRSCard = (id: string, word: string): SRSCard => {
  const now = Date.now();
  return {
    id,
    word,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    lastReview: now,
    nextReview: now, // due immediately
  };
};

export const reviewCard = (card: SRSCard, quality: number): SRSCard => {
  // quality: 0 (again), 1 (hard), 2 (good), 3 (easy)
  const now = Date.now();
  let {easeFactor, interval, repetitions} = card;

  if (quality < 3) {
    // failed
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    // ease factor adjustment
    easeFactor =
      easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }
    repetitions += 1;
  }

  const nextReview = now + interval * 24 * 60 * 60 * 1000;

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    lastReview: now,
    nextReview,
  };
};
