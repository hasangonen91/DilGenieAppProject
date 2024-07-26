import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: width * 0.05,
    },
    videoContainer: {
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    video: {
        alignSelf: 'center',
        width: width * 0.6,
        height: height * 0.25,
        backgroundColor: '#020825',
        borderColor: '#5D3FD3',
        borderRadius: 10,
        borderWidth: 1,
        shadowColor: '#00e0ff',
        shadowOpacity: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    headingContainer: {
        marginBottom: height * 0.02,
    },
    heading: {
        fontSize: width * 0.08,
        color: '#fff',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: height * 0.02,
    },
    label: {
        color: '#fff',
        marginBottom: height * 0.01,
        fontSize: width * 0.04,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: width * 0.03,
        color: '#fff',
        backgroundColor: '#020825',
        fontSize: width * 0.04,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    passwordInput: {
        flex: 1,
        padding: width * 0.03,
        color: '#fff',
        fontSize: width * 0.04,
    },
    visibilityIcon: {
        padding: width * 0.03,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        height: height * 0.06,
        backgroundColor: 'transparent',
    },
    checkbox: {
        marginRight: width * 0.02,
    },
    termsTextContainer: {
        flex: 1,
    },
    termsText: {
        fontSize: 16,
        color: '#fff',
    },
    termsAndForgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'transparent',
    },
    forgotPasswordContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#5D3FD3',
    },
    buttonContainer: {
        width: width * 0.9,
        height: height * 0.06,
        backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        padding: width * 0.04,
        marginVertical: height * 0.02,
        borderRadius: 10,
        backgroundColor: '#5D3FD3',
        borderWidth:0.5,
        borderColor:'#00e0ff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00e0ff',
        shadowOpacity: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    signupLink: {
        marginVertical: height * 0.02,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: width * 0.04,
    },
    googleButton: {
        flexDirection: 'row',
        padding: width * 0.04,
        marginVertical: height * 0.02,
        backgroundColor: '#020825',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#00e0ff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00e0ff',
        shadowOpacity: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    googleButtonText: {
        color: '#5D3FD3',
        fontSize: width * 0.05,
        marginLeft: width * 0.02,
        fontWeight: 'bold',
    },
});

export default styles;
