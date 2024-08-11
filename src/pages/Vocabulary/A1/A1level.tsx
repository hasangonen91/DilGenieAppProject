import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { fetchA1LevelData } from '../../../services/api/base';
import { A1LevelData, CategoryData } from '../A1/A1LevelData';
import TeachingPhase from '../../../components/Teaching/TeachingPhase';
import GreetingsQuiz from '../../../components/quizComponent/GreetingsQuiz';
import ContinueModal from '../../../components/modal/ContinueModal/ContinueModal';
import FinalModal from '../../../components/modal/FinalModal/FinalModal';
import styles from './styles';
import MainComponent from '../../../components/MainComponent/MainComponent';
import { ScreenNames } from '../../../routes/routes.common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../types/navigation';

const A1level: React.FC = () => {
  const [data, setData] = useState<A1LevelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTeachingPhase, setIsTeachingPhase] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDevamModal, setShowDevamModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string>("");
  const [showFinalModal, setShowFinalModal] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [indicatorColor, setIndicatorColor] = useState('#00ff00');
  const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();
  const colors = ['#00ff00', '#ff0000', '#00e0ff', '#ffff00', '#ff00ff'];

  useEffect(() => {
    // Yükleme göstergesini 3 saniye göster
    const timer = setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 3000); // 3 saniye

    // Renk değiştirme intervali
    const colorChangeInterval = setInterval(() => {
      setIndicatorColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 500); // Renk değişim süresi (500ms)

    return () => {
      clearTimeout(timer);
      clearInterval(colorChangeInterval);
    };
  }, []);


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

  const handleNext = (moveToNext: boolean = false) => {
    if (!data) return;

    const currentCategoryItems = getCategoryItems(currentCategoryIndex);

    if (isTeachingPhase) {
      if (currentItemIndex < currentCategoryItems.length - 1) {
        // Henüz kategorinin tüm öğeleri bitmediyse sıradaki öğeye geç
        setCurrentItemIndex(prevIndex => prevIndex + 1);
      } else {
        // Öğretim aşaması tamamlandığında quiz aşamasına geç
        setIsTeachingPhase(false);
        setCurrentItemIndex(0);
      }
    } else if (currentCategoryIndex < categories.length - 1) {
      if (moveToNext) {
        // Sıradaki kategoriye geç
        setCurrentCategoryIndex(prevIndex => prevIndex + 7);
        setCurrentItemIndex(0);
        setIsTeachingPhase(true);

        // Bir sonraki kategoriye geçerken devam modali aç
        const nextCategory = categories[currentCategoryIndex + 1];
        setModalTitle(nextCategory.en);
        setModalContent(nextCategory.tr);
        setShowDevamModal(true);
      }
    } else {
      // Tüm kategoriler tamamlandığında final modalını aç
      setIsCompleted(true);
      setShowFinalModal(true);
    }
  };


  const getCategoryItems = (index: number): { en: string; tr: string; image: string }[] => {
    if (!data) return [];
    switch (index) {
      case 0: return data.vocabulary.greetings.category.words;
      case 1: return data.vocabulary.family.category.words;
      case 2: return data.vocabulary.months.category.words;
      case 3: return data.vocabulary.years.category.words;
      case 4: return data.vocabulary.colors_numbers_shapes.category.words;
      case 5: return data.vocabulary.days.category.words;
      case 6: return data.vocabulary.places.category.words;
      case 7: return data.vocabulary.directions.category.words;
      default: return [];
    }
  };

  if (!data) {
    return <ActivityIndicator size="large" color="#00ff00" />;
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

  if (loading) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={indicatorColor} />
        <Text style={styles.loadingText}>Just do it...</Text>
      </View>
    );
  }

  return (
    <MainComponent headerTitle="A1 Level">
      {isCompleted ? (
        <>
          <FinalModal
            visible={showFinalModal}
            onClose={() => {
              setShowFinalModal(false);
              navigation.navigate(ScreenNames.DragDropQuiz); 
            }}
            title="Tebrikler"
            content="Tebrikler 1.Yarı finale geçtiniz!"
          />
        </>
      ) : isTeachingPhase ? (
        <>
          <TeachingPhase
            currentItem={getCategoryItems(currentCategoryIndex)[currentItemIndex]}
            categoryName={currentCategory}
            currentItemIndex={currentItemIndex}
            totalItems={getCategoryItems(currentCategoryIndex).length}
            onNext={() => handleNext()}
          />
          <ContinueModal
            visible={showDevamModal}
            onClose={() => setShowDevamModal(false)}
            title={modalTitle}
            content={modalContent}
          />
        </>
      ) : (
        <>
          <GreetingsQuiz
            categories={[currentCategory]}
            onComplete={handleNext}
          />
          <ContinueModal
            visible={showDevamModal}
            onClose={() => setShowDevamModal(false)}
            title={modalTitle}
            content={modalContent}
          />
        </>
      )}
    </MainComponent>
  );
};

export default A1level;