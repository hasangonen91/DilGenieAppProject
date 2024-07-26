import React, { useState, useRef, useCallback } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../../../components/modal/Modal';
import { GoogleSvg } from '../../../../assets';
import { ScreenNames } from '../../../../routes/routes.common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApplicationStackParamList } from '../../../../types/navigation';

const { width } = Dimensions.get('window');

const Signup = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [policyContent, setPolicyContent] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ApplicationStackParamList>>();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Define refs with explicit type
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const singupSubmit = () => {
    if (!values.email || !values.password || !values.confirmPassword || !values.name) {
      Alert.alert("Lütfen tüm alanları doldurunuz.");
      return;
    }
    if (values.password !== values.confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        res.user.updateProfile({ displayName: values.name });
        console.log("user Created Successfully!");
        setValues({ name: '', email: '', password: '', confirmPassword: '' });
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error.message));
  };

  const fetchPolicyContent = () => {
    const content = '1. Terms of Service\n2. Privacy Policy';
    setPolicyContent(content);
  };

  const toggleModal = () => {
    fetchPolicyContent();
    setIsModalVisible(!isModalVisible);
  };

  const updateInputval = (val: string, key: keyof typeof values) => {
    setValues(prevState => ({ ...prevState, [key]: val }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Define focus functions with null checks
  const focusNextField = useCallback((ref: React.RefObject<TextInput>) => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Sign Up</Text>
              <Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.middleImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name & Surname</Text>
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad Giriniz"
                value={values.name}
                onChangeText={(text) => updateInputval(text, 'name')}
                returnKeyType="next"
                onSubmitEditing={() => focusNextField(emailInputRef)}
                ref={nameInputRef}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={values.email}
                onChangeText={(text) => updateInputval(text, 'email')}
                returnKeyType="next"
                onSubmitEditing={() => focusNextField(passwordInputRef)}
                ref={emailInputRef}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre Giriniz"
                  secureTextEntry={!passwordVisible}
                  value={values.password}
                  onChangeText={(text) => updateInputval(text, 'password')}
                  returnKeyType="next"
                  onSubmitEditing={() => focusNextField(confirmPasswordInputRef)}
                  ref={passwordInputRef}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityIcon}>
                  <Icon
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color={passwordVisible ? '#5D3FD3' : '#ccc'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre Onayla"
                  secureTextEntry={!confirmPasswordVisible}
                  value={values.confirmPassword}
                  onChangeText={(text) => updateInputval(text, 'confirmPassword')}
                  returnKeyType="done"
                  ref={confirmPasswordInputRef}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.visibilityIcon}>
                  <Icon
                    name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color={confirmPasswordVisible ? '#5D3FD3' : '#ccc'}
                  />
                </TouchableOpacity>
              </View>
            </View>

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
                  I read and accept{' '}
                  <Text
                    style={styles.termsLink}
                    onPress={toggleModal}
                  >
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={styles.termsLink}
                    onPress={toggleModal}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>

            <CustomModal
              isVisible={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
              modalContent={<Text style={styles.policyText}>{policyContent}</Text>}
            />

            <TouchableOpacity
              onPress={singupSubmit}
              style={styles.button}>
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNames.Login)}
              style={styles.signupLink}
            >
              <Text style={[styles.text, styles.signupLinkText]}>
                Do you have an account?{' '}
              </Text>
              <Text style={[styles.text, styles.signupLinkTextHighlight]}>Login</Text>
            </TouchableOpacity>

            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.lineText}>or sign up with</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.googleButton}>
              <GoogleSvg width={width * 0.06} height={width * 0.06} />
              <Text style={styles.googleButtonText}>Sign In with Google</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
