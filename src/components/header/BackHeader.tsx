import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface HeaderProps {
    title: string;
    backgroundColor?: string;
    textColor?: string;
    onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, backgroundColor = '#020825', textColor = '#fff', onBackPress }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.header, { backgroundColor }]}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Icon name="chevron-left" size={24} color={textColor} />
            </TouchableOpacity>
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
        width: '100%',
        height: height * 0.1, // Başlık yüksekliğini ekranın %10'u olarak ayarladık
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#00e0ff',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10, // Kenarlardan boşluk ekledik
    },
    textContainer: {
        flex: 1, // Metin ortalanabilir
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
    backButton: {
        paddingHorizontal: 10,
    },
});

export default Header;
