import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getImageURL} from '../../../../../services/api/base';
import FastImage from '@d11/react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import SlideUpModal from '../../../../../components/modal/SlideUpModal';
import TopicWordsList from '../../../../../components/topicWords/TopicWordsList';
import Screen from '../../../../../components/screen/Screen';
import {topicWords} from '../../../../../data/topicWords';

const {width, height} = Dimensions.get('window');

interface DataItem {
  id: string;
  imageName: string;
  terms: string;
}

const data: DataItem[] = [
  {
    id: 'Personality Adjectives',
    imageName: 'images/populars/Personality.png',
    terms: '30 terms',
  },
  {
    id: 'Phrasal Verbs with PUT',
    imageName: 'images/populars/put.png',
    terms: '30 terms',
  },
  {
    id: 'Phrasal Verbs with GET',
    imageName: 'images/populars/get.png',
    terms: '30 terms',
  },
  {
    id: 'Feelings',
    imageName: 'images/populars/feelings.png',
    terms: '30 terms',
  },
  {
    id: 'Appearance',
    imageName: 'images/populars/appearance.png',
    terms: '30 terms',
  },
  {
    id: 'Emotions',
    imageName: 'images/populars/emotions.png',
    terms: '30 terms',
  },
];

const PopularsScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const renderItem = ({item, index}: {item: DataItem; index: number}) => {
    const wordCount = topicWords[item.id]?.length ?? 0;
    return (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={Math.min(index * 90, 600)}
      useNativeDriver>
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.85}
        onPress={() => setSelectedItem(item.id)}>
        {/* Popüler rozeti — ilk iki kart */}
        {index < 2 && (
          <View style={styles.hotBadge}>
            <Icon name="flame" size={11} color="#FFFFFF" />
            <Text style={styles.hotBadgeText}>HOT</Text>
          </View>
        )}

        <View style={styles.imageWrap}>
          <FastImage
            style={styles.image as any}
            source={{
              uri: getImageURL(item.imageName),
              priority: FastImage.priority.high,
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(2, 8, 37, 0.92)']}
            style={styles.imageOverlay}
          />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.text} numberOfLines={2}>
            {item.id}
          </Text>
          <View style={styles.subRow}>
            <Icon name="trending-up" size={11} color="#00e0ff" />
            <Text style={styles.subText}>{wordCount} kelime</Text>
          </View>
        </View>

        <View style={styles.goArrow}>
          <Icon name="chevron-forward" size={13} color="#00e0ff" />
        </View>
      </TouchableOpacity>
    </Animatable.View>
    );
  };

  return (
    <Screen>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.container}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <SlideUpModal
        isVisible={selectedItem !== null}
        closeModal={() => setSelectedItem(null)}
        title={selectedItem || ''}
        subtitle={`${topicWords[selectedItem || '']?.length ?? 0} kelime • karta dokun, sesli dinle`}>
        {selectedItem ? (
          <TopicWordsList
            topic={selectedItem}
            onClose={() => setSelectedItem(null)}
            onLearn={() => {}}
          />
        ) : null}
      </SlideUpModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: width,
    backgroundColor: '#020825',
  },
  container: {
    width: width,
    backgroundColor: '#020825',
    paddingTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 20,
    alignItems: 'center',
  },
  box: {
    width: width * 0.42,
    height: height * 0.22,
    margin: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(93, 63, 211, 0.8)',
    backgroundColor: 'rgba(93, 63, 211, 0.08)',
    overflow: 'hidden',
  },
  hotBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#5D3FD3',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  hotBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  imageWrap: {
    width: '100%',
    height: '68%',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textWrap: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 17,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  subText: {
    color: '#00e0ff',
    fontSize: 11,
  },
  goArrow: {
    position: 'absolute',
    bottom: 8,
    right: 10,
  },
});

export default PopularsScreen;
