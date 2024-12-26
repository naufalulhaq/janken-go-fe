import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import GestureButton from '../components/GestureButton';
import ScoreBoard from '../components/ScoreBoard';
import buttonRock from '../assets/button_batu_hand.png';
import buttonPaper from '../assets/button_kertas_hand.png';
import buttonScissors from '../assets/button_gunting_hand.png';
import Rock from '../assets/Rock.png';
import Paper from '../assets/Paper.png';
import Scissors from '../assets/Scissor.png';
import WIN from '../assets/WIN.png';
import LOSE from '../assets/LOSE.png';

const MultiPlayerScreen = ({ backgroundColor = '#008C47', roomID, playerID }) => {
  const [playerChoice, setPlayerChoice] = useState(null); // Player's gesture
  const [opponentChoice, setOpponentChoice] = useState(null); // Opponent's gesture
  const [sharedTimer, setSharedTimer] = useState(5); // Timer for the round
  const [roundResult, setRoundResult] = useState(null); // Win, Lose, or Draw
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [isRoundActive, setIsRoundActive] = useState(true);

  useEffect(() => {
    if (sharedTimer > 0 && !gameOver) {
      const countdown = setTimeout(() => setSharedTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (sharedTimer === 0 && isRoundActive) {
      finalizeRound();
    }
  }, [sharedTimer, isRoundActive, gameOver]);

  useEffect(() => {
    if (!isRoundActive && !gameOver) {
      const nextRoundTimer = setTimeout(startNextRound, 2000);
      return () => clearTimeout(nextRoundTimer);
    }
  }, [isRoundActive, gameOver]);

  const handleGesturePress = (gesture) => {
    if (!isRoundActive || gameOver) return;
    setPlayerChoice(gesture);

    // Notify the backend of the player's choice
    // Example: socket.emit('player_choice', { roomID, playerID, gesture });
  };

  const finalizeRound = () => {
    if (!playerChoice || !opponentChoice) return;

    const result = determineWinner(playerChoice, opponentChoice);
    setRoundResult(result);
    updateScores(result);
    setIsRoundActive(false);
  };

  const startNextRound = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setRoundResult(null);
    setSharedTimer(5);
    setIsRoundActive(true);

    // Notify the backend to reset round state
    // Example: socket.emit('start_next_round', { roomID });
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
      setOpponentScore((prev) => {
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
    <View style={[styles.container]}>
      <View style={[styles.scoreBoard, styles.opponentScore]}>
        <ScoreBoard score={opponentScore} />
      </View>
      <View style={[styles.scoreBoard, styles.playerScore]}>
        <ScoreBoard score={playerScore} />
      </View>

    {/* Text  place holder buat bgcolor, sampe sekarang belum bisa tanpa ini*/}

    <Text style={styles.text}>Welcome to Rock Paper Scissors!/////..</Text>

      <Text style={styles.idText}>Room ID: {roomID}</Text>
      <Text style={styles.idText}>Player ID: {playerID}</Text>

      <View style={styles.timerContainer}>
        {sharedTimer > 0 && <Text style={styles.timerText}>{sharedTimer}</Text>}
      </View>

      <View style={styles.gestureContainer}>
        {playerChoice && (
          <Image
            source={gestureImages[playerChoice]}
            style={[styles.selectedGestureImage]}
            resizeMode="contain"
          />
        )}
        {opponentChoice && (
          <Image
            source={gestureImages[opponentChoice]}
            style={[styles.gestureImage, { transform: [{ rotate: '180deg' }] }]}
            resizeMode="contain"
          />
        )}
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
            disabled={!isRoundActive || gameOver}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the container fills the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008C47', // Default background color
      },
  text: {
    fontSize: 24,
    color: '#008C47',
    backgroundColor: 'black'
  },

  idText:{
    fontSize: 30,
    color: 'white',
    backgroundColor: 'black'
  },
  scoreBoard: {
    position: 'absolute',
  },
  opponentScore: {
    top: 325,
    left: 0,
    backgroundColor:'#95B9D1',
    padding:10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
    },

  playerScore: {
    bottom: 340,
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
  selectedGestureContainer2: {
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
    top: '200',
    backgroundColor: 'black'
  },
  selectedGestureImageOpp: {
    width: 400,
    height: 400,
    bottom: '255',
    backgroundColor: 'black'
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
    top: '30%',
    width: 300,
    height: 300,
  },

  
  timerText: { fontSize: 36, color: '#fff', fontWeight: 'bold', backgroundColor: '' },

  gestureImage: { width: 100, height: 100 },

  gestureButton: { width: 80, height: 80, margin: 10 },


});

export default MultiPlayerScreen;
