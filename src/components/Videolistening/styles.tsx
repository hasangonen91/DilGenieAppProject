import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
    width: '100%',
    height: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  videoWrapper: {
    width: width,
    height: height * 0.32,
    backgroundColor: '#000',
  },
  categoryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1D28',
  },
  categoryPickerText: {
    color: '#FFD166',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryModalList: {
    backgroundColor: '#1A1D28',
    borderRadius: 12,
    margin: 20,
    padding: 8,
  },
  categoryOption: {
    padding: 14,
    borderRadius: 8,
  },
  categoryOptionText: {
    color: '#FFF',
    fontSize: 16,
  },
  infoArea: {
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8892B0',
    fontSize: 14,
    marginTop: 4,
  },
  transcriptBox: {
    backgroundColor: '#1A1D28',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  transcript: {
    color: '#E6E6E6',
    fontSize: 15,
    lineHeight: 22,
  },
  transcriptTr: {
    color: '#FFD166',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  playButton: {
    backgroundColor: '#EF476F',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 14,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionArea: {
    padding: 16,
  },
  questionText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  optionButton: {
    backgroundColor: '#1A1D28',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2A2F45',
  },
  optionText: {
    color: '#FFF',
    fontSize: 15,
  },
  nextButton: {
    backgroundColor: '#118AB2',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    color: '#06D6A0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  translateButton: {
    color: '#118AB2',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  hidden: {display: 'none'},
});

export default styles;
