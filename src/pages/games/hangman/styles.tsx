import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        alignItems: 'center',
      //  justifyContent: 'center',
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
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color:'#FFF'
    },
    timerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF'

    },
    hangmanContainer: {
        width: width,
        height: height*0.25,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    dashesContainer:{
        width: width,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    startGameBtn: {
        color: '#841584',
        fontSize: 25,
        margin: 10,
    },
    dashes: {
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    dashItemContainer: {
        flex: 0,
        padding: 5,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dashItem: {
        width: 20,
        color: '#FFF',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    
    hintContainer: {
        backgroundColor: '#020825',
        width: width,
        height: height * 0.1,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor: '#5D3FD3',
        borderRadius:8,
    },
    hintText: {
        fontSize: 18,
        fontWeight: '500',
        color:'#FFF'
    },

    dashBlankItem:{
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },

    keyboard: {
        width: width,
        height: height * 0.28,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'column',
    },
    keyboardRow: {
        width:width,
        height:height*0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    keyItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.09,
        height: height * 0.05,
        borderRadius:10,
        margin: 2,
        backgroundColor: '#020825',
        borderWidth: 1,
        borderColor: '#fff',
    },
    usedKeyBorder:{
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.09,
        height: height * 0.05,
        borderRadius: 10,
        margin: 2,
        borderWidth: 1,
        borderColor: '#5D3FD3',
    },
    usedKey: {
        color: '#5D3FD3',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        color: '#fff',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
    },
    
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -width * 0.475 }, { translateY: -height * 0.1 }],
        width: width * 0.95,
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#020825',
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
    },
    startButton: {
        backgroundColor: '#841584',
        borderRadius: 8,
        width: width * 0.7,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restartButton: {
        backgroundColor: '#841584',
        borderRadius: 8,
        width: width * 0.7,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default styles;
