import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { fetchA1LevelData } from '../../../services/api/base';
import { A1LevelData, CategoryData } from '../A1/A1LevelData';
import BackHeader from '../../../components/header/BackHeader';
import TeachingPhase from '../../../components/Teaching/TeachingPhase';
import GreetingsQuiz from '../../../components/quizComponent/GreetingsQuiz';
import styles from './styles';

const B2level: React.FC = () => {
  const [data, setData] = useState<A1LevelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTeachingPhase, setIsTeachingPhase] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setCurrentCategoryIndex(0);
      setCurrentItemIndex(0);
      setIsTeachingPhase(true);
      setIsCompleted(false);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchA1LevelData();
      setData(fetchedData[0]);
    } catch (err) {
      console.error('Error fetching A1 level data:', err);
      setError('Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleNext = () => {
    if (!data) return;

    const currentCategoryItems = getCategoryItems(currentCategoryIndex);
    if (currentItemIndex < currentCategoryItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (isTeachingPhase) {
      setIsTeachingPhase(false); // Switch to GreetingsQuiz after TeachingPhase is complete
      setCurrentItemIndex(0); // Reset item index for GreetingsQuiz
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentItemIndex(0);
      setIsTeachingPhase(true); // Switch back to TeachingPhase for the next category
    } else {
      setIsCompleted(true); // Mark completion when all categories are done
    }
  };

  const getCategoryItems = (index: number): { en: string; tr: string; image: string }[] => {
    if (!data) return [];
    switch (index) {
      case 0:
        return data.vocabulary.greetings.category.words;
      case 1:
        return data.vocabulary.family.category.words;
      case 2:
        return data.vocabulary.months.category.words;
      case 3:
        return data.vocabulary.years.category.words;
      case 4:
        return data.vocabulary.colors_numbers_shapes.category.words;
      case 5:
        return data.vocabulary.days.category.words;
      case 6:
        return data.vocabulary.places.category.words;
      case 7:
        return data.vocabulary.directions.category.words;
      default:
        return [];
    }
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const categories: CategoryData[] = [
    data.vocabulary.greetings,
    data.vocabulary.family,
    data.vocabulary.months,
    data.vocabulary.years,
    data.vocabulary.colors_numbers_shapes,
    data.vocabulary.days,
    data.vocabulary.places,
    data.vocabulary.directions,
  ];

  const currentCategory = categories[currentCategoryIndex];

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="B2 Level" />
      {isCompleted ? (
        <Text style={styles.congratulationsText}>Tebrikler, C1 seviyesine geçtiniz!</Text>
      ) : isTeachingPhase ? (
        <TeachingPhase
          currentItem={getCategoryItems(currentCategoryIndex)[currentItemIndex]}
          categoryName={currentCategory}
          currentItemIndex={currentItemIndex}
          totalItems={getCategoryItems(currentCategoryIndex).length}
          onNext={handleNext}
        />
      ) : (
        <GreetingsQuiz
          categories={[currentCategory]}
          onComplete={handleNext}
        />
      )}
    </SafeAreaView>
  );
};

export default B2level;
