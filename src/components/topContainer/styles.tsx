import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
   
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        height: height * 0.07,
        padding: 10,
    },
    heartContainer: {
        flexDirection: 'row',
    },
    heartText: {
        fontWeight:'bold',
        fontSize: 18,
        marginLeft: 5,
        color: '#FFE047',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#FFF'
    },
   
});

export default styles;
