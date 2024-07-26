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
    
    congratulationsText: {
        fontSize: 18,
        color: '#fff', 
        textAlign: 'center',
    },
});

export default styles;
