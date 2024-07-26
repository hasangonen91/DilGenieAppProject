import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import TopContainer from '../../components/topContainer/topContainer';
import styles from './styles';
import GameOverModal from '../modal/GameModal/GameOverModal';
import CongratulationsModal from '../modal/Congratulations/CongratulationsModal';

interface CategoryData {
    en: string;
    tr: string;
    category: {
        words: { en: string; tr: string; image: string }[];
        example_sentences: { en: string; tr: string; image: string }[];
    };
}

interface GreetingsQuizProps {
    categories: CategoryData[];
    onComplete: (moveToNext: boolean) => void;
}

const GreetingsQuiz: React.FC<GreetingsQuizProps> = ({ categories, onComplete }) => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<'true' | 'false' | null>(null);

    const currentCategory = categories[currentCategoryIndex];
    const totalCategories = categories.length;

    const { words, example_sentences } = currentCategory.category;
    const allItems = [...words, ...example_sentences];
    const totalQuestions = allItems.length;

    const currentItem = allItems[currentItemIndex];
    const isWordsPhase = currentItemIndex < words.length;
    const hearts = 5 - incorrectCount;

    useEffect(() => {
        if (hearts === 0) {
            setShowGameOverModal(true);
        }
    }, [hearts]);

    useEffect(() => {
        if (currentItemIndex === totalQuestions - 1 && incorrectCount >= 2) {
            setShowGameOverModal(true);
        }
    }, [currentItemIndex, incorrectCount, totalQuestions]);

    useEffect(() => {
        if (currentItemIndex === totalQuestions && currentCategoryIndex === totalCategories - 1) {
            onComplete(false);
        }
    }, [currentItemIndex, currentCategoryIndex, totalQuestions, totalCategories, onComplete]);

    const handleAnswer = (answer: 'true' | 'false') => {
        const correctAnswer = isWordsPhase ? 'true' : 'false';
        const isAnswerCorrect = answer === correctAnswer;
        setIsCorrect(isAnswerCorrect);
        setSelectedAnswer(answer);

        if (isAnswerCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
        } else {
            setIncorrectCount(prevCount => prevCount + 1);
        }
    };

    const handleNextItem = () => {
        if (selectedAnswer === null) return;

        if (currentItemIndex < totalQuestions - 1) {
            setCurrentItemIndex(prevIndex => prevIndex + 1);
        } else {
            if (correctCount === totalQuestions) {
                setShowCongratulations(true);
            } else {
                onComplete(true);
            }
        }

        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const resetQuiz = () => {
        setCurrentItemIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowGameOverModal(false);
        setShowCongratulations(false);
    };

    const handleCongratulationsClose = () => {
        setShowCongratulations(false);
        onComplete(true);
    };

    const renderSwipeContainer = () => {
        return (
            <View style={styles.swipeContainer}>
                <Text style={styles.header}>True or False?</Text>
                <Text style={styles.headerTr}>Doğru mu yanlış mı?</Text>
                {currentItem.image && (
                    <Image style={styles.image} source={{ uri: currentItem.image }} />
                )}
                <Text style={styles.text}>{currentItem.en}</Text>
                <Text style={styles.translation}>{currentItem.tr}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.answerButton,
                            selectedAnswer === 'true' && (isCorrect ? styles.answerTrueButton : styles.answerFalseButton),
                        ]}
                        onPress={() => handleAnswer('true')}
                        disabled={selectedAnswer !== null}
                    >
                        <Text style={styles.answerText}>True</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.answerButton,
                            selectedAnswer === 'false' && (isCorrect ? styles.answerTrueButton : styles.answerFalseButton),
                        ]}
                        onPress={() => handleAnswer('false')}
                        disabled={selectedAnswer !== null}
                    >
                        <Text style={styles.answerText}>False</Text>
                    </TouchableOpacity>
                </View>
                {isCorrect !== null && (
                    <Text style={isCorrect ? styles.correct : styles.incorrect}>
                        {isCorrect ? 'Doğru!' : 'Yanlış!'}
                        {!isCorrect && (
                            <Text style={styles.incorrect}>
                                {' '}Doğru cevap: {isWordsPhase ? `${currentItem.en}` : 'True'}
                            </Text>
                        )}
                    </Text>
                )}
                <View style={styles.okButtonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.okButton,
                            selectedAnswer === null && styles.okButtonDisabled
                        ]}
                        onPress={handleNextItem}
                        disabled={selectedAnswer === null}
                    >
                        <Text style={[
                            styles.okButtonText,
                            selectedAnswer === null && styles.okButtonTextDisabled
                        ]}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TopContainer
                hearts={hearts}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
            />
            <Progress.Bar
                progress={(currentItemIndex + 1) / totalQuestions}
                color={'#4CAF50'}
                width={315}
                style={{
                    marginVertical: 15,
                    marginBottom: 20,
                }}
                height={8}
            />
            {renderSwipeContainer()}
            <CongratulationsModal visible={showCongratulations} onClose={handleCongratulationsClose} />
            <GameOverModal
                visible={showGameOverModal}
                onRestart={resetQuiz}
                answer={currentItem.tr}
                hint="Bu soruyu doğru cevaplamalısın."
            />
        </View>
    );
};

export default GreetingsQuiz;