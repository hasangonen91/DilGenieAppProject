import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        alignItems: 'center',
        alignSelf: 'center',
    },
    swipeContainer: {
        backgroundColor: '#020825',
        padding: width * 0.02,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.73,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#00e0ff',
    },
    header: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: '#FFF'
    },
    headerTr: {
        fontSize: width * 0.04,
        fontWeight: '400',
        marginBottom: height * 0.02,
        color: '#FFF'
    },
    image: {
        width: width * 0.75,
        height: height * 0.2,
        borderRadius: 8,
        marginBottom: height * 0.02,
        borderWidth: 1.5,
        borderColor: '#00e0ff',
    },
    text: {
        fontSize: width * 0.05,
        marginBottom: height * 0.01,
        color: '#FFFFFF'
    },
    translation: {
        fontSize: width * 0.045,
        marginBottom: height * 0.02,
        color: '#FFFFFF'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.8,
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.02,
        
    },
    answerButton: {
        backgroundColor: 'transparent',
        width: width * 0.3,
        height: height * 0.07,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00e0ff',
    },
    answerTrueButton: {
        borderColor: '#39FF14',
    },
    answerFalseButton: {
        borderColor: '#FF073A',
    },
    answerText: {
        color: '#FFF',
        fontSize: width * 0.045,
    },
    correct: {
        color: 'green',
        fontSize: width * 0.045,
        marginBottom: height * 0.01,
    },
    incorrect: {
        color: 'red',
        fontSize: width * 0.045,
        marginBottom: height * 0.01,
    },
    okButtonContainer: {
        width: width * 0.9,
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
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
        fontSize: width * 0.045,
        color: '#fff',
        fontWeight: '600',
    },
    okButtonDisabled: {
        borderColor: '#6082B6',
        opacity: 0.5,
    },
    okButtonTextDisabled: {
        color: '#6082B6',
    },
});

export default styles;
