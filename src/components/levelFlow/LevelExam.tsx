import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface ExamQuestion {
  sentence: string[];
  options: {id: string; text: string}[];
  answer: string;
}

interface LevelExamProps {
  questions: any[];
  onComplete: (score: number) => void;
  title?: string;
}

const LevelExam: React.FC<LevelExamProps> = ({questions, onComplete, title = 'Seviye Sınavı'}) => {
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const question = questions[current];
    if (option === question.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Sınav soruları yüklenemedi.</Text>
      </SafeAreaView>
    );
  }

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Icon name="trophy" size={64} color="#00e0ff" />
          <Text style={styles.resultTitle}>{title} Tamamlandı!</Text>
          <Text style={styles.resultScore}>
            {score} / {questions.length} doğru
          </Text>
          <Text style={styles.resultDetail}>
            {Math.round((score / questions.length) * 100)}% başarı
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {setShowResult(false); setScore(0); setCurrent(0);}>
            <Text style={styles.retryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[current];
  const progress = (current + 1) / questions.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressBar}>
          <View
            style={{
              ...styles.progressFill,
              width: `${progress * 100}%`,
            }}
          />
        </View>
        <Text style={styles.progressText}>
          Soru {current + 1} / {questions.length}
        </Text>
      </View>

      <View style={styles.questionCard}>
        <View style={styles.sentenceRow}>
          {question.sentence.map((part, idx) => (
            <React.Fragment key={idx}>
              {idx === 1 ? (
                <TouchableOpacity
                  style={[
                    styles.blank,
                    selected ? styles.blankSelected : null,
                    selected && selected === question.answer
                      ? styles.blankCorrect
                      : answered && selected !== question.answer
                      ? styles.blankWrong
                      : null,
                  ]}
                  onPress={() => !answered && handleSelect(question.answer)}>
                  <Text style={styles.blankText}>
                    {selected ? selected : '___'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.sentencePart}>{part}</Text>
              )}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.option,
                selected === opt.text && styles.optionSelected,
                answered &&
                  opt.text === question.answer &&
                  styles.optionCorrect,
                answered && selected === opt.text && selected !== question.answer &&
                  styles.optionWrong,
              ]}
              onPress={() => !answered && handleSelect(opt.text)}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {answered && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {current < questions.length - 1 ? 'Sonraki' : 'Sonuçları Göster'}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#020825'},
  header: {paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8},
  title: {color: '#00e0ff', fontSize: 20, fontWeight: 'bold'},
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,224,255,0.2)',
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00e0ff',
    borderRadius: 3,
  },
  progressText: {color: '#8E9BC0', fontSize: 12, marginTop: 4, textAlign: 'center'},
  questionCard: {marginHorizontal: 16, marginTop: 16, padding: 16, backgroundColor: '#0A1332', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(93,63,211,0.3)'},
  sentenceRow: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 20},
  sentencePart: {color: '#FFFFFF', fontSize: 16, lineHeight: 24},
  blank: {minWidth: 120, height: 40, borderWidth: 2, borderColor: '#00e0ff', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4, paddingHorizontal: 8},
  blankSelected: {borderColor: '#00e0ff', backgroundColor: 'rgba(0,224,255,0.1)'},
  blankCorrect: {borderColor: '#00ff88', backgroundColor: 'rgba(0,255,136,0.15)'},
  blankWrong: {borderColor: '#ff4444', backgroundColor: 'rgba(255,68,68,0.15)'},
  blankText: {color: '#00e0ff', fontSize: 16, fontWeight: 'bold'},
  sentencePart: {color: '#FFFFFF', fontSize: 16, lineHeight: 24},
  optionsContainer: {marginTop: 16, gap: 10},
  option: {flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: 'rgba(93,63,211,0.1)', borderWidth: 1, borderColor: 'rgba(93,63,211,0.3)', borderRadius: 12},
  optionSelected: {borderColor: '#00e0ff', backgroundColor: 'rgba(0,224,255,0.15)'},
  optionCorrect: {borderColor: '#00ff88', backgroundColor: 'rgba(0,255,136,0.15)'},
  optionWrong: {borderColor: '#ff4444', backgroundColor: 'rgba(255,68,68,0.15)'},
  optionText: {color: '#FFFFFF', fontSize: 15, flex: 1},
  nextButton: {marginTop: 20, paddingVertical: 14, backgroundColor: '#00e0ff', borderRadius: 12, alignItems: 'center'},
  nextButtonText: {color: '#020825', fontSize: 16, fontWeight: 'bold'},
  container: {flex: 1, backgroundColor: '#020825'},
  resultContainer: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24},
  resultTitle: {color: '#00e0ff', fontSize: 28, fontWeight: 'bold', marginTop: 16, marginBottom: 8},
  resultScore: {color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginBottom: 8},
  resultDetail: {color: '#00e0ff', fontSize: 16, marginBottom: 24},
  retryButton: {paddingVertical: 14, paddingHorizontal: 32, backgroundColor: '#00e0ff', borderRadius: 12},
  retryButtonText: {color: '#020825', fontSize: 16, fontWeight: 'bold'},
  error: {color: '#ff4444', fontSize: 16, textAlign: 'center', marginTop: 40},
};

export default LevelExam;
