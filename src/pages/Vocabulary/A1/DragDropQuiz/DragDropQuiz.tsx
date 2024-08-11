import React, { useState, useEffect } from 'react';
import { SafeAreaView, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchA1LevelQuestions } from '../../../../services/api/base';
import { A1LevelQuestion, QuestionData } from './A1levelQuestions';
import Header from '../../../../components/header/Header';
import DragDropQuizComponent from '../../../../components/dragDrop/DragDropQuizComponent';
import styles from './styles';
import { ApplicationStackParamList } from '../../../../types/navigation';
import { ScreenNames } from '../../../../routes/routes.common';
import ExitConfirmationModal from '../../../../components/modal/ExitConfirmationModal/ExitConfirmationModal'; 

const DragDropQuiz: React.FC = () => {
    const [data, setData] = useState<A1LevelQuestion | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const handleBackPress = () => {
                setModalVisible(true); // Show modal on back press
                return true; // Prevent default back action
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => backHandler.remove();
        }, [])
    );

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
        setModalVisible(true); // Show modal on quiz finish
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

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalConfirm = () => {
        setModalVisible(false);
        navigation.navigate(ScreenNames.BottomTab); // Navigate to Bottom Tab on modal confirm
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="A1 Level" />
            <DragDropQuizComponent
                questions={questions}
                onFinish={handleFinish}
            />
            <ExitConfirmationModal
                visible={isModalVisible}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />
        </SafeAreaView>
    );
};

export default DragDropQuiz;
