import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { checkInternetConnection } from '../../../helpers/net/netInfo';
import styles from './styles';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNames } from '../../../routes/routes.common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../types/navigation';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const SplashScreen: React.FC = () => {
  const animationProgress = useRef(new Animated.Value(0));
  const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          navigation.navigate(ScreenNames.BottomTab);
        } else {
          const isConnectedResult = await checkInternetConnection();
          setIsConnected(isConnectedResult ?? false);
          setTimeout(() => {
            if (isConnectedResult) {
              navigation.navigate(ScreenNames.Login);
            }
          }, 3000);
        }
      } catch (error) {
        console.log('AsyncStorage Error:', error);
      }
    };
    checkUserSession();
    BootSplash.hide();
  }, []);

  const refreshConnection = async () => {
    setIsLoading(true);
    setIsConnected(null);
    const isConnectedResult = await checkInternetConnection();
    setIsConnected(isConnectedResult ?? false);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  if (isConnected === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5D3FD3" />
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isConnected ? (
        <AnimatedLottieView
          source={require('../../../assets/animations/purplebubble.json')}
          style={{ width: '100%', height: '100%' }}
          progress={animationProgress.current}
          autoPlay
          loop
        />
      ) : (
        <>
          <AnimatedLottieView
            source={require('../../../assets/animations/NoInternet.json')}
            style={{ width: '100%', height: '100%' }}
            progress={animationProgress.current}
            autoPlay
            loop
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </>
      )}
      {!isConnected && (
        <TouchableOpacity onPress={refreshConnection} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Connection problem</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SplashScreen;