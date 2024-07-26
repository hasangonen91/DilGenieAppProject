import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginRight: width * 0.02,
        color: '#FFF',
    },
    progressBar: {
        marginVertical: height * 0.02,
        marginBottom: height * 0.03,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: width * 0.05,
        fontWeight: '800',
        color: '#fff',
    },
    questionContainer: {
        backgroundColor: '#020825',
        padding: width * 0.02,
        borderRadius: width * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.7,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#5D3FD3',
    },
    questionText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02,
        color: '#FFFFFF',
    },
    instruction: {
        fontSize: width * 0.04,
        marginBottom: height * 0.01,
        color: '#fff',
    },
    sentence: {
        width: width * 0.9,
        height: height * 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sentenceText: {
        fontSize: width * 0.045,
        marginHorizontal: width * 0.02,
        color: '#fff',
    },
    blank: {
        width: width * 0.25,
        height: height * 0.05,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C2A33',
        borderRadius: 7,
    },
    selectedWord: {
        textAlign: 'center',
        color: '#fff',
        fontSize: width * 0.045,
    },
    optionContainer: {
        width: width * 0.8,
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    option: {
        backgroundColor: 'transparent',
        width: width * 0.23,
        height: height * 0.06,
        padding: 3,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00e0ff',
    },
    selectedOption: {
        borderColor: '#ff00e0',
    },
    optionText: {
        fontSize: width * 0.04,
        color: '#fff',
        fontWeight: '600',
    },
    okButtonContainer: {
        width: width * 0.9,
        height: height * 0.14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
    },
    okButton: {
        backgroundColor: 'transparent',
        width: width * 0.7,
        height: height * 0.07,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00e0ff',
    },
    okButtonText: {
        fontSize: width * 0.04,
        color: '#fff',
        fontWeight: '600',
    },
    congratulationsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    congratulationsText: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },
    congratulationsSubtext: {
        fontSize: width * 0.045,
        marginBottom: height * 0.03,
    },
    restartButton: {
        backgroundColor: '#4CAF50',
        padding: width * 0.04,
        borderRadius: 5,
    },
    restartButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
    },
    blankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.05,
        marginHorizontal: width * 0.02,
    },
    blankUnderline: {
        width: width * 0.9,
        height: 2,
        backgroundColor: '#ffffff',
    },
});

export default styles;
