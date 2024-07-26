import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/header/Header';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openInbox, openComposer } from 'react-native-email-link'; // Eklenen kısım
import Share from 'react-native-share';
import CustomModal from '../../../components/modal/Modal';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';

const MAX_POINTS = 100;

interface ProfileProps {
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [userDisplayName, setUserDisplayName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [showSettingsButtons, setShowSettingsButtons] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [points, setPoints] = useState<number>(10);

  const fill = (points / MAX_POINTS) * 100;


  const [isRotating, setIsRotating] = useState(true);
  const iconRef = useRef<Animatable.View | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(!isRotating);
    }, 7000);

    return () => clearInterval(interval);
  }, [isRotating]);




  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserDisplayName(user.displayName || 'John Doe');
      setUserEmail(user.email || 'johndoe@example.com');
    }
  }, []);

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      auth()
        .signOut()
        .then(() => navigation.navigate('Login'))
        .catch(err => console.log(err.message));
    } catch (error) {
      console.log('AsyncStorage Error:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (user && user.email) {
        const credential = auth.EmailAuthProvider.credential(user.email, 'USER_PASSWORD');
        await user.reauthenticateWithCredential(credential);
        Alert.alert(
          'Hesap Sil',
          'Hesabınızı silmek istediğinize emin misiniz?',
          [
            {
              text: 'İptal',
              style: 'cancel',
            },
            {
              text: 'Evet',
              onPress: async () => {
                await user.delete();
                await AsyncStorage.removeItem('userSession');
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        throw new Error('Kullanıcı e-posta adresi bulunamadı.');
      }
    } catch (error: any) {
      console.log('Delete Account Error:', error.code, error.message);
      Alert.alert('Hesap Silme Hatası', error.message);
    }
  };

  const changePassword = () => {
    // Şifre değiştirme işlemleri
    setShowSettingsButtons(false);
  };

  const updateProfileInfo = () => {
    // Profil bilgilerini güncelleme işlemleri
    setShowSettingsButtons(false);
  };

  const openSettings = () => {
    setShowSettingsButtons(!showSettingsButtons);
  };

  const shareProgress = async () => {
    try {
      const shareOptions = {
        message: 'Uygulamayı paylaş',
        url: 'https://example.com', // Uygulamanın URL'sini buraya ekleyin
      };
      await Share.open(shareOptions);
    } catch (error: any) {
      console.log('Paylaşma Hatası:', error.message);
    }
  };

  const provideFeedback = () => {
    openComposer({
      to: "dilgenieapp91@gmail.com",
      subject: "Support and Feedback",
      body: "Merhaba, lütfen geri bildiriminizi buraya yazın."
    });
  };

  const viewStatistics = () => {
    setIsModalVisible(!isModalVisible);
  };


  return (
    <React.Fragment>
      <Header title='Profile' />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.infoAndIconContainer}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.infoTitle}>Name:</Text>
              <Text style={styles.infoText}>{userDisplayName}</Text>
              <Text style={styles.infoTitle}>Email:</Text>
              <Text style={styles.infoText}>{userEmail}</Text>
            </View>
            <TouchableOpacity
              style={styles.icon}
              onPress={openSettings}
            >
              <Animatable.View
                ref={iconRef}
                animation={isRotating ? 'rotate' : undefined}
                easing="linear"
                iterationCount="infinite"
                duration={5000}
              //  style={styles.icon}
              >
                <Icon name="settings" size={32} color="#00e0ff" />
              </Animatable.View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            {showSettingsButtons && (
              <React.Fragment>
                <Animatable.View
                  animation="fadeInUp" delay={200}
                >
                  <TouchableOpacity onPress={changePassword} style={styles.button}>
                    <Icon name="lock" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Şifre Değiştir</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={updateProfileInfo} style={styles.button}>
                    <Icon name="edit" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Profil Güncelle</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </React.Fragment>
            )}
            <TouchableOpacity onPress={viewStatistics} style={styles.button}>
              <Icon name="bar-chart" size={24} color="#fff" />
              <Text style={styles.buttonText}>Statistics</Text>
            </TouchableOpacity>
            <CustomModal
              isVisible={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              modalContentStyle={{
                backgroundColor: '#020825',
                borderColor: '#5D3FD3',
                borderWidth: 1,

              }}
              modalContent={
                <View style={styles.circleContainer}>
                  <AnimatedCircularProgress
                    size={140}
                    width={3}
                    backgroundWidth={14}
                    fill={fill}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875"
                  >
                    {(fill) => <Text style={styles.points}>{Math.round((MAX_POINTS * fill) / 100)}</Text>}
                  </AnimatedCircularProgress>
                  <Text style={styles.progressText}>
                    <Text style={styles.labelText}>Progress:</Text> {points}/{MAX_POINTS}
                  </Text>
                </View>
              }
            />
            <TouchableOpacity onPress={shareProgress} style={styles.button}>
              <Icon name="share" size={24} color="#fff" />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={provideFeedback} style={styles.button}>
              <Icon name="feedback" size={24} color="#fff" />
              <Text style={styles.buttonText}>Support and Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} style={styles.button}>
              <Icon name="exit-to-app" size={24} color="#fff" />
              <Text style={styles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteAccount} style={[styles.button, styles.deleteButton]}>
              <Icon name="delete" size={24} color="#fff" />
              <Text style={styles.buttonText}>Hesabı Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Profile;