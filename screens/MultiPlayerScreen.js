import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import GestureButton from "../components/GestureButton";
import ScoreBoard from "../components/ScoreBoard";
import GameOverModal from "../components/GameOverModal";
import { saveGame } from "../api/restApi";
import TitleContainer from "../components/TitleContainer";
// Import images
import buttonRock from "../assets/button_batu_hand.png";
import buttonPaper from "../assets/button_kertas_hand.png";
import buttonScissors from "../assets/button_gunting_hand.png";
import Rock from "../assets/Rock.png";
import Paper from "../assets/Paper.png";
import Scissors from "../assets/Scissor.png";
import WIN from "../assets/WIN.png";
import LOSE from "../assets/LOSE.png";
import DRAW from "../assets/DRAW.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("http://54.254.8.9");

const MultiPlayerScreen = ({ backgroundColor = "#008C47" }) => {
  const route = useRoute();
  const { userData } = useAuth();
  const { isHost, roomCode } = route.params;
  const [sound, setSound] = useState(null);

  const [isWaiting, setIsWaiting] = useState(true);
  const [opponentNickname, setOpponentNickname] = useState(null);
  const [opponentAvatar, setOpponentAvatar] = useState(null);
  const [opponentGesture, setOpponentGesture] = useState(null);
  const [selectedGesture, setSelectedGesture] = useState(null);
  const [sharedTimer, setSharedTimer] = useState(5);
  const [roundResult, setRoundResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [isRoundActive, setIsRoundActive] = useState(true);
  const [scoreAdded, setScoreAdded] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true, // Keep audio playing in the background
        shouldDuckAndroid: false, // Don't pause when other audio plays
      });
    };
    setupAudio();

    // Automatically start audio when the game starts
    stopGameAudio();
    playGameAudio();

    // Cleanup audio when the component unmounts or game ends
    return () => {
      stopGameAudio();
    };
  }, []);

  useEffect(() => {
    socket.on("roomAlreadyExists", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigation" }],
      });
    });

    socket.on("playerJoined", (data) => {
      if (isHost) {
        setOpponentNickname(data.p2.nickname);
        setOpponentAvatar(data.p2.avatar);
      } else {
        setOpponentNickname(data.p1.nickname);
        setOpponentAvatar(data.p1.avatar);
      }
      setIsWaiting(false);
    });

    socket.on("roundResult", (data) => {
      if (isHost) {
        switch (data.p2Choice) {
          case "r":
            setOpponentGesture("Rock");
            break;
          case "p":
            setOpponentGesture("Paper");
            break;
          case "s":
            setOpponentGesture("Scissors");
            break;
        }
        setPlayerScore(data.gameData.p1Score);
        setOpponentScore(data.gameData.p2Score);
        if (data.result === "player1") {
          setRoundResult("Win");
        } else if (data.result === "player2") {
          setRoundResult("Lose");
        } else {
          setRoundResult("Draw");
        }
      } else {
        switch (data.p1Choice) {
          case "r":
            setOpponentGesture("Rock");
            console.log("Rock");
            break;
          case "p":
            setOpponentGesture("Paper");
            break;
          case "s":
            setOpponentGesture("Scissors");
            break;
        }
        setPlayerScore(data.gameData.p2Score);
        setOpponentScore(data.gameData.p1Score);
        if (data.result === "player2") {
          setRoundResult("Win");
        } else if (data.result === "player1") {
          setRoundResult("Lose");
        } else {
          setRoundResult("Draw");
        }
      }
    });

    socket.on("gameOver", (data) => {
      console.log(data);
      setGameOver(true);
      if (isHost) {
        if (data.gameWinner === "player1") {
          setGameResult("WIN");
        } else {
          setGameResult("LOST");
        }
        setScoreAdded(data.gameData.player1_score);
      } else {
        if (data.gameWinner === "player2") {
          setGameResult("WIN");
        } else {
          setGameResult("LOST");
        }
        setScoreAdded(data.gameData.player2_score);
      }
    });

    socket.on("errorRoom", (message) => {
      alert(message);
      navigation.goBack();
    });

    return () => {
      socket.off("roomAlreadyExists");
      socket.off("playerJoined");
      socket.off("roundResult");
      socket.off("gameOver");
    };
  }, []);

  useEffect(() => {
    if (isHost) {
      socket.emit("createRoom", {
        userId: userData.id,
        userNickname: userData.nickname,
        userAvatar: userData.avatar_url,
        roomCode: roomCode,
      });
      console.log(roomCode);
    } else {
      socket.emit("joinRoom", {
        userId: userData.id,
        userNickname: userData.nickname,
        userAvatar: userData.avatar_url,
        roomCode: roomCode,
      });
    }
  }, []);

  useEffect(() => {
    if (roundResult && !gameOver) {
      // Add a delay of 1 second before showing the result image
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 1000); // 1000ms = 1 second
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setShowResult(false); // Reset if no round result or game is over
    }
  }, [roundResult, gameOver]);

  const playGameAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/background.mp3"), // Path to the audio file in your assets folder
        { shouldPlay: true, isLooping: true } // Loop the audio
      );
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const stopGameAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  useEffect(() => {
    if (!isWaiting) {
      if (sharedTimer > 0 && !gameOver) {
        // syarat buat countdown
        const countdown = setTimeout(
          () => setSharedTimer((prev) => prev - 1),
          1000
        );
        return () => clearTimeout(countdown);
      } else if (sharedTimer === 0 && isRoundActive) {
        setIsRoundActive(false);
        socket.emit("playerMove", {
          roomCode: roomCode,
          isHost: isHost,
          choice: selectedGesture ? selectedGesture[0].toLowerCase() : null,
        });
      }
    }
  }, [sharedTimer, isRoundActive, gameOver, isWaiting]);

  useEffect(() => {
    //beneran ngga kepake, tapi ditinggal aja disini
    if (!isRoundActive && !gameOver) {
      //timer buat next round
      const nextRoundTimer = setTimeout(startNextRound, 2000);
      return () => clearTimeout(nextRoundTimer);
    }
  }, [isRoundActive, gameOver]);

  const handleGesturePress = (gesture) => {
    //fungsi buat handle pilihan player, cuma berhenti kalau countdown berhenti, sama pas gameover
    if (!isRoundActive || gameOver) return;
    setSelectedGesture(gesture);
  };

  const startNextRound = () => {
    //reset buat nextround, score nya di keep tapi
    setSelectedGesture(null);
    setOpponentGesture(null);
    setRoundResult(null);
    setSharedTimer(5);
    setIsRoundActive(true);
  };

  const gestureImages = {
    //asset image
    Rock: Rock,
    Paper: Paper,
    Scissors: Scissors,
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={() => {
          stopGameAudio();
          navigation.reset({
            index: 0,
            routes: [{ name: "TabNavigation" }],
          });
        }}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      {/* score component untuk player dan komputer */}
      {!isWaiting ? (
        <>
          <View style={[styles.scoreBoard, styles.opponentScore]}>
            <ScoreBoard score={opponentScore} />
          </View>
          <View style={[styles.scoreBoard, styles.playerScore]}>
            <ScoreBoard score={playerScore} />
          </View>
          {/* Text  place holder buat bgcolor, sampe sekarang belum bisa tanpa ini*/}
          <Text style={styles.text}>
            Welcome to Rock Paper Scissors!/////..
          </Text>
          {/* Timer atau Selected Gesture, ngga tau cara misahin nih,  */}

          <View style={styles.selectedGestureContainer}>
            {sharedTimer > 0 && (
              <Text style={styles.timerText}>{sharedTimer}</Text>
            )}
          </View>
        </>
      ) : (
        <View style={styles.shareCodeContainer}>
          <Text style={styles.shareCodeTitle}>Share your code:</Text>
          <Text style={styles.shareCode}>{roomCode}</Text>
        </View>
      )}

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
            style={[
              styles.selectedGestureImageOpp,
              { transform: [{ rotate: "180deg" }] },
            ]}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.header}>
        <Image
          source={require("../assets/Rectangle 18.png")}
          style={styles.headerImage}
        />
        <View style={styles.titleContainerWrapper}>
          <TitleContainer source={{ uri: opponentAvatar }}>
            {isWaiting ? "Waiting..." : opponentNickname}
          </TitleContainer>
        </View>
      </View>
      {showResult && roundResult && !gameOver && (
        <Image
          source={
            roundResult === "Win" ? WIN : roundResult === "Lose" ? LOSE : DRAW
          }
          style={styles.gameResultImage}
          resizeMode="contain"
        />
      )}
      {gameOver && (
        <GameOverModal
          visible={gameOver}
          gameResult={gameResult}
          onHome={() => {
            setGameOver(false);
            stopGameAudio();
            navigation.reset({
              index: 0,
              routes: [{ name: "TabNavigation" }],
            });
          }}
          scoreAdded={scoreAdded}
          multiplayer={true}
        />
      )}
      <View style={styles.footer}>
        <Image
          source={require("../assets/Rectangle 17.png")}
          style={styles.footerImage}
        />
      </View>
      {/* Gesture Buttons */}
      <View style={styles.buttonContainer}>
        {["Scissors", "Paper", "Rock"].map((gesture) => (
          <GestureButton
            key={gesture}
            imageSource={
              gesture === "Rock"
                ? buttonRock
                : gesture === "Paper"
                ? buttonPaper
                : buttonScissors
            }
            onPress={() => handleGesturePress(gesture)}
            disabled={!isRoundActive || gameOver || isWaiting}
            style={[
              selectedGesture === gesture && { backgroundColor: "#004E28" },
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008C47",
  },
  text: {
    fontSize: 24,
    color: "#008C47",
  },
  scoreBoard: {
    position: "absolute",
  },
  opponentScore: {
    top: 325,
    left: 0,
    backgroundColor: "#95B9D1",
    padding: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  playerScore: {
    bottom: 340,
    left: 0,
    padding: 10,
    backgroundColor: "#95B9D1",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  selectedGestureContainer: {
    position: "absolute",
    bottom: "50%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  selectedGestureContainer2: {
    position: "absolute",
    bottom: "50%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  opponentGestureContainer: {
    position: "absolute",
    bottom: "30%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  selectedGestureImage: {
    width: 400,
    height: 400,
    top: "440",
    backgroundColor: "",
  },
  selectedGestureImageOpp: {
    width: 400,
    height: 400,
    bottom: "220",
    backgroundColor: "",
  },
  actionText: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    top: "150",
  },
  actionTextOpp: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    bottom: "300",
  },
  resultText: {
    position: "absolute",
    top: "20%",
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  gameResultImage: {
    position: "absolute",
    top: "30%",
    width: 300,
    height: 300,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
  },
  footerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  titleContainerWrapper: {
    //justifyContent: 'center', // Center content vertically
    //alignItems: 'center', // Center content horizontally
    //width: '100%', // Ensure it spans the width of the screen
    //position: 'absolute', // Optional: position it relative to the parent
    bottom: 50, // Adjust to your desired position from the top
  },

  header: {
    position: "absolute",
    top: 30,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  closeButtonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1000,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#004E28",
    fontWeight: "bold",
  },

  timerText: {
    fontSize: 80,
    color: "#004E28",
    fontWeight: "bold",
    backgroundColor: "",
    textShadowColor: "#000000",
    textShadowOffset: { height: 2 },
    textShadowRadius: 4,
    top: 40,
  },

  gestureImage: { width: 100, height: 100 },

  gestureButton: { width: 80, height: 80, margin: 10 },

  shareCodeContainer: {
    backgroundColor: "#FFE8CE",
    width: "75%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  shareCodeTitle: {
    color: "#004E28",
    fontSize: 20,
  },

  shareCode: {
    color: "#004E28",
    fontSize: 48,
    fontWeight: "bold",
  },
});

export default MultiPlayerScreen;
