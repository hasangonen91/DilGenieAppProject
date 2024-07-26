import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import TopicsScreen from './Screens/TopicsScreen';
import PopularsScreen from './Screens/PopularsScreen';
import styles from './styles';
import { fetchData } from '../../../services/api/base';
import auth from '@react-native-firebase/auth';


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

const Home = ({ route }: any) => {

  const [activeTab, setActiveTab] = useState<'Topics' | 'Populars'>('Topics');
  const [randomWord, setRandomWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDisplayName, setUserDisplayName] = useState('');


  const now = new Date();
  const hour = now.getHours();

  let message;
  if (hour >= 6 && hour < 12) {
    message = "Good Morning!";
  } else if (hour >= 12 && hour < 18) {
    message = "Good Afternoon!";
  } else if (hour >= 18 && hour < 24) {
    message = "Good Evening!";
  } else {
    message = "Good Night!";
  }


  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserDisplayName(user.displayName || 'John Doe');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchRandomWord, 60000); // 2 dakikada bir (1 * 60 * 1000 milisaniye)
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
  }, []); // İlk renderda çalıştır

  const TabButton = ({ title, onPress, isActive }: TabButtonProps) => (
    <TouchableOpacity
      style={[
        styles.tab,
        {
          borderWidth: isActive ? 2 : 1,
          borderColor: isActive ? '#00e0ff' : '#5D3FD3',
          backgroundColor: isActive ? '#020825' : 'transparent',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, { color: '#FFFFFF' }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>


        <View style={styles.wordAndNameContainer}>
          <View style={styles.nameContainer}>

            <View style={styles.morningHeader}>
              <Text style={styles.progressText}>
                {message}{"\t\t"}{userDisplayName}
              </Text>
            </View>

            <View style={styles.wordList}>

              {loading ? (
                <Text>Loading...</Text>
              ) : randomWord ? (
                <React.Fragment>
                  <Text style={styles.level}>Level{'\t'}={'\t'}{randomWord.level}</Text>
                  <View style={styles.item}>
                    <Text style={styles.word}>{randomWord.word}{'\t'}={'\t'}</Text>
                    <Text style={styles.translation}>{randomWord.translation}</Text>
                  </View>
                </React.Fragment>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
          </View>
        </View>
      </View>


      <View style={styles.tabContainer}>
        <TabButton title="Topics" onPress={() => setActiveTab('Topics')} isActive={activeTab === 'Topics'} />
        <TabButton title="Populars" onPress={() => setActiveTab('Populars')} isActive={activeTab === 'Populars'} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {activeTab === 'Topics' && <TopicsScreen />}
        {activeTab === 'Populars' && <PopularsScreen />}
      </View>
    </SafeAreaView>
  );
};

export default Home;
