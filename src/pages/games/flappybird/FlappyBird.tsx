import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const FlappyBird: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [birdY, setBirdY] = useState(0);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Array<{x: number; gapY: number}>>([]);
  const [animationRunning, setAnimationRunning] = useState(false);

  const jump = () => {
    setBirdVelocity(-8);
  };

  useEffect(() => {
    if (isGameOver || !animationRunning) return;
    setBirdVelocity((prev) => prev + 0.5);
    setBirdY((prev) => prev + birdVelocity);
    setPipes((prevPipes) =>
      prevPipes.map((pipe) => {
        const newX = pipe.x - 3;
        if (newX < -80) {
          const newPipe = { x: 300, gapY: Math.random() * 200 + 100 };
          setPipes((prev) => [...prev, newPipe]);
          setScore((prev) => prev + 1);
          return newPipe;
        }
        return { x: newX, gapY: pipe.gapY };
      }).filter((pipe) => pipe.x > -100)
    );
  }, [animationRunning, isGameOver]);

  const startGame = () => {
    setBirdY(0);
    setBirdVelocity(0);
    setPipes([
      { x: 300, gapY: Math.random() * 200 + 100 },
    ]);
    setIsGameOver(false);
    setScore(0);
    setAnimationRunning(true);
  };

  const checkCollision = (): boolean => {
    return pipes.some((pipe) => {
      const birdTop = birdY;
      const birdBottom = birdY + 50;
      const pipeTop = pipe.gapY - 200;
      const pipeBottom = pipe.gapY + 200;
      return (
        birdY > pipeTop && birdY < pipeBottom
      );
    }) || birdY > 400 || birdY < 0;
  };

  return (
    <View style={styles.container} onTouchEnd={jump}>
      <Animated.View style={[styles.bird, { top: birdY }]} />
      {pipes.map((pipe, index) => (
        <View key={index} style={pipeStyle({ x: pipe.x, gapY: pipe.gapY })} />
      ))}
      <Text style={styles.score}>{score}</Text>
      {isGameOver && (
        <TouchableOpacity onPress={startGame} style={styles.restartBtn}>
          <Text style={styles.restartText}>Yeniden Başla</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const pipeStyle = (props: { x: number; gapY: number }) => ({
  width: 80,
  height: props.gapY - 200,
  backgroundColor: '#2Ecc71',
  position: 'absolute' as const,
  left: props.x,
  top: 0,
});

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 600,
    backgroundColor: '#70A1C4',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bird: {
    width: 50,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 25,
    position: 'absolute',
    left: 50,
  },
  restartBtn: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  score: {
    position: 'absolute',
    top: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  restartText: {
    color: '#70A1C4',
    fontWeight: 'bold',
  },
});

export default FlappyBird;