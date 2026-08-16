import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';
import Tts from 'react-native-tts';
import {Question, ListeningData, CategoryData} from './ListeningData';

const LISTENING_URL =
  'https://raw.githubusercontent.com/hasangonen91/dilgenie/main/vocabulary/A1ListeningData.json';

// Türkçe kategori isimleri (görünüm için)
const CATEGORY_TR: Record<string, string> = {
  greetings: 'Selamlaşmalar',
  family: 'Aile',
  months: 'Aylar',
  years: 'Yıllar',
  colors_numbers_shapes: 'Renkler, Sayılar, Şekiller',
  days: 'Günler',
  places: 'Yerler',
  directions: 'Yönler',
  animals: 'Hayvanlar',
  food_drinks: 'Yiyecek & İçecek',
  clothes: 'Kıyafetler',
  weather: 'Hava Durumu',
  occupations: 'Meslekler',
  body_parts: 'Vücut Bölümleri',
  transport: 'Ulaşım',
  school: 'Okul',
  hobbies: 'Hobiler',
  emotions: 'Duygular',
  nature: 'Doğa',
  technology: 'Teknoloji',
  home: 'Ev & Eşyalar',
  sports: 'Spor',
  travel: 'Seyahat',
};

const Listening: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [questionsData, setQuestionsData] = useState<ListeningData | null>(
    null,
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voicesRes, questionsRes] = await Promise.all([
          fetch(
            'https://raw.githubusercontent.com/hasangonen91/dilgenie/main/voice/voices.json',
          ),
          fetch(LISTENING_URL),
        ]);
        const voicesData = await voicesRes.json();
        const data: ListeningData = await questionsRes.json();
        setVoices(voicesData);
        setQuestionsData(data);
      } catch (e) {
        Alert.alert('Hata', 'Veriler yüklenemedi: ' + (e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const setupTts = async () => {
      if (voices.length > 0) {
        try {
          await Tts.setDefaultLanguage(voices[0].language);
          await Tts.setDefaultVoice(voices[0].id);
        } catch (e) {
          // ses kurulumu başarısız olabilir, test devam eder
        }
      }
    };
    setupTts();
  }, [voices]);

  const selectCategory = (key: string) => {
    if (!questionsData) return;
    const cat: CategoryData = (questionsData as any)[key];
    if (cat && cat.questions && cat.questions.length > 0) {
      setQuestions(cat.questions);
      setSelectedCategory(key);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowTranslation(false);
    } else {
      Alert.alert(
        'Bilgi',
        `'${CATEGORY_TR[key] || key}' kategorisinde henüz soru yok.`,
      );
    }
  };

  const playSentence = () => {
    if (questions.length > 0) {
      Tts.speak(questions[currentQuestionIndex].question);
    }
  };

  const checkAnswer = (option: string) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestionIndex].correctOption;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowTranslation(false);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      Alert.alert(
        'Test Bitti',
        `Tebrikler! Testimiz bitti. Skorunuz: ${score + 1}/${questions.length}`,
        [
          {text: 'Kategorilere Dön', onPress: () => setSelectedCategory(null)},
          {
            text: 'Tekrar Başlat',
            onPress: () => selectCategory(selectedCategory!),
          },
        ],
      );
    }
  };

  const toggleTranslation = () => setShowTranslation(!showTranslation);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veriler Yükleniyor...</Text>
      </View>
    );
  }

  // Kategori seçim ekranı
  if (!selectedCategory || !questionsData) {
    const keys = Object.keys(questionsData || {}).filter(
      k =>
        (questionsData as any)[k] &&
        typeof (questionsData as any)[k] === 'object' &&
        (questionsData as any)[k].questions,
    );
    return (
      <View style={[styles.container, styles.categoryScreen]}>
        <Text style={styles.title}>Kategori Seç</Text>
        <ScrollView contentContainerStyle={styles.categoryList}>
          {keys.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.categoryButton}
              onPress={() => selectCategory(key)}>
              <Text style={styles.categoryButtonText}>
                {CATEGORY_TR[key] || key}
              </Text>
              <Text style={styles.categoryCount}>
                {(questionsData as any)[key].questions.length} soru
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedCategory(null)}>
        <Text style={styles.backText}>← {CATEGORY_TR[selectedCategory]}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>English Listening Test</Text>
      <Image source={{uri: currentQuestion.image}} style={styles.image} />
      <TouchableOpacity style={styles.playButton} onPress={playSentence}>
        <Text style={styles.playButtonText}>Cümleyi Dinle 🔊</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && {
                backgroundColor: isCorrect === true ? 'green' : 'red',
              },
            ]}
            onPress={() => checkAnswer(option)}
            disabled={selectedOption !== null}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.translationButton}
        onPress={toggleTranslation}>
        <Text style={styles.translationButtonText}>
          {showTranslation ? 'Çeviriyi Gizle' : 'Çeviriyi Göster'}
        </Text>
      </TouchableOpacity>
      {showTranslation && (
        <Text style={styles.translationText}>
          {currentQuestion.translation}
        </Text>
      )}
      {selectedOption !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Sonraki →</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.scoreText}>
        Skor: {score}/{questions.length}
      </Text>
    </View>
  );
};

export default Listening;
