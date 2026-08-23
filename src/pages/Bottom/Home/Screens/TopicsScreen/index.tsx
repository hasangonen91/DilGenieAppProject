import React, {useState, useEffect} from 'react';
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
  {id: 'Nature', imageName: 'images/topics/nature.png', terms: '30 terms'},
  {id: 'Science', imageName: 'images/topics/science.jpg', terms: '30 terms'},
  {id: 'Arts', imageName: 'images/topics/arts.png', terms: '30 terms'},
  {id: 'Travel', imageName: 'images/topics/travel.png', terms: '30 terms'},
  {
    id: 'Daily Life',
    imageName: 'images/topics/dailyLife.png',
    terms: '30 terms',
  },
  {
    id: 'Lifestyle',
    imageName: 'images/topics/lifeStyle.png',
    terms: '30 terms',
  },
];

const TopicsScreen: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 20000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

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
        <View style={styles.imageWrap}>
          <FastImage
            style={styles.image as any}
            source={{
              uri: getImageURL(item.imageName),
              priority: FastImage.priority.high,
            }}
          />
          {/* Alt kısım için koyu degrade — yazılar her görselde okunur */}
          <LinearGradient
            colors={['transparent', 'rgba(2, 8, 37, 0.92)']}
            style={styles.imageOverlay}
          />
          {wordCount > 0 && (
            <View style={styles.countBadge}>
              <Icon name="layers-outline" size={11} color="#020825" />
              <Text style={styles.countBadgeText}>{wordCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.text} numberOfLines={1}>
            {item.id}
          </Text>
          <View style={styles.subRow}>
            <Icon name="book-outline" size={11} color="#00e0ff" />
            <Text style={styles.subText}>{wordCount} kelime</Text>
          </View>
        </View>

        {/* Sağ alt köşe ok — tıklanabilirlik ipucu */}
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
  countBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#00e0ff',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countBadgeText: {
    color: '#020825',
    fontSize: 10,
    fontWeight: 'bold',
  },
  textWrap: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
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

export default TopicsScreen;
