import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TopicWord, topicWords} from '../../data/topicWords';

interface TopicWordsListProps {
  topic: string;
  onClose: () => void;
  onLearn: (en: string) => void;
}

const TopicWordsList: React.FC<TopicWordsListProps> = ({topic, onClose, onLearn}) => {
  const words: TopicWord[] = topicWords[topic] || [];

  const renderWord = ({item}: {item: TopicWord}) => (
    <View style={styles.card}>
      <View style={styles.wordRow}>
        <Text style={styles.en}>{item.en}</Text>
        <Text style={styles.tr}>{item.tr}</Text>
      </View>
      <Text style={styles.example}>{item.example}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{topic}</Text>
        <Text style={styles.count}>{words.length} words</Text>
      </View>
      <FlatList
        data={words}
        renderItem={renderWord}
        keyExtractor={item => item.en}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopicWordsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020825',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  count: {
    color: '#00e0ff',
    fontSize: 14,
  },
  list: {
    paddingBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(93, 63, 211, 0.15)',
    borderColor: '#5D3FD3',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  en: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  tr: {
    color: '#00e0ff',
    fontSize: 15,
  },
  example: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 6,
    fontStyle: 'italic',
  },
  closeBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#5D3FD3',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 8,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});