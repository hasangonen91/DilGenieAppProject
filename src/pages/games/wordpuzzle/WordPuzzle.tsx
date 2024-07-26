import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WORD = 'REACT'; // Tahmin edilmesi gereken kelime
const HINT = 'Bir JavaScript kütüphanesi.'; // Kullanıcıya verilen ipucu

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [shuffledWord, setShuffledWord] = useState(shuffleArray(WORD.split('')));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [guessedWord, setGuessedWord] = useState(Array(WORD.length).fill(''));

  const handleLetterPress = (letter, index) => {
    const newSelectedLetters = [...selectedLetters, { letter, index }];
    setSelectedLetters(newSelectedLetters);

    const newShuffledWord = [...shuffledWord];
    newShuffledWord.splice(index, 1);
    setShuffledWord(newShuffledWord);

    const newGuessedWord = [...guessedWord];
    const emptyIndex = newGuessedWord.indexOf('');
    newGuessedWord[emptyIndex] = letter;
    setGuessedWord(newGuessedWord);
  };

  const handleSelectedLetterPress = (letter, index) => {
    const newSelectedLetters = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelectedLetters);

    const newShuffledWord = [...shuffledWord, letter];
    setShuffledWord(newShuffledWord);

    const newGuessedWord = [...guessedWord];
    newGuessedWord[index] = '';
    setGuessedWord(newGuessedWord);
  };

  const checkWord = () => {
    if (guessedWord.join('') === WORD) {
      Alert.alert('Tebrikler!', 'Kelimeyi doğru buldunuz!');
      resetGame();
    } else {
      Alert.alert('Yanlış!', 'Lütfen tekrar deneyin.');
    }
  };

  const resetGame = () => {
    setSelectedLetters([]);
    setShuffledWord(shuffleArray(WORD.split('')));
    setGuessedWord(Array(WORD.length).fill(''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Puzzle</Text>
      <Text style={styles.hint}>İpucu: {HINT}</Text>
      <View style={styles.puzzleContainer}>
        {guessedWord.map((letter, index) => (
          <TouchableOpacity key={index} style={styles.puzzleBox} onPress={() => handleSelectedLetterPress(letter, index)}>
            <Text style={styles.puzzleLetter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.wordContainer}>
        {shuffledWord.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.letterBox}
            onPress={() => handleLetterPress(letter, index)}
          >
            <Text style={styles.letter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={checkWord}>
        <Text style={styles.buttonText}>Kontrol Et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Sıfırla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hint: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  puzzleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  puzzleBox: {
    margin: 5,
    padding: 10,
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
    minWidth: width / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  puzzleLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterBox: {
    margin: 5,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    minWidth: width / 7,
    alignItems: 'center',
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#841584',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
