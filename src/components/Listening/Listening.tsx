import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import styles from './styles';
import Tts from 'react-native-tts';
import { Question, ListeningData } from './ListeningData';

const Listening: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVoices = async () => {
      const voicesResponse = await fetch('https://raw.githubusercontent.com/hasangonen91/dilgenie/main/voice/voices.json');
      const voicesData = await voicesResponse.json();
      setVoices(voicesData);

      const questionsResponse = await fetch('https://raw.githubusercontent.com/hasangonen91/dilgenie/main/vocabulary/A1ListeningData.json');
      const questionsData: ListeningData = await questionsResponse.json();

      // For simplicity, we're assuming questions are in the 'greetings' category
      setQuestions(questionsData.greetings.questions);
      setLoading(false);
    };

    fetchVoices();
  }, []);

  useEffect(() => {
    const setupTts = async () => {
      if (voices.length > 0) {
        await Tts.setDefaultLanguage(voices[0].language);
        await Tts.setDefaultVoice(voices[0].id);
      }
    };

    setupTts();
  }, [voices]);

  const playSentence = () => {
    if (!loading) {
      Tts.speak(questions[currentQuestionIndex].question);
    }
  };

  const checkAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    const isCorrectOption = selectedOption === questions[currentQuestionIndex].correctOption;
    setIsCorrect(isCorrectOption);
    if (isCorrectOption) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowTranslation(false);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      Alert.alert(
        "Test Bitti",
        `Tebrikler! Testimiz bitti. Skorunuz: ${score + 1}/${questions.length}`,
        [{ text: "Testi Yeniden Başlat", onPress: restartQuiz }]
      );
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowTranslation(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veriler Yükleniyor...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>English Listening Test</Text>
      <Image source={{ uri: currentQuestion.image }} style={styles.image} />
      <TouchableOpacity style={styles.playButton} onPress={playSentence}>
        <Text style={styles.playButtonText}>Cümleyi Dinle</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && {
                backgroundColor: isCorrect === true ? 'green' : 'red'
              }
            ]}
            onPress={() => checkAnswer(option)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.translationButton} onPress={toggleTranslation}>
        <Text style={styles.translationButtonText}>
          {showTranslation ? 'Çeviriyi Gizle' : 'Çeviriyi Göster'}
        </Text>
      </TouchableOpacity>
      {showTranslation && (
        <Text style={styles.translationText}>{currentQuestion.translation}</Text>
      )}
      <View style={styles.buttonContainer}>
        {selectedOption !== null && (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>Sonraki</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.scoreText}>Skor: {score}/{questions.length}</Text>
    </View>
  );
};

export default Listening;







