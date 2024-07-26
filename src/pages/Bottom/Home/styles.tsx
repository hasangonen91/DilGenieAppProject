import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
    },
    headerContainer: {
        width: width,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    wordAndNameContainer:{
        flexDirection: 'column', 
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',

        alignItems: 'center',
        width: width ,
        height: height * 0.2,
    },
    nameContainer:{
        alignItems:'center',
        justifyContent: 'space-around', 
        backgroundColor:'transparent',
        width: width * 0.9,
        height: height * 0.2,
        bottom:10,
    },
    morningHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: width * 0.9,
        height: height * 0.07,
        backgroundColor: 'transparent',
        
    },
    
    progressText: {
        color: "#00e0ff",
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    wordList: {
        width: width * 0.9,
        height: height * 0.14,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5D3FD3',
        borderWidth: 1,
        borderRadius: 8,
        
    },
    wordItem: {
        fontSize: 18,
        color: "#fff",
        textAlign:'center'
    },
    labelText: {
        color: "#fff",
        textAlign: 'center'

    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignContent: 'center',
        alignSelf: 'center',
        width: width*0.915,
        height: height * 0.065,
     //   borderColor: '#5D3FD3',
      //  borderWidth: 1,
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    tab: {
        width: width * 0.45,
        height: height * 0.065,
        paddingVertical: 10,
       
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    tabText: {
        fontWeight: 'bold',
    },
    points: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 50,
        fontWeight: '100',
    },
   
    item: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: 'auto',
    },
    level: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    word: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#fff',
        textAlign:'center',
    },
    translation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',

    },
    example: {
        fontSize: 14,
        color: '#999999',
        marginTop: 5,
    },
});

export default styles;