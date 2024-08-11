import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width*0.8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2C3E50',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    playButton: {
        backgroundColor: '#3498DB',
        padding: 15,
        borderRadius: 25,
        marginBottom: 20,
        minWidth: 150,
        alignItems: 'center',
    },
    playButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#ECF0F1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#2C3E50',
    },
    translationButton: {
        backgroundColor: '#2ECC71',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    translationButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    translationText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#7F8C8D',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    buttonContainer: {
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#3498DB',
        padding: 15,
        borderRadius: 25,
        minWidth: 150,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFDDDD',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    loadingText: {
        fontSize: 18,
        color: '#666666',
    },
});

export default styles