
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, Text } from 'react-native';
// import { fetchA1LevelData } from '../../../services/api/base';
// import { A1LevelData, CategoryData } from '../A1/A1LevelData';
// import BackHeader from '../../../components/header/BackHeader';
// import GreetingsQuiz from '../../../components/quizComponent/GreetingsQuiz';
// import styles from './styles';

// const B2level: React.FC = () => {
//   const [data, setData] = useState<A1LevelData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const [currentItemIndex, setCurrentItemIndex] = useState(0);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data) {
//       setCurrentCategoryIndex(0);
//       setCurrentItemIndex(0);
//     }
//   }, [data]);

//   const fetchData = async () => {
//     try {
//       const fetchedData = await fetchA1LevelData();
//       setData(fetchedData[0]); // Assuming fetchA1LevelData returns an array and we take the first item
//     } catch (err) {
//       console.error('Error fetching A1 level data:', err);
//       setError('Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
//     }
//   };

//   const handleNext = () => {
//     if (!data) return;

//     const currentCategoryItems = getCategoryItems(currentCategoryIndex);
//     if (currentItemIndex < currentCategoryItems.length - 1) {
//       setCurrentItemIndex(currentItemIndex + 1);
//     } else if (currentCategoryIndex < data.vocabulary.length - 1) {
//       setCurrentCategoryIndex(currentCategoryIndex + 1);
//       setCurrentItemIndex(0);
//     } else {
//       console.log("All categories completed!");
//     }
//   };

//   const getCategoryItems = (index: number): { en: string; tr: string; image: string }[] => {
//     if (!data) return []; // Check if data is null before accessing properties

//     switch (index) {
//       case 0:
//         return data.vocabulary.greetings.category.words;
//       case 1:
//         return data.vocabulary.family.category.words;
//       case 2:
//         return data.vocabulary.months.category.words;
//       case 3:
//         return data.vocabulary.years.category.words;
//       case 4:
//         return data.vocabulary.colors_numbers_shapes.category.words;
//       case 5:
//         return data.vocabulary.days.category.words;
//       case 6:
//         return data.vocabulary.places.category.words;
//       case 7:
//         return data.vocabulary.directions.category.words;
//       default:
//         return [];
//     }
//   };

//   if (!data) {
//     return <Text>Loading...</Text>;
//   }

//   const categories: CategoryData[] = [
//     data.vocabulary.greetings,
//     data.vocabulary.family,
//     data.vocabulary.months,
//     data.vocabulary.years,
//     data.vocabulary.colors_numbers_shapes,
//     data.vocabulary.days,
//     data.vocabulary.places,
//     data.vocabulary.directions,
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <BackHeader title="B2 Level" />
//       <GreetingsQuiz categories={categories} onComplete={handleNext} />
//     </SafeAreaView>
//   );
// };

// export default B2level;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WordSorting = () => {
  return (
    <View>
      <Text>WordSorting</Text>
    </View>
  )
}

export default WordSorting

const styles = StyleSheet.create({})