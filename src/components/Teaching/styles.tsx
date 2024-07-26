import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF'
    },
    image: {
        width: 290,
        height: 190,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: '#00e0ff',
        resizeMode:'cover',
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
    okButtonContainer: {
        width: width * 0.9,
        height: height * 0.12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

export default styles;
