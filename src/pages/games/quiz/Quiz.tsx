import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchCountriesData } from '../../../services/api/base';
import StartGameModal from '../../../components/modal/GameModal/StartModal';
import GameOverModal from '../../../components/modal/GameModal/GameOverModal';
import styles from './styles';
import BackHeader from '../../../components/header/BackHeader';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface Country {
  country_en: string;
  capital_en: string;
  image_url: string;
}

const QuizScreen: React.FC = () => {
  const [quizData, setQuizData] = useState<Country[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [animatedValue] = useState(new Animated.Value(0));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showStartModal, setShowStartModal] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [gameOverModalVisible, setGameOverModalVisible] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(1000);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [powerUpsUsed, setPowerUpsUsed] = useState({
    fiftyFifty: false,
    correctAnswer: false,
    retry: false,
  });
  const [coinRotation] = useState(new Animated.Value(0));
  const [questionHistory, setQuestionHistory] = useState<number[]>([]);
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await fetchCountriesData();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
    loadCoins();

    Animated.loop(
      Animated.timing(coinRotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    if ((timeLeft === 0 || hearts === 0) && !showScore && gameStarted) {
      setShowScore(true);
      setAnswer(quizData[currentQuestion]?.capital_en);
      setHint('');
      setGameOverModalVisible(true);
    }
  }, [timeLeft, hearts, showScore, gameStarted, quizData, currentQuestion]);

  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
    }
  }, [score, maxScore]);

  const loadCoins = async () => {
    try {
      const savedCoins = await AsyncStorage.getItem('coins');
      if (savedCoins !== null) {
        setCoins(parseInt(savedCoins, 10));
      }
    } catch (error) {
      console.error('Error loading coins:', error);
    }
  };

  const saveCoins = async (newCoins: number) => {
    try {
      await AsyncStorage.setItem('coins', newCoins.toString());
    } catch (error) {
      console.error('Error saving coins:', error);
    }
  };

  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const options = useMemo(() => {
    if (!quizData[currentQuestion]) return [];

    const correctAnswer = quizData[currentQuestion].capital_en;
    const otherOptions = quizData
      .filter((item, index) => index !== currentQuestion)
      .map(item => item.capital_en)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return shuffleArray([correctAnswer, ...otherOptions]);
  }, [quizData, currentQuestion]);

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion]?.capital_en;
    setSelectedOption(selectedAnswer);

    if (answer === selectedAnswer) {
      setScore((prevScore) => prevScore + 1);
      const newCoins = coins + 5;
      setCoins(newCoins);
      saveCoins(newCoins);
    } else {
      setHearts((prevHearts) => prevHearts - 1);
    }

    setTimeout(moveToNextQuestion, 1000);
  };

  const moveToNextQuestion = () => {
    if (usedIndices.length < quizData.length - 1 && hearts > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * quizData.length);
      } while (usedIndices.includes(randomIndex));

      setUsedIndices((prevValue) => [...prevValue, currentQuestion]);
      setQuestionHistory((prevHistory) => [...prevHistory, currentQuestion]);
      setCurrentQuestion(randomIndex);
      setSelectedOption(null);
      setTimeLeft(10); // Reset timer for new question
      progressAnim.setValue(1); // Reset progress animation
      setCurrentOptions([]);
      setPowerUpsUsed({
        fiftyFifty: false,
        correctAnswer: false,
        retry: false,
      });
    } else {
      setAnswer(quizData[currentQuestion]?.capital_en);
      setHint('');
      setGameOverModalVisible(true);
    }
  };

  const usePowerUp = (type: 'fiftyFifty' | 'correctAnswer' | 'retry') => {
    if (powerUpsUsed[type]) return;

    switch (type) {
      case 'fiftyFifty':
        if (coins >= 30) {
          const newCoins = coins - 30;
          setCoins(newCoins);
          saveCoins(newCoins);
          const correctAnswer = quizData[currentQuestion].capital_en;
          const newOptions = options.filter(option =>
            option === correctAnswer || Math.random() < 0.5
          );
          while (newOptions.length < 2) {
            const randomOption = options.find(option => !newOptions.includes(option));
            if (randomOption) newOptions.push(randomOption);
          }
          setCurrentOptions(newOptions);
          setPowerUpsUsed(prev => ({ ...prev, fiftyFifty: true }));
        }
        break;
      case 'correctAnswer':
        if (coins >= 30) {
          const newCoins = coins - 30;
          setCoins(newCoins);
          saveCoins(newCoins);
          handleAnswer(quizData[currentQuestion].capital_en);
          setPowerUpsUsed(prev => ({ ...prev, correctAnswer: true }));
        }
        break;
      case 'retry':
        if (coins >= 100 && questionHistory.length > 0) {
          const newCoins = coins - 100;
          setCoins(newCoins);
          saveCoins(newCoins);
          const previousQuestion = questionHistory[questionHistory.length - 1];
          setCurrentQuestion(previousQuestion);
          setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
          setUsedIndices((prevIndices) => prevIndices.slice(0, -1));
          setSelectedOption(null);
          setTimeLeft(10);
          setCurrentOptions([]);
          setPowerUpsUsed(prev => ({ ...prev, retry: true }));
        }
        break;
    }
  };
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion, animatedValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!showScore && gameStarted) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          setHearts((prevHearts) => prevHearts - 1);
          return 10;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showScore, gameStarted]);

  useEffect(() => {
    if (gameStarted && !showScore) {
      // Reset progress animation when a new question starts
      progressAnim.setValue(1);

      // Start the countdown and progress animation
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            // Update progress animation
            Animated.timing(progressAnim, {
              toValue: (prevTime - 1) / 10,
              duration: 1000,
              useNativeDriver: false,
            }).start();
            return prevTime - 1;
          } else {
            clearInterval(interval);
            // Handle time out (e.g., move to next question or end game)
            moveToNextQuestion();
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, showScore, currentQuestion]);



  const restartGame = () => {
    setScore(0);
    setHearts(5);
    setShowScore(false);
    setUsedIndices([]);
    setCurrentQuestion(0);
    setTimeLeft(10);
    setGameOverModalVisible(false);
    setGameStarted(true);
    setPowerUpsUsed({
      fiftyFifty: false,
      correctAnswer: false,
      retry: false,
    });
  };

  const isCorrectAnswer = (option: string): boolean => {
    const answer = quizData[currentQuestion]?.capital_en;
    return answer === option;
  };

  const renderHeartIcons = () => {
    const heartIcons = [];
    for (let i = 0; i < hearts; i++) {
      heartIcons.push(<Icon key={i} name="flash-sharp" size={24} color="#FFE047" />);
    }
    for (let i = hearts; i < 5; i++) {
      heartIcons.push(<Icon key={i} name="flash-outline" size={24} color="#FFE047" />);
    }
    return heartIcons;
  };

  const animatedStyles = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [height / 2, 0],
        }),
      },
    ],
    opacity: animatedValue,
  };

  const startGame = () => {
    setShowStartModal(false);
    setGameStarted(true);
  };

  const rotateCoins = coinRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <BackHeader title='Quiz' />

      <View style={styles.topContainer}>
        <View style={styles.heartContainer}>
          {renderHeartIcons()}
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Max Skor: {maxScore}{'\t'}</Text>
          <Text style={styles.scoreText}>{'\t'}Skor: {score}{'\t'}</Text>
          {/* <Text style={styles.timerText}>{'\t'}Süre: {timeLeft}</Text> */}
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarContent}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </View>
      </View>

      <Animated.View style={[styles.questionContainer, animatedStyles]}>
        <View style={styles.coinsContainer}>
          <FIcon name="coins" size={20} color="#FFD700" />
          <Text style={styles.coinsText}> {coins}</Text>
        </View>

        <Text style={styles.questionText}>What is the capital of {quizData[currentQuestion]?.country_en}?</Text>
        {quizData[currentQuestion]?.image_url && (
          <Image
            source={{ uri: quizData[currentQuestion].image_url }}
            style={styles.countryImage}
            onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
          />
        )}
        <View style={styles.optionsContainer}>
          {(currentOptions.length > 0 ? currentOptions : options).map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option
                  ? isCorrectAnswer(option)
                    ? styles.correctOption
                    : styles.incorrectOption
                  : null,
              ]}
              onPress={() => handleAnswer(option)}
              disabled={selectedOption !== null || hearts === 0}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <View style={styles.powerUpsContainer}>
        <TouchableOpacity
          style={[styles.powerUpButton, (powerUpsUsed.fiftyFifty || coins < 30) && styles.powerUpDisabled]}
          onPress={() => usePowerUp('fiftyFifty')}
          disabled={powerUpsUsed.fiftyFifty || coins < 30}
        >
          <MIcon name="percent" size={20} color="#fff" />
          <Text style={styles.powerUpText}>50/50</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.powerUpButton, (powerUpsUsed.correctAnswer || coins < 30) && styles.powerUpDisabled]}
          onPress={() => usePowerUp('correctAnswer')}
          disabled={powerUpsUsed.correctAnswer || coins < 30}
        >
          <Icon name="checkmark-circle-outline" size={24} color="#fff" />
          <Text style={styles.powerUpText}>30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.powerUpButton, (powerUpsUsed.retry || coins < 100) && styles.powerUpDisabled]}
          onPress={() => usePowerUp('retry')}
          disabled={powerUpsUsed.retry || coins < 100}
        >
          <Icon name="refresh-outline" size={24} color="#fff" />
          <Text style={styles.powerUpText}>100</Text>
        </TouchableOpacity>
      </View>

      <GameOverModal
        visible={gameOverModalVisible}
        hint={`capital of ${quizData[currentQuestion]?.country_en} `}
        answer={answer}
        onRestart={restartGame}
      />

      <StartGameModal visible={showStartModal} onStart={startGame} />
    </View>
  );
};

export default QuizScreen;