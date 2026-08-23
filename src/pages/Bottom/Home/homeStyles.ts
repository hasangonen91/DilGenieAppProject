import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

// Home ekranının yeni kompakt header stilleri
const homeStyles = StyleSheet.create({
  headerBlock: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 12,
  },
  greeting: {
    color: '#00e0ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  wordCard: {
    marginTop: 10,
    backgroundColor: 'rgba(93, 63, 211, 0.12)',
    borderColor: 'rgba(93, 63, 211, 0.7)',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  levelChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 224, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.35)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  levelChipText: {
    color: '#00e0ff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  word: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  eq: {
    fontSize: 16,
    color: 'rgba(124, 139, 176, 0.7)',
    fontWeight: '600',
  },
  translation: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  loadingText: {
    color: '#8E9BC0',
    fontSize: 15,
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width - 36,
    marginBottom: 4,
  },
  contentArea: {
    flex: 1,
    alignItems: 'stretch',
  },
});

export default homeStyles;
