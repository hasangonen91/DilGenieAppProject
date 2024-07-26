import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { fetchA1LevelQuestions } from '../../../services/api/base';
import { A1LevelQuestion, QuestionData } from './A1levelQuestions';
import BackHeader from '../../../components/header/BackHeader';
import DragDropQuizComponent from '../../../components/dragDrop/DragDropQuizComponent';
import styles from './styles';

const C1level: React.FC = () => {
  const [data, setData] = useState<A1LevelQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchA1LevelQuestions();
      setData(fetchedData[0]);
    } catch (err) {
      console.error('Error fetching A1 level data:', err);
      setError('Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleFinish = () => {
    console.log("Quiz finished!");
  };

  const formatQuestions = (data: A1LevelQuestion | null) => {
    if (!data) return [];
    const categories = Object.keys(data.questions) as Array<keyof typeof data.questions>;
    return categories.reduce((acc: any[], category) => {
      const questionData: QuestionData = data.questions[category];
      if (questionData && questionData.category && questionData.category.questions) {
        const formattedQuestions = questionData.category.questions.map(q => ({
          sentence: q.sentence,
          options: q.options,
          answer: q.answer
        }));
        return [...acc, ...formattedQuestions];
      }
      return acc;
    }, []);
  };


  const questions = formatQuestions(data);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="C1 Level" />
      <DragDropQuizComponent
        questions={questions}
        onFinish={handleFinish}
      />
    </SafeAreaView>
  );
};

export default C1level;
