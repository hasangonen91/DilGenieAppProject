import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import GameOverModal from '../modal/GameModal/GameOverModal';
import CongratulationsModal from '../modal/Congratulations/CongratulationsModal';
import TopContainer from '../../components/topContainer/topContainer';

interface WordOption {
    id: string;
    text: string;
}

interface Question {
    sentence: string[];
    options: WordOption[];
    answer: string;
}

interface Props {
    questions: Question[];
    onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

const DragDropQuizComponent: React.FC<Props> = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [hearts, setHearts] = useState(5);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [pan] = useState(new Animated.ValueXY());
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

    useEffect(() => {
        if (hearts === 0) {
            setShowGameOverModal(true);
        }
    }, [hearts]);

    const currentQuestion = questions[currentQuestionIndex] || { sentence: [], options: [], answer: '' };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: (e, gesture) => {
            if (isOverDropZone(gesture)) {
                if (selectedWord === currentQuestion.answer) {
                    animateToDropZone();
                    setTimeout(() => {
                        goToNextQuestion(true);
                    }, 1000);
                } else {
                    goToNextQuestion(false);
                }
            } else {
                resetWordPosition();
            }
        },
    });

    const isOverDropZone = (gesture: { moveY: number; moveX: number }) => {
        return gesture.moveY > height * 0.4 && gesture.moveY < height * 0.45 && gesture.moveX > width * 0.2 && gesture.moveX < width * 0.8;
    };

    const animateToDropZone = () => {
        Animated.spring(pan, {
            toValue: { x: width * 0.25, y: -height * 0.2 },
            useNativeDriver: false,
        }).start();
    };

    const resetWordPosition = () => {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const handleWordPress = (word: string, optionId: string) => {
        setSelectedWord(word);
        setSelectedOptionId(optionId);
        pan.setValue({ x: 0, y: 0 });
    };

    const goToNextQuestion = (isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
        } else {
            setIncorrectCount(prevCount => prevCount + 1);
            setHearts(prevHearts => Math.max(prevHearts - 1, 0));
        }

        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex === questions.length) {
            if (correctCount + (isCorrect ? 1 : 0) === questions.length) {
                setShowCongratulations(true);
            } else {
                setShowGameOverModal(true);
            }
        } else {
            setCurrentQuestionIndex(nextIndex);
        }

        setProgress(nextIndex / questions.length);
        setSelectedWord(null);
        setSelectedOptionId(null);
        pan.setValue({ x: 0, y: 0 });
    };

    const renderHeartIcons = () => {
        const heartIcons = [];
        for (let i = 0; i < hearts; i++) {
            heartIcons.push(<Icon key={i} name="heart" size={24} color="#FF5733" />);
        }
        for (let i = hearts; i < 5; i++) {
            heartIcons.push(<Icon key={i} name="heart-outline" size={24} color="#FF5733" />);
        }
        return heartIcons;
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setHearts(5);
        setCorrectCount(0);
        setIncorrectCount(0);
        setProgress(0);
        setShowGameOverModal(false);
        setShowCongratulations(false);
        onFinish();
    };

    return (
        <View style={styles.container}>
            <TopContainer
                hearts={5 - incorrectCount}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
            />
            <Progress.Bar progress={progress} color={'#4CAF50'} width={width * 0.9} style={styles.progressBar} height={8} />
            <View style={styles.questionContainer}>
                <Text style={styles.subtitle}>öğrendiklerinizi pekiştirin{'\n'}</Text>
                <Text style={styles.instruction}>Cümleyi tamamlayın.</Text>
                <View style={styles.sentence}>
                    {currentQuestion.sentence.map((part, index) => (
                        <React.Fragment key={index}>
                            {part === '' ? (
                                <View style={styles.blank}>
                                    {selectedWord && (
                                        <Animated.Text style={[styles.selectedWord, { transform: pan.getTranslateTransform() }]}>
                                            {selectedWord}
                                        </Animated.Text>
                                    )}
                                </View>
                            ) : (
                                <Text style={styles.sentenceText}>{part}</Text>
                            )}
                        </React.Fragment>
                    ))}
                </View>
                <View style={styles.optionContainer}>
                    {currentQuestion.options.map(option => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.option,
                                option.id === selectedOptionId ? styles.selectedOption : null,
                            ]}
                            onPress={() => handleWordPress(option.text, option.id)}
                            {...panResponder.panHandlers}
                        >
                            <Text style={styles.optionText}>{option.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.okButtonContainer}>
                    <TouchableOpacity style={styles.okButton} onPress={() => goToNextQuestion(selectedWord === currentQuestion.answer)}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CongratulationsModal visible={showCongratulations} onClose={restartQuiz} />

            <GameOverModal
                visible={showGameOverModal}
                onRestart={restartQuiz}
                answer={currentQuestion.answer}
            />
        </View>
    );
};

export default DragDropQuizComponent;
