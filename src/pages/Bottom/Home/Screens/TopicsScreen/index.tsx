import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { getImageURL } from '../../../../../services/api/base';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

interface DataItem {
  id: string;
  imageName: string;
  terms: string;
}

const data: DataItem[] = [
  { id: 'Nature', imageName: 'images/topics/nature.png', terms: '30 terms' },
  { id: 'Science', imageName: 'images/topics/science.jpg', terms: '30 terms' },
  { id: 'Arts', imageName: 'images/topics/arts.png', terms: '30 terms' },
  { id: 'Travel', imageName: 'images/topics/travel.png', terms: '30 terms' },
  { id: 'Daily Life', imageName: 'images/topics/dailyLife.png', terms: '30 terms' },
  { id: 'Lifestyle', imageName: 'images/topics/lifeStyle.png', terms: '30 terms' },
];

const TopicsScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 20000); // 2 saniye aralıklarla indeksi güncelle

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const renderItem = ({ item, index }: { item: DataItem; index: number }) => (
    <TouchableOpacity
      style={[styles.box, selectedItem === item.id ? { borderColor: '#00e0ff' } : null]}
      onPress={() => {
        setSelectedItem(item.id);
      }}
    >
      <Animatable.View
        style={styles.boxContent}
        animation={index === currentIndex ? 'swing' : undefined}
        duration={1000}
      >
        <FastImage
          style={styles.image}
          source={{
            uri: getImageURL(item.imageName),
            priority: FastImage.priority.high,
          }}
        />
        <View style={styles.line} />
        <Text style={styles.text}>{item.id}</Text>
        <Text style={styles.subText}>{item.terms}</Text>
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{
        flex: 1,
        width: width,
        backgroundColor: 'blue',
      }}
      contentContainerStyle={styles.container}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    backgroundColor: '#020825',
  },
  box: {
    width: width * 0.4,
    height: height * 0.25,
    margin: 15,
    backgroundColor: 'transparent',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
  image: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  boxContent: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  line: {
    width: '100%',
    backgroundColor: '#5D3FD3',
    height: height * 0.0015,
  },
});

export default TopicsScreen;
