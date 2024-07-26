import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { GoogleSvg } from '../../../../assets';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenNames } from '../../../../routes/routes.common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../../types/navigation';
import styles from './styles';
import ShadowButton from '../../../../components/button/ShadowButton';

const { width } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('hasan@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          navigation.navigate('BottomTab', {
            screen: 'Home',
            params: {
              uid: JSON.parse(userSession).uid,
              displayName: null
            },
          });
        }
      } catch (error) {
        console.log('AsyncStorage Error:', error);
      }
    };
    checkUserSession();
  }, []);

  const loginSubmit = () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        setEmail('');
        setPassword('');

        AsyncStorage.setItem('userSession', JSON.stringify(res.user));

        navigation.navigate('BottomTab', {
          screen: 'Home',
          params: { uid: res.user.uid, displayName: res.user.displayName },
        });
      })
      .catch(error => console.log(error.message));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.videoContainer}>
              <Video
                style={styles.video}
                source={require('../../../../assets/video/retrobot.mp4')}
                resizeMode="cover"
                muted={true}
                paused={false}
                repeat={false}
                playInBackground={false}
                playWhenInactive={false}
              />
            </View>

            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Login</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityIcon}>
                  <Icon
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color={passwordVisible ? '#5D3FD3' : '#ccc'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.termsAndForgotContainer}>
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  onPress={() => setTermsAccepted(!termsAccepted)}
                  style={styles.checkbox}
                >
                  {termsAccepted ? (
                    <Icon name="checkbox-marked-outline" size={width * 0.06} color="#5D3FD3" />
                  ) : (
                    <Icon name="checkbox-blank-outline" size={width * 0.06} color="#ccc" />
                  )}
                </TouchableOpacity>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    Rebember me
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {/* Handle forgot password */ }} style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>


            <TouchableOpacity onPress={loginSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNames.Register)}
              style={styles.signupLink}
            >
              <Text style={[styles.text, { color: '#5D3FD3' }]}>
                Don't have an account?{'\t'}
              </Text>
              <Text style={[styles.text, { color: '#fff' }]}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
              <GoogleSvg width={24} height={24} />
              <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;