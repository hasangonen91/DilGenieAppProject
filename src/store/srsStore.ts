import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SRSCard, createSRSCard, reviewCard} from '../services/srs';

interface SRSState {
  cards: SRSCard[];
  addCard: (word: string) => void;
  removeCard: (id: string) => void;
  reviewCard: (id: string, quality: number) => void;
  getDueCards: () => SRSCard[];
}

export const useSRSStore = create<SRSState>()(
  persist(
    (set, get) => ({
      cards: [],
      addCard: word => {
        const id = Math.random().toString(36).substring(2, 9);
        const card = createSRSCard(id, word);
        set(state => ({cards: [...state.cards, card]}));
      },
      removeCard: id => {
        set(state => ({
          cards: state.cards.filter(c => c.id !== id),
        }));
      },
      reviewCard: (id, quality) => {
        set(state => ({
          cards: state.cards.map(c =>
            c.id === id ? reviewCard(c, quality) : c,
          ),
        }));
      },
      getDueCards: () => {
        const now = Date.now();
        return get().cards.filter(c => c.nextReview <= now);
      },
    }),
    {
      name: 'srs-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
