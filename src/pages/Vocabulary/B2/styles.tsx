import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    progress: {
        margin: 10,
        width: '80%',
    },
    progressContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    teachContainer:{
        flex:1,
        width:width,
        height:height,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    swipeContainer: {
        backgroundColor: '#020825',
        padding: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.73,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#5D3FD3',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF'

    },
    image: {
        width: 280,
        height: 180,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: '#5D3FD3',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        color: '#FFF'

    },
    translation: {
        fontSize: 20,
        marginBottom: 20,
        color: '#FFF'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    answerButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    answerText: {
        color: '#FFF',
        fontSize: 18,
    },
    correct: {
        color: 'green',
        fontSize: 18,
        marginBottom: 10,
    },
    incorrect: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
    },
    nextButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
    },
    statsText: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
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
    finalCardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Arka plan rengi
    },
    finalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    finalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    finalButton: {
        backgroundColor: '#4CAF50', // Buton rengi
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    finalButtonText: {
        color: '#fff', // Buton metin rengi
        fontSize: 18,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', // Arka plan rengi beyaz olarak varsayalım
    },
    completionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        color: '#333', // Metin rengi koyu gri
    },
    restartButton: {
        backgroundColor: '#007AFF', // Buton rengi mavi tonu
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    restartButtonText: {
        fontSize: 18,
        color: '#fff', // Buton metin rengi beyaz
        textAlign: 'center',
    },
    congratulationsText: {
        fontSize: 18,
        color: '#fff', // Buton metin rengi beyaz
        textAlign: 'center',
    },
});

export default styles;
