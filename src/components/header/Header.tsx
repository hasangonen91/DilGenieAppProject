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
    height: height * 0.08, // Yüksekliği ekranın %8'i olarak ayarladık
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#00e0ff',
    borderBottomWidth: 1,
    paddingHorizontal: 4, // Kenarlardan boşluk ekledik
  },
  textContainer: {
    flex: 1, // Bu şekilde metin ortalanabilir
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.05, // Başlık font boyutunu ekran genişliğine göre ayarladık
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: width * 0.12, // Resim kapsayıcısının genişliğini ekran genişliğine göre ayarladık
    height: width * 0.12, // Yüksekliği genişliğe eşit tutarak dairesel görünüm elde ettik
    borderRadius: width * 0.018, // Dairesel görünüm için yarı çap
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.018, 
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
});

export default Header;
