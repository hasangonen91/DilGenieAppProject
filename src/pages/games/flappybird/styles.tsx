import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  bird: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  pipeContainer: {
    position: 'absolute',
  },
  pipe: {
    width: 80,
    tintColor: '#green',
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  scoreText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameOverContainer: {
    position: 'absolute',
    top: height / 3,
    alignItems: 'center',
    width: width,
  },
  gameOverText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  flapButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
});
