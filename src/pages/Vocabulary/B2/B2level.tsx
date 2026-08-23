import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, ActivityIndicator} from 'react-native';
import {fetchB2LevelData} from '../../../services/api/base';
import BackHeader from '../../../components/header/BackHeader';
import TeachingPhase from '../../../components/Teaching/TeachingPhase';
import GreetingsQuiz from '../../../components/quizComponent/GreetingsQuiz';
import styles from './styles';

interface CategoryData {
  en: string;
  tr: string;
  category: {
    words: {en: string; tr: string; image: string}[];
    example_sentences: {en: string; tr: string; image: string}[];
  };
}

const B2level: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTeachingPhase, setIsTeachingPhase] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchB2LevelData();
      if (!fetchedData?.length) {
        throw new Error('empty');
      }
      // vocabulary objesini CategoryData listesine çevir (data-driven)
      const vocab = fetchedData[0].vocabulary;
      const cats: CategoryData[] = Object.entries(vocab)
        .filter(([key]) => !['en', 'tr'].includes(key))
        .map(([, value]) => value as CategoryData);
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching B2 level data:', err);
      setError(
        'Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      );
    }
  };

  const handleNext = () => {
    if (!categories.length) {
      return;
    }
    const currentCategoryItems =
      categories[currentCategoryIndex]?.category.words ?? [];
    if (currentItemIndex < currentCategoryItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (isTeachingPhase) {
      setIsTeachingPhase(false);
      setCurrentItemIndex(0);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentItemIndex(0);
      setIsTeachingPhase(true);
    } else {
      setIsCompleted(true);
    }
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="B2 Level" />
        <Text style={styles.congratulationsText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!categories.length) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="B2 Level" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00e0ff" />
        </View>
      </SafeAreaView>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const currentItems = currentCategory.category.words;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="B2 Level" />
      {isCompleted ? (
        <Text style={styles.congratulationsText}>
          Tebrikler, B2 seviyesini tamamladınız! 🎉
        </Text>
      ) : isTeachingPhase ? (
        <TeachingPhase
          currentItem={currentItems[currentItemIndex]}
          categoryName={currentCategory}
          currentItemIndex={currentItemIndex}
          totalItems={currentItems.length}
          onNext={handleNext}
        />
      ) : (
        <GreetingsQuiz categories={[currentCategory]} onComplete={handleNext} />
      )}
    </SafeAreaView>
  );
};

export default B2level;
