import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#020825',
    },
    circleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: "#fff",
        textAlign: 'center'
    },
    points: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 50,
        fontWeight: '100',
    },
    progressText: {
        color: "#00e0ff",
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    userInfoContainer: {
        marginBottom: 10,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection:'column',
    },
    infoAndIconContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
  
    infoTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color:'#fff',
        textAlign:'left',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#fff'
    },

    icon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5D3FD3',
        alignItems:'center',
        justifyContent:'center',
        
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#5D3FD3',
        width: width * 0.7,
        height: height * 0.07,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5D3FD3',
        borderWidth: 1,
    },
    deleteButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    imageContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5D3FD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
