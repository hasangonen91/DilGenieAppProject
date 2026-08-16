import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import {VideoData, VideoClip} from './VideoData';

const VIDEOS_URL =
  'https://raw.githubusercontent.com/hasangonen91/dilgenie/main/video/videos.json';

const CATEGORY_TR: Record<string, string> = {
  greetings: 'Selamlaşmalar',
  family: 'Aile',
  daily_life: 'Günlük Yaşam',
  travel: 'Seyahat',
  food: 'Yemek',
  shopping: 'Alışveriş',
  emotions: 'Duygular',
  conversations: 'Sohbetler',
};

const VideoListening: React.FC = () => {
  const videoRef = useRef<any>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [clipIndex, setClipIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    fetch(VIDEOS_URL)
      .then(r => r.json())
      .then((data: VideoData) => {
        setVideoData(data);
        const keys = Object.keys(data).filter(
          k => data[k] && data[k].length > 0,
        );
        setCategories(keys);
        if (keys.length > 0) {
          selectCategoryLocal(keys[0], data);
        }
        setLoading(false);
      })
      .catch(e => {
        Alert.alert('Hata', 'Video verileri yüklenemedi: ' + e.message);
        setLoading(false);
      });
  }, []);

  const selectCategoryLocal = (key: string, data?: VideoData) => {
    const source = data || videoData;
    if (!source || !source[key] || source[key].length === 0) return;
    setSelectedCategory(key);
    setClips(source[key]);
    setClipIndex(0);
    setQuizMode(false);
    setScore(0);
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowTranscript(false);
  };

  const current = clips[clipIndex];

  const handleVideoEnd = () => {
    setPaused(true);
    Alert.alert('Videoyu izledin!', 'Şimdi anlama sorularını çözebilirsin.', [
      {text: 'Sorulara Geç', onPress: () => setQuizMode(true)},
    ]);
  };

  const checkAnswer = (opt: string) => {
    if (!current) return;
    const q = current.questions[questionIndex];
    setSelectedOption(opt);
    if (opt === q.correctOption) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    if (!current) return;
    if (questionIndex < current.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      Alert.alert(
        'Bölüm Bitti',
        `Skorunuz: ${score}/${current.questions.length}`,
        [
          {
            text: 'Sonraki Video',
            onPress: () => {
              if (clipIndex < clips.length - 1) {
                setClipIndex(clipIndex + 1);
                setQuizMode(false);
                setQuestionIndex(0);
                setScore(0);
                setSelectedOption(null);
                setPaused(false);
              } else {
                Alert.alert('Tebrikler', 'Kategorideki tüm videolar bitti!');
              }
            },
          },
          {text: 'Kapat', style: 'cancel'},
        ],
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFD166" />
        <Text style={styles.loadingText}>Videolar yükleniyor...</Text>
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, {marginTop: 60}]}>
          Henüz video içeriği yok. Bot gece üretiyor...
        </Text>
      </View>
    );
  }

  const q = current.questions[questionIndex];

  return (
    <View style={styles.container}>
      {/* Video alanı */}
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{uri: current.videoUrl}}
          style={{width: '100%', height: '100%'}}
          paused={paused}
          controls
          resizeMode="contain"
          onEnd={handleVideoEnd}
          repeat={false}
        />
      </View>

      {/* Kategori seçici */}
      <TouchableOpacity
        style={styles.categoryPicker}
        onPress={() => setShowCategoryModal(true)}>
        <Text style={styles.categoryPickerText}>
          📂 {CATEGORY_TR[selectedCategory!] || selectedCategory}
        </Text>
        <Text style={{color: '#8892B0'}}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
          }}>
          <View style={styles.categoryModalList}>
            {categories.map(key => (
              <TouchableOpacity
                key={key}
                style={styles.categoryOption}
                onPress={() => {
                  setShowCategoryModal(false);
                  selectCategoryLocal(key);
                }}>
                <Text style={styles.categoryOptionText}>
                  {(CATEGORY_TR[key] || key) +
                    ' (' +
                    (videoData?.[key]?.length || 0) +
                    ' video)'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {!quizMode ? (
        <ScrollView>
          <View style={styles.infoArea}>
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.subtitle}>{current.title_tr}</Text>
            {current.subtitle ? (
              <Text style={[styles.subtitle, {color: '#FFD166', marginTop: 8}]}>
                💡 {current.subtitle}
              </Text>
            ) : null}

            {showTranscript ? (
              <View style={styles.transcriptBox}>
                <Text style={styles.transcript}>{current.transcript}</Text>
                <Text style={styles.transcriptTr}>{current.transcript_tr}</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setShowTranscript(true)}>
                <Text style={styles.translateButton}>
                  📜 Transkripti göster
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setPaused(false)}>
              <Text style={styles.playButtonText}>
                ▶️ Videoyu İzle / Devam Et
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.playButton, {backgroundColor: '#118AB2'}]}
              onPress={() => setQuizMode(true)}>
              <Text style={styles.playButtonText}>❓ Sorulara Geç</Text>
            </TouchableOpacity>
            <Text style={styles.scoreText}>
              Video {clipIndex + 1}/{clips.length}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.questionArea}>
            <Text style={styles.questionText}>
              {questionIndex + 1}. {q.question}
            </Text>
            {q.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.optionButton,
                  selectedOption === opt && {
                    borderColor: isCorrect ? '#06D6A0' : '#EF476F',
                    backgroundColor: isCorrect ? '#064E3B' : '#4B1E28',
                  },
                ]}
                onPress={() => checkAnswer(opt)}
                disabled={selectedOption !== null}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            {selectedOption !== null && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>
                  {questionIndex < current.questions.length - 1
                    ? 'Sonraki Soru →'
                    : 'Bölümü Bitir 🏁'}
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.scoreText}>
              Skor: {score}/{current.questions.length}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default VideoListening;
