// BoxItem.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import { getImageURL } from '../../services/api/base';

interface DataItem {
    id: string;
    imageName: string;
    terms: string;
}

interface BoxItemProps {
    item: DataItem;
    selectedIndex: string | null;
    onPress: (id: string) => void;
    isCurrent: boolean;
    animationType: string; // animationType prop'u string olarak güncellendi
}

const BoxItem: React.FC<BoxItemProps> = ({ item, selectedIndex, onPress, isCurrent, animationType }) => {
    return (
        <TouchableOpacity
            style={[styles.box, selectedIndex === item.id ? { borderColor: '#00e0ff' } : null]}
            onPress={() => onPress(item.id)}
        >
            <Animatable.View
                style={styles.boxContent}
                animation={animationType} // animationType prop'u burada kullanılıyor
                duration={1000}
            >
                <FastImage
                    style={styles.image}
                    source={{
                        uri: getImageURL(item.imageName),
                        priority: FastImage.priority.high,
                    }}
                />
                <View style={styles.line} />
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.subText}>{item.terms}</Text>
            </Animatable.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box: {
        width: '45%',
        height: 200,
        margin: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5D3FD3',
    },
    image: {
        width: '100%',
        height: '75%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    boxContent: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    subText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    line: {
        width: '100%',
        backgroundColor: '#5D3FD3',
        height: 2,
    },
});

export default BoxItem;
