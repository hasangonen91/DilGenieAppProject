import React, { useState } from 'react';
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
  { id: 'Personality Adjectives', imageName: 'images/populars/Personality.png', terms: '30 terms' },
  { id: 'Phrasal Verbs with PUT', imageName: 'images/populars/put.png', terms: '30 terms' },
  { id: 'Phrasal Verbs with GET', imageName: 'images/populars/get.png', terms: '30 terms' },
  { id: 'Feelings', imageName: 'images/populars/feelings.png', terms: '30 terms' },
  { id: 'Appearance', imageName: 'images/populars/appearance.png', terms: '30 terms' },
  { id: 'Emotions', imageName: 'images/populars/emotions.png', terms: '30 terms' },
];

const PopularsScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [animationsPlayed, setAnimationsPlayed] = useState(false);

  const renderItem = ({ item, index }: { item: DataItem, index: number }) => (
    <Animatable.View
      animation={'slideInUp'}
      duration={1000}
      delay={index * 200}
      onAnimationEnd={() => setAnimationsPlayed(true)}
    >
      <TouchableOpacity
        style={[styles.box, selectedItem === item.id ? { borderColor: '#00e0ff' } : null]}
        onPress={() => {
          setSelectedItem(item.id);
        }}
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
      </TouchableOpacity>
    </Animatable.View>
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

export default PopularsScreen;
