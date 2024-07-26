import React, { useState, useEffect, useRef } from 'react';
import { View, Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Keyboard from './Keyboard';
import styles from './styles';
import HangmanTree from './HangmanTree';
import BackHeader from '../../../components/header/BackHeader';
import StartGameModal from '../../../components/modal/GameModal/StartModal';
import GameOverModal from '../../../components/modal/GameModal/GameOverModal';

interface Puzzle {
  answer: string;
  hint: string;
}

const HangmanGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [correct, setCorrect] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [lettersLeft, setLettersLeft] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [lives, setLives] = useState<number>(5);
  const [showStartModal, setShowStartModal] = useState<boolean>(true);
  const puzzleIndexRef = useRef<number>(0);
  const [keyboardResetTrigger, setKeyboardResetTrigger] = useState<number>(0);
  const [timer, setTimer] = useState<number>(160);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  const puzzles: Puzzle[] = [
    { answer: 'JAVASCRIPT', hint: 'A programming language' },
    { answer: 'PYTHON', hint: 'A popular programming language' },
    { answer: 'REACT', hint: 'A JavaScript library for building user interfaces' },
  ];

  const init = () => {
    const index = puzzleIndexRef.current % puzzles.length;
    const puzzle = puzzles[index];
    const answer = puzzle.answer.replace(/[^a-zA-Z]/g, ' ').trim();
    const hint = puzzle.hint;
    const lettersLeft = Array(answer.length).fill(' ');
    setAnswer(answer);
    setHint(hint);
    setCorrect(0);
    setWrong(0);
    setLettersLeft(lettersLeft);
    setInput('');
    setLives(5);
    setTimer(160);
    setShowGameOverModal(false);
    puzzleIndexRef.current += 1;
    setUsedLetters([]);
    setKeyboardResetTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const lettersLeft = Array(answer.length).fill(' ');
    setLettersLeft(lettersLeft);
  }, [answer]);

  useEffect(() => {
    if (!lettersLeft.includes(' ') && answer) {
      setUsedLetters([]);
    }
  }, [answer, lettersLeft]);

  const validate = (letter: string) => {
    let newUsedLetters = [...usedLetters, letter];
    let newCorrect = correct;
    let newWrong = wrong;
    let newLettersLeft = [...lettersLeft];
    let newScore = score;
    let newLives = lives;

    if (answer.toUpperCase().includes(letter)) {
      answer.toUpperCase().split('').forEach((value, index) => {
        if (value === letter) {
          newLettersLeft[index] = letter;
          newCorrect++;
        }
      });
    } else {
      newWrong++;
      newLives--;
    }

    if (newLettersLeft.join('').replace(/\*/g, ' ').toUpperCase() === answer.toUpperCase()) {
      newScore++;
      setScore(newScore);

      if (newScore > maxScore) {
        setMaxScore(newScore);
      }

      init();
    }

    if (newWrong > 4) {
      setShowGameOverModal(true);
    }

    setUsedLetters(newUsedLetters);
    setCorrect(newCorrect);
    setWrong(newWrong);
    setLettersLeft(newLettersLeft);
    setLives(newLives);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            setShowGameOverModal(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer]);

  useEffect(() => {
    const handleBackPress = () => {
      console.log('Geri düğmesine basıldı');
      // Additional back button handling logic here
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const renderDashes = () => {
    return (
      <View style={styles.dashes}>
        {lettersLeft.map((letter, index) => (
          <View style={styles.dashItemContainer} key={index}>
            {letter === '*' ? <Text style={styles.dashBlankItem}> </Text> : <Text style={styles.dashItem}>{letter}</Text>}
          </View>
        ))}
      </View>
    );
  };

  const renderHeartIcons = () => {
    const heartIcons = [];
    for (let i = 0; i < lives; i++) {
      heartIcons.push(<Icon key={i} name="heart" size={24} color="red" />);
    }
    return heartIcons;
  };

  return (
    <React.Fragment>
      <BackHeader title='Hangman' />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.heartContainer}>
            {renderHeartIcons()}
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Max Skor: {maxScore}</Text>
            <Text style={styles.scoreText}>Skor: {score}</Text>
            <Text style={styles.timerText}>Süre: {timer}</Text>
          </View>
        </View>
        <View style={styles.hangmanContainer}>
          <HangmanTree wrong={wrong} />
        </View>
        <View style={styles.dashesContainer}>
          {renderDashes()}
        </View>
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {hint}</Text>
        </View>
        <Keyboard onPressKey={validate} usedLetters={usedLetters} resetTrigger={keyboardResetTrigger} />
      </View>
      <StartGameModal visible={showStartModal} onStart={() => { setShowStartModal(false); init(); }} />
      <GameOverModal visible={showGameOverModal} onRestart={() => { setShowGameOverModal(false); init(); }} answer={answer} hint={hint} />
    </React.Fragment>
  );
};

export default HangmanGame;