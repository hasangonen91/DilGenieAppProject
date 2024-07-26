import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: width * 0.8,
        padding: width * 0.04,
        marginVertical: height * 0.02,
        borderRadius: 10,
        backgroundColor: '#5D3FD3',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
});

export default styles;
