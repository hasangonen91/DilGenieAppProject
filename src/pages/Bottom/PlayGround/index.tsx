import React, { useState } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import Header from '../../../components/header/Header';
import BoxItem from '../../../components/boxItem/BoxItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../types/navigation';

const { width } = Dimensions.get('window');

interface DataItem {
  id: string;
  imageName: string;
  terms: string;
  screenName: keyof ApplicationStackParamList;
}

const data: DataItem[] = [
  { id: 'Hangman', imageName: 'images/game/hangman.png', terms: '30 terms', screenName: 'Hangman' },
  { id: 'Flappy Bird', imageName: 'images/game/flapybird.png', terms: '30 terms', screenName: 'FlappyBird' },
  { id: 'Word Puzzle', imageName: 'images/game/puzzle.png', terms: '30 terms', screenName: 'WordPuzzle' },
  { id: 'Quiz', imageName: 'images/game/quiz.png', terms: '30 terms', screenName: 'Quiz' },
  { id: 'Word Matching', imageName: 'images/game/word.png', terms: '30 terms', screenName: 'WordMatching' },
  { id: 'Word Completion', imageName: 'images/game/wordcomplation.png', terms: '30 terms', screenName: 'WordCompletion' },
  { id: 'Word Sorting', imageName: 'images/game/wordsorting.png', terms: '30 terms', screenName: 'WordSorting' },
  { id: 'Crossword Puzzle', imageName: 'images/game/crossword.png', terms: '30 terms', screenName: 'CrossWordPuzzle' },
];

const PlayGround: React.FC = () => {
  const [selectedItem] = useState<string | null>(null);
  const [currentIndex] = useState<number>(0);
  const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();

  const handleItemPress = (screenName: keyof ApplicationStackParamList) => {
    navigation.navigate(screenName);
  };

  const renderItem = ({ item, index }: { item: DataItem; index: number }) => (
    <BoxItem
      item={item}
      selectedIndex={selectedItem}
      onPress={() => handleItemPress(item.screenName)}
      isCurrent={index === currentIndex}
      animationType={'pulse'}
    />
  );

  return (
    <>
      <Header title='Playground' />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          width: width,
          backgroundColor: '#020825',
        }}
        contentContainerStyle={styles.container}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
  },
});

export default PlayGround;
