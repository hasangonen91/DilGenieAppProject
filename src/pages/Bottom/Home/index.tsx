import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TopicsScreen from './Screens/TopicsScreen';
import PopularsScreen from './Screens/PopularsScreen';
import styles from './styles';
import localStyles from './homeStyles';
import Screen from '../../../components/screen/Screen';
import {fetchData} from '../../../services/api/base';
import {getAuth} from '@react-native-firebase/auth';

interface TabButtonProps {
  title: string;
  onPress: () => void;
  isActive: boolean;
}

interface Word {
  word: string;
  translation: string;
  level: string;
}

const Home = ({route}: any) => {
  const [activeTab, setActiveTab] = useState<'Topics' | 'Populars'>('Topics');
  const [randomWord, setRandomWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDisplayName, setUserDisplayName] = useState('');

  const now = new Date();
  const hour = now.getHours();

  let message;
  if (hour >= 6 && hour < 12) {
    message = 'Good Morning!';
  } else if (hour >= 12 && hour < 18) {
    message = 'Good Afternoon!';
  } else if (hour >= 18 && hour < 24) {
    message = 'Good Evening!';
  } else {
    message = 'Good Night!';
  }

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setUserDisplayName(user.displayName || 'John Doe');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchRandomWord, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchRandomWord = async () => {
    setLoading(true);
    const data = await fetchData();
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomWord(data[randomIndex]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const TabButton = ({title, onPress, isActive}: TabButtonProps) => (
    <TouchableOpacity
      style={[
        styles.tab,
        {
          borderWidth: isActive ? 2 : 1,
          borderColor: isActive ? '#00e0ff' : '#5D3FD3',
          backgroundColor: isActive ? '#020825' : 'transparent',
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.tabText, {color: '#FFFFFF'}]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <Screen>
      {/* Kompakt header — greeting + günlük kelime kartı */}
      <View style={localStyles.headerBlock}>
        <Text style={localStyles.greeting}>
          {message}
          {userDisplayName ? `, ${userDisplayName}` : ''}
        </Text>

        <View style={localStyles.wordCard}>
          <View style={localStyles.levelChip}>
            <Text style={localStyles.levelChipText}>
              {loading ? '...' : `LEVEL ${randomWord?.level ?? '-'}`}
            </Text>
          </View>
          {loading ? (
            <Text style={localStyles.loadingText}>Loading...</Text>
          ) : randomWord ? (
            <View style={localStyles.wordRow}>
              <Text style={localStyles.word}>{randomWord.word}</Text>
              <Text style={localStyles.eq}>=</Text>
              <Text style={localStyles.translation}>
                {randomWord.translation}
              </Text>
            </View>
          ) : (
            <Text style={localStyles.loadingText}>No data available</Text>
          )}
        </View>
      </View>

      {/* Sekmeler */}
      <View style={localStyles.tabContainer}>
        <TabButton
          title="Topics"
          onPress={() => setActiveTab('Topics')}
          isActive={activeTab === 'Topics'}
        />
        <TabButton
          title="Populars"
          onPress={() => setActiveTab('Populars')}
          isActive={activeTab === 'Populars'}
        />
      </View>

      {/* İçerik — yukarıdan başlar, ortada asılı kalmaz */}
      <View style={localStyles.contentArea}>
        {activeTab === 'Topics' && <TopicsScreen />}
        {activeTab === 'Populars' && <PopularsScreen />}
      </View>
    </Screen>
  );
};

export default Home;
