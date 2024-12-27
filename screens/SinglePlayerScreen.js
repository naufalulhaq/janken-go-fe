import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import GestureButton from '../components/GestureButton';
import ScoreBoard from '../components/ScoreBoard';
import GameOverModal from '../components/GameOverModal';
import { createGameOffline, saveGame } from '../api/restApi';
import TitleContainer from '../components/TitleContainer';
// Import images
import buttonRock from '../assets/button_batu_hand.png';
import buttonPaper from '../assets/button_kertas_hand.png';
import buttonScissors from '../assets/button_gunting_hand.png';
import Rock from '../assets/Rock.png';
import Paper from '../assets/Paper.png';
import Scissors from '../assets/Scissor.png';
import WIN from '../assets/WIN.png';
import LOSE from '../assets/LOSE.png';
import DRAW from '../assets/DRAW.png';
import HEADER from '../assets/Rectangle 18.png'
import FOOTER from '../assets/Rectangle 17.png'
import { useNavigation } from "@react-navigation/native";



const SinglePlayerScreen = ({ backgroundColor = '#008C47' }) => {
  const [selectedGesture, setSelectedGesture] = useState(null); //state state yang digunain
  const [opponentGesture, setOpponentGesture] = useState(null);
  const [sharedTimer, setSharedTimer] = useState(5);
  const [roundResult, setRoundResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [isRoundActive, setIsRoundActive] = useState(true);
  const [gameData, setGameData] = useState({});
  const [playerChoices, setPlayerChoices] = useState([]);
  const [computerChoices, setComputerChoices] = useState([]);
  const [roundWinner, setRoundWinner] = useState([]);
  const [scoreAdded, setScoreAdded] = useState(0)

  const navigation = useNavigation()
  const createGame = useCallback(async () => {
    const data = await createGameOffline();
    setGameData (prev => prev = data.data);
  })

  useEffect(() => {
    createGame();
  }, []);

  useEffect(() => {
    if (gameOver) {
      saveGameData();
    }
  }, [gameOver]);
  

  
  const saveGameData = async () => {
    const payload = {
      id: gameData.id, // Assuming `gameData.id` holds the correct game ID
      rounds_played: playerChoices.length, // Total rounds played
      player1_wins: playerScore, // Player's score
      player2_wins: computerScore, // Computer's score
      player1_choices: playerChoices,
      player2_choices: computerChoices,
      rounds_winner_id: roundWinner,
    };
  
    try {
      const response = await saveGame(payload);
      //console.log('Game saved successfully:', response.data);
      setScoreAdded(prev => prev = response.data.player1_score)
    } catch (error) {
      console.error('Failed to save game:', error.message);
    }
  };
  

  useEffect(() => {
    if (sharedTimer > 0 && !gameOver) { // syarat buat countdown
      const countdown = setTimeout(() => setSharedTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (sharedTimer === 0 && isRoundActive) { //print gesture dari komputer
      const opponentChoice = getRandomGesture();
      setOpponentGesture(opponentChoice);
  
      const result = selectedGesture 
        ? determineWinner(selectedGesture, opponentChoice) //determine winner ngambil pilihan dari player
        : 'Lose';
  
      setRoundResult(result); //ngga kepake, tapi dibiarin aja dah
      updateScores(result); //ini buat scoring make komponen scoreboard, setplayerscore dan computerscore disimpen disini
      setIsRoundActive(false); // End the round kalo udah 0
    }
  }, [sharedTimer, isRoundActive, gameOver]);

  useEffect(() => { //beneran ngga kepake, tapi ditinggal aja disini
    if (!isRoundActive && !gameOver) { //timer buat next round
      const nextRoundTimer = setTimeout(startNextRound, 2000);
      return () => clearTimeout(nextRoundTimer);
    }
  }, [isRoundActive, gameOver]);


  const handleGesturePress = (gesture) => { //fungsi buat handle pilihan player, cuma berhenti kalau countdown berhenti, sama pas gameover
    if (!isRoundActive || gameOver) return;
    setSelectedGesture(gesture);
};

    
//     if (!isRoundActive || selectedGesture) return;
//     setSelectedGesture(gesture);
//   };

  const startNextRound = () => { //reset buat nextround, score nya di keep tapi
    setSelectedGesture(null);
    setOpponentGesture(null);
    setRoundResult(null);
    setSharedTimer(5);                                             
    setIsRoundActive(true);
    createGame();
  };

  const getRandomGesture = () => { //untuk randomizer komputer
    const gestures = ['Rock', 'Paper', 'Scissors'];
    return gestures[Math.floor(Math.random() * gestures.length)];
  };

  const determineWinner = (playerGesture, opponentGesture) => {
    setPlayerChoices((prev) => [
      ...prev,
      playerGesture ? playerGesture[0].toLowerCase() : null,
    ]);
    setComputerChoices((prev) => [
      ...prev,
      opponentGesture[0].toLowerCase(),
    ]);
  
    let winner = null;
    if (playerGesture === opponentGesture) {
      winner = null;
    } else if (
      (playerGesture === 'Rock' && opponentGesture === 'Scissors') ||
      (playerGesture === 'Paper' && opponentGesture === 'Rock') ||
      (playerGesture === 'Scissors' && opponentGesture === 'Paper')
    ) {
      winner = gameData.player1_id;
    } else {
      winner = gameData.player2_id;
    }
  
    setRoundWinner((prev) => [...prev, winner]);
    return winner === null ? 'Draw' : winner === gameData.player1_id ? 'Win' : 'Lose';
  };

  const updateScores = (result) => {
    if (result === 'Win') {
      setPlayerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) {
          setGameOver(true);
          setGameResult('WIN');
          saveFinalRoundWinner(gameData.player1_id); // Add the last round winner
        }
        return newScore;
      });
    } else if (result === 'Lose') {
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) {
          setGameOver(true);
          setGameResult('LOSE');
          saveFinalRoundWinner(gameData.player2_id); // Add the last round winner
        }
        return newScore;
      });
    }
  };
  
  // Helper to save the last round winner
  const saveFinalRoundWinner = (lastWinner) => {
    setRoundWinner((prev) => [...prev, lastWinner]);
  };
  

  const gestureImages = { //asset image
    Rock: Rock,
    Paper: Paper,
    Scissors: Scissors,
  };

  return (
    <View style={[styles.container]}>
      
    {/* score component untuk player dan komputer */}
    <View style={[styles.scoreBoard, styles.computerScore]}>
      <ScoreBoard score={computerScore} />
    </View>
    <View style={[styles.scoreBoard, styles.playerScore]}>
      <ScoreBoard score={playerScore} />
    </View>

    {/* Text  place holder buat bgcolor, sampe sekarang belum bisa tanpa ini*/}
    <Text style={styles.text}>Welcome to Rock Paper Scissors!/////..</Text>

    {/* Timer atau Selected Gesture, ngga tau cara misahin nih,  */}
    <View style={styles.selectedGestureContainer}>
      {sharedTimer > 0 && (
        <Text style={styles.timerText}>{sharedTimer}</Text>
      )}
    </View>
    <View style={styles.selectedGestureContainer2}>
    
      {selectedGesture && (
        <Image
          source={gestureImages[selectedGesture]}
          style={[styles.selectedGestureImage]}
          resizeMode="contain"
        />
      )}
    </View>
      
      {/* Opponent Gesture */}
      <View style={styles.opponentGestureContainer}>
        {opponentGesture && (
          <Image
            source={gestureImages[opponentGesture]}
            style={[styles.selectedGestureImageOpp, { transform: [{ rotate: '180deg' }] }]}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.header}>
        <Image source={require('../assets/Rectangle 18.png')} style={styles.headerImage} />
        <View style={styles.titleContainerWrapper}>
          <TitleContainer />
        </View>
      </View>

      {/* Round and Game Results */}
      {roundResult && !gameOver && (
        <Image
          source={
            roundResult === 'Win'
              ? WIN
              : roundResult === 'Lose'
              ? LOSE
              : DRAW
          }
          style={styles.gameResultImage}
          resizeMode="contain"
        />
      )}
      {gameOver && (
        <GameOverModal
          visible={gameOver}
          gameResult={gameResult}
          onPlayAgain={() => {
            setPlayerScore(0);      // Reset player score
            setComputerScore(0);    // Reset opponent score
            setGameOver(false);     // Exit the modal
            setGameResult(null);    // Clear the game result
            startNextRound();       // Start a new game
          }}
          onHome={() => {
            setGameOver(false);
            navigation.navigate('TabNavigation');
          }}
          scoreAdded={scoreAdded}
        />
      )}

      <View style={styles.footer}>
        <Image source={require('../assets/Rectangle 17.png')} style={styles.footerImage} />
      </View>
      {/* Gesture Buttons */}
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
        flex: 1, // Ensures the container fills the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008C47', // Default background color
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
    top: '440',
    backgroundColor: ''
  },
  selectedGestureImageOpp: {
    width: 400,
    height: 400,
    bottom: '220',
    backgroundColor: ''
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

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  footerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  titleContainerWrapper: {
    //justifyContent: 'center', // Center content vertically
    //alignItems: 'center', // Center content horizontally
    //width: '100%', // Ensure it spans the width of the screen
    //position: 'absolute', // Optional: position it relative to the parent
    bottom: 50, // Adjust to your desired position from the top
  },
  
  header: {
    position: 'absolute',
    top: 30,
    width: '100%',
    height: 100, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  timerText: { fontSize: 36, color: '#fff', fontWeight: 'bold', backgroundColor: '' },

  gestureImage: { width: 100, height: 100 },

  gestureButton: { width: 80, height: 80, margin: 10 },


});


export default SinglePlayerScreen;
