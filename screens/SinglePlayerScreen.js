import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import GestureButton from '../components/GestureButton';
import ScoreBoard from '../components/ScoreBoard';
// Import images
import buttonRock from '../assets/button_batu_hand.png';
import buttonPaper from '../assets/button_kertas_hand.png';
import buttonScissors from '../assets/button_gunting_hand.png';
import Rock from '../assets/Rock.png';
import Paper from '../assets/Paper.png';
import Scissors from '../assets/Scissor.png';
import WIN from '../assets/WIN.png';
import LOSE from '../assets/LOSE.png';

const SinglePlayerScreen = ({ backgroundColor = '#008C47' }) => {
  const [selectedGesture, setSelectedGesture] = useState(null);
  const [opponentGesture, setOpponentGesture] = useState(null);
  const [opponentChoosing, setOpponentChoosing] = useState(true); // Default true for initial countdown
  const [roundResult, setRoundResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [playerTimer, setPlayerTimer] = useState(5);
  const [opponentTimer, setOpponentTimer] = useState(3);
  const [isRoundActive, setIsRoundActive] = useState(true);

  // Player countdown
  useEffect(() => {
    if (isRoundActive && playerTimer > 0 && !selectedGesture) {
      const countdown = setTimeout(() => setPlayerTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (playerTimer === 0) {
      // Auto-select "Rock" if time runs out
      handleGesturePress('Rock');
    }
  }, [playerTimer, isRoundActive, selectedGesture]);

  // Opponent countdown
  useEffect(() => {
    if (opponentChoosing && opponentTimer > 0) {
      const countdown = setTimeout(() => setOpponentTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (opponentTimer === 0) {
      const opponentChoice = getRandomGesture();
      setOpponentGesture(opponentChoice);
      setOpponentChoosing(false); // Countdown ends
      const result = determineWinner(selectedGesture, opponentChoice);
      setRoundResult(result);
      updateScores(result);
      setIsRoundActive(false); // Round is over
    }
  }, [opponentTimer, opponentChoosing, selectedGesture]);

  const handleGesturePress = (gesture) => {
    if (!isRoundActive || selectedGesture) return;
    setSelectedGesture(gesture);
    setOpponentChoosing(true); // Begin opponent decision-making
    setOpponentTimer(3); // Reset opponent timer
  };

  const startNextRound = () => {
    setSelectedGesture(null);
    setOpponentGesture(null);
    setRoundResult(null);
    setPlayerTimer(5);
    setOpponentTimer(3);
    setOpponentChoosing(true); // Opponent starts choosing
    setIsRoundActive(true);
  };

  const getRandomGesture = () => {
    const gestures = ['Rock', 'Paper', 'Scissors'];
    return gestures[Math.floor(Math.random() * gestures.length)];
  };

  const determineWinner = (playerGesture, opponentGesture) => {
    if (playerGesture === opponentGesture) return 'Draw';
    if (
      (playerGesture === 'Rock' && opponentGesture === 'Scissors') ||
      (playerGesture === 'Paper' && opponentGesture === 'Rock') ||
      (playerGesture === 'Scissors' && opponentGesture === 'Paper')
    ) {
      return 'Win';
    }
    return 'Lose';
  };

  const updateScores = (result) => {
    if (result === 'Win') {
      setPlayerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) {
          setGameOver(true);
          setGameResult('WIN');
        }
        return newScore;
      });
    } else if (result === 'Lose') {
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) {
          setGameOver(true);
          setGameResult('LOSE');
        }
        return newScore;
      });
    }
  };

  const gestureImages = {
    Rock: Rock,
    Paper: Paper,
    Scissors: Scissors,
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Computer Score */}
      <View style={[styles.scoreBoard, styles.computerScore]}>
        <ScoreBoard score={computerScore} />
      </View>

      {/* Player Score */}
      <View style={[styles.scoreBoard, styles.playerScore]}>
        <ScoreBoard score={playerScore} />
      </View>

      <Text style={styles.text}>Welcome to Rock Paper Scissors!</Text>

      <View style={styles.selectedGestureContainer}>
        {isRoundActive && !selectedGesture ? (
          <Text style={styles.timerText}>{playerTimer}</Text>
        ) : (
          selectedGesture && (
            <Image
              source={gestureImages[selectedGesture]}
              style={[styles.selectedGestureImage]}
              resizeMode="contain"
            />
          )
        )}
      </View>

      <View style={styles.opponentGestureContainer}>
        {opponentChoosing ? (
          <Text style={styles.timerText}>{opponentTimer}</Text>
        ) : opponentGesture ? (
          <Image
            source={gestureImages[opponentGesture]}
            style={[styles.selectedGestureImageOpp, { transform: [{ rotate: '180deg' }] }]}
            resizeMode="contain"
          />
        ) : null}
      </View>

      {roundResult && !gameOver && (
        <Text style={styles.resultText}>
          {roundResult === 'Win' && 'You Won this Round!'}
          {roundResult === 'Lose' && 'You Lost this Round!'}
          {roundResult === 'Draw' && "It's a Draw!"}
        </Text>
      )}

      {gameOver && (
        <Image
          source={gameResult === 'WIN' ? WIN : LOSE}
          style={styles.gameResultImage}
          resizeMode="contain"
        />
      )}

      <View style={styles.buttonContainer}>
        {['Scissors', 'Paper', 'Rock'].map((gesture) => (
          <GestureButton
            key={gesture}
            imageSource={
              gesture === 'Rock'
                ? buttonRock
                : gesture === 'Paper'
                ? buttonPaper
                : buttonScissors
            }
            onPress={() => handleGesturePress(gesture)}
            disabled={!isRoundActive || !!selectedGesture}
            style={[
              selectedGesture === gesture && { backgroundColor: '#004E28' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#008C47',
  },
  scoreBoard: {
    position: 'absolute',
  },
  computerScore: {
    top: 325,
    left: 0,
    backgroundColor:'#95B9D1',
    padding:10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
    },

  playerScore: {
    bottom: 350,
    left: 0,
    padding:10,
    backgroundColor:'#95B9D1',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  selectedGestureContainer: {
    position: 'absolute',
    bottom: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  opponentGestureContainer: {
    position: 'absolute',
    bottom: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  selectedGestureImage: {
    width: 400,
    height: 400,
    top: '440',
  },
  selectedGestureImageOpp: {
    width: 400,
    height: 400,
    bottom: '255',
  },
  actionText: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    top: '150',
  },
  actionTextOpp: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    bottom: '300',
  },
  resultText: {
    position: 'absolute',
    top: '20%',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  gameResultImage: {
    position: 'absolute',
    top: '40%',
    width: 300,
    height: 300,
  },

  
  timerText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },

  gestureImage: { width: 100, height: 100 },

  gestureButton: { width: 80, height: 80, margin: 10 },


});

export default SinglePlayerScreen;
