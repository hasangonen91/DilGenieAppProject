import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {VOICES} from '../../config/ttsConfig';
import {
  getSelectedVoice,
  setVoice,
  setGeminiApiKey,
  isHDTTSAvailable,
} from '../../services/tts/googleTTS';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

// Ses seçimi + Google HD anahtarı yönetimi.
const VoicePickerModal: React.FC<Props> = ({isVisible, onClose}) => {
  const [current, setCurrent] = useState(getSelectedVoice());
  const [keyInput, setKeyInput] = useState('');
  const [hdActive, setHdActive] = useState(isHDTTSAvailable());

  useEffect(() => {
    if (isVisible) {
      setCurrent(getSelectedVoice());
      setHdActive(isHDTTSAvailable());
    }
  }, [isVisible]);

  const pick = async (id: string) => {
    await setVoice(id);
    setCurrent(id);
    onClose();
  };

  const saveKey = async () => {
    if (!keyInput.trim()) {
      return;
    }
    await setGeminiApiKey(keyInput.trim());
    setKeyInput('');
    setHdActive(isHDTTSAvailable());
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}>
      <View style={styles.sheet}>
        <View style={styles.grabber} />

        <Text style={styles.title}>Ses Paketi</Text>
        <Text style={styles.subtitle}>
          {hdActive
            ? 'Google HD sesler aktif — kaliteli telaffuz icin sec:'
            : 'Su an cihaz sesi calıyor. Google HD icin asagıya anahtarını gir:'}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {VOICES.map(v => (
            <TouchableOpacity
              key={v.id}
              style={[styles.chip, current === v.id && styles.chipActive]}
              onPress={() => pick(v.id)}>
              <Icon
                name={current === v.id ? 'checkmark-circle' : 'mic-outline'}
                size={13}
                color={current === v.id ? '#020825' : '#00e0ff'}
              />
              <Text
                style={[
                  styles.chipName,
                  current === v.id && styles.chipTextActive,
                ]}>
                {v.name}
              </Text>
              <Text
                style={[
                  styles.chipStyle,
                  current === v.id && styles.chipTextActive,
                ]}>
                {v.style}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {!hdActive && (
          <Animatable.View animation="fadeInUp" useNativeDriver>
            <View style={styles.keyRow}>
              <TextInput
                style={styles.input}
                placeholder="AI Studio API anahtarı (aistudio.google.com/apikey)"
                placeholderTextColor="#5D6A8C"
                value={keyInput}
                onChangeText={setKeyInput}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
              <TouchableOpacity style={styles.saveBtn} onPress={saveKey}>
                <Text style={styles.saveBtnText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', margin: 0},
  sheet: {
    backgroundColor: '#0A1332',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(93, 63, 211, 0.5)',
  },
  grabber: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginBottom: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  subtitle: {
    color: '#8E9BC0',
    fontSize: 12.5,
    marginTop: 3,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 3,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.35)',
    backgroundColor: 'rgba(0, 224, 255, 0.06)',
    minWidth: 108,
  },
  chipActive: {
    backgroundColor: '#00e0ff',
    borderColor: '#00e0ff',
  },
  chipName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  chipStyle: {
    color: '#7C8BB0',
    fontSize: 10.5,
  },
  chipTextActive: {
    color: '#020825',
  },
  keyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 37, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 139, 176, 0.35)',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 12.5,
  },
  saveBtn: {
    backgroundColor: '#5D3FD3',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12.5,
  },
});

export default VoicePickerModal;
