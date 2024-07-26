import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import StartGameModal from '../../../components/modal/GameModal/StartModal';
import GameOverModal from '../../../components/modal/GameModal/GameOverModal';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const PIXABAY_API_KEY = '16333730-73501313c96bade13ead9096f';

interface Country {
  name: string;
  capital: string;
  imageUrl: string | null;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(10);
  const [lives, setLives] = useState<number>(5);
  const [showStartModal, setShowStartModal] = useState<boolean>(true);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountriesAndImages = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital');
        const data = await response.json();
        const countryPromises = data.map(async (country: any) => {
          const name = country.name.common;
          const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
          try {
            const imageResponse = await fetch(
              `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(name)}&image_type=photo&per_page=3`
            );
            const imageData = await imageResponse.json();
            return {
              name,
              capital,
              imageUrl: imageData && imageData.hits && imageData.hits.length > 0 ? imageData.hits[0].webformatURL : null
            };
          } catch (error) {
            console.error(`Error fetching image for ${name}:`, error);
            return { name, capital, imageUrl: null };
          }
        });
        const countriesWithImages = await Promise.all(countryPromises);
        setCountries(countriesWithImages.filter(country => country.capital !== 'N/A'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountriesAndImages();
  }, []);

  useEffect(() => {
    if (countries.length > 0 && gameStarted) {
      shuffleQuestions();
    }
  }, [countries, gameStarted]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (timer > 0 && !showGameOverModal && gameStarted) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            setShowGameOverModal(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, showGameOverModal, gameStarted]);

  const shuffleQuestions = () => {
    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    setCurrentQuestion(0);
    setOptions(getOptions(shuffled[0], shuffled));
    setShowScore(false);
    setScore(0);
    setLives(5);
    setTimer(10);
  };

  const getOptions = (correct: Country, allCountries: Country[]) => {
    const options = [correct.capital];
    while (options.length < 4) {
      const randomCapital = allCountries[Math.floor(Math.random() * allCountries.length)].capital;
      if (!options.includes(randomCapital)) {
        options.push(randomCapital);
      }
    }
    return options.sort(() => 0.5 - Math.random());
  };

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === countries[currentQuestion].capital) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < countries.length) {
        setCurrentQuestion(nextQuestion);
        setOptions(getOptions(countries[nextQuestion], countries));
        setSelectedAnswer(null);
        setTimer(10);
      } else {
        setShowScore(true);
        setAnswer(countries[currentQuestion].capital);
        setHint('Next session');
      }
    }, 1000);

    if (lives === 1) {
      setShowGameOverModal(true);
    }
  };

  const renderHeartIcons = () => {
    const heartIcons = [];
    for (let i = 0; i < lives; i++) {
      heartIcons.push(<Icon key={i} name="heart" size={24} color="red" />);
    }
    return heartIcons;
  };

  const handleRestartGame = () => {
    setShowGameOverModal(false);
    shuffleQuestions();
  };

  const handleStartGame = () => {
    setShowStartModal(false);
    setGameStarted(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {gameStarted ? (
        <>
          <View style={styles.topContainer}>
            <View style={styles.heartContainer}>{renderHeartIcons()}</View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Max Skor: {maxScore}</Text>
              <Text style={styles.scoreText}>Skor: {score}</Text>
              <Text style={styles.timerText}>Süre: {timer}</Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.questionText}>What is the capital of {countries[currentQuestion].name}?</Text>
            {countries[currentQuestion].imageUrl && (
              <FastImage
                source={{ uri: countries[currentQuestion].imageUrl }}
                style={styles.countryImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View style={styles.optionsContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && {
                      backgroundColor:
                        option === countries[currentQuestion].capital ? 'green' : 'red'
                    }
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.buttonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}

      <StartGameModal visible={showStartModal} onStart={handleStartGame} />

      <GameOverModal
        visible={showGameOverModal}
        onRestart={handleRestartGame}
        answer={countries[currentQuestion]?.capital}
        hint={`What is the capital of ${countries[currentQuestion]?.name}?`}
      />
    </SafeAreaView>
  );
};



export default App;

