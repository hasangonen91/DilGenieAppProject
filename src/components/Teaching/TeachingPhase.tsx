import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import styles from './styles';
import {speak} from '../../utils/speech';

interface TeachingPhaseProps {
  currentItem: {
    en: string;
    tr: string;
    image?: string;
  };
  categoryName: {
    en: string;
    tr: string;
  };
  currentItemIndex: number;
  totalItems: number;
  onNext: () => void;
}

const TeachingPhase: React.FC<TeachingPhaseProps> = ({
  currentItem,
  categoryName,
  currentItemIndex,
  totalItems,
  onNext,
}) => {
  const progress = (currentItemIndex + 1) / totalItems;

  // Her yeni kelimede otomatik telaffuz
  useEffect(() => {
    if (currentItem.en) {
      speak(currentItem.en);
    }
  }, [currentItem.en]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {categoryName.en} - {categoryName.tr}
      </Text>
      <Progress.Bar
        progress={progress}
        color={'#4CAF50'}
        width={315}
        style={{
          marginVertical: 15,
          marginBottom: 20,
        }}
        height={8}
      />
      {currentItem.image && (
        <Image style={styles.image} source={{uri: currentItem.image}} />
      )}
      {/* Kelimeye dokununca tekrar telaffuz */}
      <TouchableOpacity onPress={() => speak(currentItem.en)}>
        <Text style={styles.text}>{currentItem.en}</Text>
      </TouchableOpacity>
      <Text style={styles.translation}>{currentItem.tr}</Text>
      <View style={styles.okButtonContainer}>
        <TouchableOpacity style={styles.okButton} onPress={onNext}>
          <Text style={styles.okButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeachingPhase;
