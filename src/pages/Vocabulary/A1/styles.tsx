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
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#ffffff',
    },
    congratulationsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 20,
    },
    indicatorContainer:{
        width:width,
        height:height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#020825',
    },
});

export default styles;
