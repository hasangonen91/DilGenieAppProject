import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        height: height * 0.07,
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        zIndex: 1,
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
        color: '#000',
    },
    timerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    contentContainer: {
        paddingTop: height * 0.07 + 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    countryImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    optionsContainer: {
        width: width * 0.8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#e3e3e3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: width * 0.6,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
});

export default styles;
