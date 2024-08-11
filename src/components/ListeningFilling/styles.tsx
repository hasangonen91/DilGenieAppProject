import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    listenButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    listenButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    questionText: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 40,
    },
    textInput: {
        width: '80%',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    fullSentenceText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    translationButton: {
        backgroundColor: '#ffc107',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    translationButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    translationText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#6c757d',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    nextButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
});

export default styles