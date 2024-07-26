import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const itemWidth = width / 7;
const interval = 3000; // 3 saniyede bir resim değişimi

const MyComponent = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [numColumns, setNumColumns] = useState(7); // Varsayılan olarak 7 sütunlu başlayın

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://picsum.photos/v2/list?page=1&limit=50'); // 50 resim çekmek için limit 50
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Resim çekme hatası:', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length); // Resim indeksini değiştir (döngüsel)
        }, interval);

        return () => clearInterval(timer); // Zamanlayıcıyı temizle
    }, [currentIndex, images.length]);

    const renderRow = ({ item, index }) => {
        const imageStyle = {
            ...styles.image,
            marginLeft: (index % numColumns === 0) ? 0 : 5, 
        };

        return (
            <Image
                style={imageStyle}
                source={{ uri: item.download_url }} 
                resizeMode="cover"
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderRow}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 10 }}
                key={`${numColumns}-${currentIndex}`} // FlatList'in key'ini güncelle ve yeniden render et
                removeClippedSubviews={false} // Görünmeyen taraftaki elemanların kaldırılmasını engelle
            />
            <TouchableOpacity style={styles.overlay} activeOpacity={1} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#020825',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Saydam karanlık renk
    },
    image: {
        width: itemWidth,
        height: itemWidth,
        borderRadius: 4,
        margin: 5,
        borderColor: '#5D3FD3',
        borderWidth: 1,
    },
});

export default MyComponent;
