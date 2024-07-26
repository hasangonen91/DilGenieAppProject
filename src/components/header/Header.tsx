import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface HeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const Header: React.FC<HeaderProps> = ({ title, backgroundColor = '#020825', textColor = '#fff' }) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.imageContainer}>
        <View
          style={[styles.middleImage, { borderWidth: 0 }]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.middleImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#5D3FD3',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  textContainer: {
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
});

export default Header;

