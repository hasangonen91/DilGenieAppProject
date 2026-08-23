import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getTopicWords,
  getTopicWordsSync,
  prefetchTopicWords,
  TopicWordsMap,
} from '../../data/topicWords';
import type {TopicWord} from '../../data/topicWords';
import {speakWordHD, speakSentenceHD, onTTSStatus, stopSpeaking} from '../../services/tts/googleTTS';
import {getSelectedVoice} from '../../services/tts/googleTTS';
import VoicePickerModal from '../voicePicker/VoicePickerModal';

interface TopicWordsListProps {
  topic: string;
  onClose: () => void;
  onLearn?: (en: string) => void;
}

// Kullanıcıya nasıl kullanacağını gösteren mini rehber şeridi.
const HowToStrip = () => (
  <View style={styles.howTo}>
    <Icon name="information-circle" size={16} color="#00e0ff" />
    <Text style={styles.howToText}>
      Kelimeye dokun → dinle. Cümleye dokun → örnekte duy. Ampul satırı →
      kelimenin en basit açıklaması.
    </Text>
  </View>
);

// Üstteki ses seçme şeridi — dokununca ses paketi modalı açılır.
const VoiceBar = () => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [voice, setVoiceState] = useState(getSelectedVoice());

  return (
    <>
      <TouchableOpacity
        style={styles.voiceBar}
        activeOpacity={0.8}
        onPress={() => setPickerOpen(true)}>
        <Icon name="musical-notes" size={15} color="#00e0ff" />
        <Text style={styles.voiceBarText}>Ses:</Text>
        <Text style={styles.voiceBarName}>{voice}</Text>
        <View style={styles.hdBadge}>
          <Text style={styles.hdBadgeText}>Google HD</Text>
        </View>
        <Icon name="chevron-forward" size={14} color="#5D6A8C" />
      </TouchableOpacity>
      <VoicePickerModal
        isVisible={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          setVoiceState(getSelectedVoice());
        }}
      />
    </>
  );
};

const WordCard: React.FC<{
  item: TopicWord;
  index: number;
  onPressLearn: (en: string) => void;
}> = ({item, index, onPressLearn}) => {
  const [speaking, setSpeaking] = useState<'word' | 'sentence' | null>(null);

  useEffect(() => {
    // HD ses hazırlanırken buton spinner gösterir; bitince durum temizlenir.
    return onTTSStatus(status => {
      if (status === 'idle') {
        setSpeaking(null);
      }
    });
  }, []);

  const playWord = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(null);
      return;
    }
    setSpeaking('word');
    Vibration.vibrate(12);
    onPressLearn?.(item.en);
    await speakWordHD(item.en);
  };

  const playSentence = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(null);
      return;
    }
    setSpeaking('sentence');
    await speakSentenceHD(item.example);
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      delay={Math.min(index * 60, 600)}
      useNativeDriver>
      <View style={styles.card}>
        {/* Kelime satırı — dokun = kelimeyi HD seste dinle */}
        <TouchableOpacity
          style={styles.wordRow}
          activeOpacity={0.7}
          onPress={playWord}>
          <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.wordTextWrap}>
            <Text style={styles.en}>{item.en}</Text>
            <Text style={styles.tr}>{item.tr}</Text>
          </View>

          <View
            style={[
              styles.speakerBtn,
              speaking === 'word' && styles.speakerBtnActive,
            ]}>
            {speaking === 'word' ? (
              <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={900}>
                <Icon name="sync" size={18} color="#020825" />
              </Animatable.View>
            ) : (
              <Icon name="volume-high" size={19} color="#00e0ff" />
            )}
          </View>
        </TouchableOpacity>

        {item.tip ? (
          <View style={styles.tipRow}>
            <Icon name="bulb" size={14} color="#FFD166" />
            <Text style={styles.tipText}>{item.tip}</Text>
          </View>
        ) : null}

        {/* Örnek cümle şeridi — dokun = cümleyi HD seste dinle */}
        <TouchableOpacity
          style={[
            styles.exampleStrip,
            speaking === 'sentence' && styles.exampleStripActive,
          ]}
          activeOpacity={0.7}
          onPress={playSentence}>
          {speaking === 'sentence' ? (
            <Animatable.View
              animation="rotate"
              iterationCount="infinite"
              duration={900}>
              <Icon name="sync" size={16} color="#00e0ff" />
            </Animatable.View>
          ) : (
            <Icon name="play-circle-outline" size={16} color="#7C8BB0" />
          )}
          <Text style={styles.example} numberOfLines={2}>
            {item.example}
          </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const TopicWordsList: React.FC<TopicWordsListProps> = ({topic, onLearn}) => {
  const [wordsMap, setWordsMap] = useState<TopicWordsMap>(() => getTopicWordsSync());

  useEffect(() => {
    let mounted = true;
    prefetchTopicWords();
    getTopicWords().then(map => {
      if (mounted) {
        setWordsMap(map);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const words: TopicWord[] = wordsMap[topic] || [];

  return (
    <FlatList
      data={words}
      keyExtractor={(item, i) => `${item.en}-${i}`}
      renderItem={({item, index}) => (
        <WordCard
          item={item}
          index={index}
          onPressLearn={onLearn || (() => {})}
        />
      )}
      ListHeaderComponent={
        <>
          <HowToStrip />
          <VoiceBar />
        </>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

export default TopicWordsList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 40,
  },
  howTo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 224, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.25)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  howToText: {
    flex: 1,
    color: '#8E9BC0',
    fontSize: 12.5,
    lineHeight: 17,
  },
  voiceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(93, 63, 211, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(93, 63, 211, 0.45)',
  },
  voiceBarText: {
    color: '#8E9BC0',
    fontSize: 12.5,
  },
  voiceBarName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  hdBadge: {
    backgroundColor: 'rgba(0, 224, 255, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  hdBadgeText: {
    color: '#00e0ff',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  card: {
    backgroundColor: '#0A1332',
    borderRadius: 18,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 139, 176, 0.12)',
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(93, 63, 211, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  indexText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  wordTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  en: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  tr: {
    color: 'rgba(0, 224, 255, 0.75)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 3,
  },
  speakerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 224, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerBtnActive: {
    backgroundColor: '#00e0ff',
    borderColor: '#00e0ff',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: 'rgba(255, 209, 102, 0.07)',
    borderLeftWidth: 3,
    borderLeftColor: '#FFD166',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tipText: {
    flex: 1,
    color: '#D9C58A',
    fontSize: 13,
    lineHeight: 17,
  },
  exampleStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    backgroundColor: 'rgba(2, 8, 37, 0.65)',
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  exampleStripActive: {
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.45)',
  },
  example: {
    color: '#8E9BC0',
    fontSize: 13.5,
    fontStyle: 'italic',
    flexShrink: 1,
    flex: 1,
  },
});
