import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import Header from '../../../components/header/Header';
import BoxItem from '../../../components/boxItem/BoxItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../types/navigation';

const { width, height } = Dimensions.get('window');

interface DataItem {
  id: string;
  imageName: string;
  terms: string;
  screenName: keyof ApplicationStackParamList;

}

const data: DataItem[] = [
  { id: 'A1', imageName: 'images/level/A1.jpg', terms: '30 terms', screenName: 'A1level' },
  { id: 'A2', imageName: 'images/level/A2.jpg', terms: '30 terms', screenName: 'A2level' },
  { id: 'B1', imageName: 'images/level/B1.jpg', terms: '30 terms', screenName: 'B1level' },
  { id: 'B2', imageName: 'images/level/B2.jpg', terms: '30 terms', screenName: 'B2level' },
  { id: 'C1', imageName: 'images/level/C1.jpg', terms: '30 terms', screenName: 'C1level' },
  { id: 'C2', imageName: 'images/level/C2.jpg', terms: '30 terms', screenName: 'C2level' },
];

const Vocabulary: React.FC = () => {
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

export default Vocabulary;
