import React from 'react';
import { Text, TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';  // Shadow bileşenini içe aktarın

const { width, height } = Dimensions.get('window');

const shadowOpt = {
  width: width * 0.8,
  height: 50,
  color: "#000",
  border: 10,
  radius: 10,
  opacity: 0.3,
  x: 0,
  y: 6,
};

interface ShadowButtonProps {
  onPress: () => void;
  title: string;
}

const ShadowButton: React.FC<ShadowButtonProps> = ({ onPress, title }) => (
  <View style={styles.shadowContainer}>
    <Shadow {...shadowOpt} startColor={'#00e0ff'} endColor={'#ff00ff10'} offset={[3, 4]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Shadow>

  </View>
);

const styles = StyleSheet.create({
  shadowContainer: {
    width: width * 0.8, 
    alignSelf: 'center',
    marginVertical: Dimensions.get('window').height * 0.02,
  },
  button: {
    width: width * 0.8,
    padding: width * 0.04,
    marginVertical: height * 0.02,
    borderRadius: 10,
    backgroundColor: '#5D3FD3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default ShadowButton;
