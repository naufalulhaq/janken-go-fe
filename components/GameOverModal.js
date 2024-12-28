import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import WIN from "../assets/modal-image-win.png"; // Replace with your actual WIN image path
import LOSE from "../assets/modal-image-lose.png"; // Replace with your actual LOSE image path

const GameOverModal = ({
  visible,
  gameResult,
  onPlayAgain,
  onHome,
  scoreAdded,
  multiplayer = false,
}) => {
  const { theme, themeName, setTheme } = useTheme();
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1, // Allows the image and text to take up central space
    },
    resultImage: {
      width: 200,
      height: 200,
      marginBottom: 10,
    },
    resultText: {
      fontSize: 50,
      fontWeight: "bold",
      color: theme.neutral,
      textAlign: "center",
    },
    resultTextScore: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      textAlign: "center",
      backgroundColor: theme.neutral,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginTop: 16,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 20,
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      paddingHorizontal: 20,
    },
    button: {
      flex: 1,
      marginHorizontal: 10,
      height: 48,
      backgroundColor: theme.background,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonText: {
      color: theme.neutral,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onHome}
    >
      <View style={styles.modalContainer}>
        {/* Centered Content */}
        <View style={styles.contentContainer}>
          <Image
            source={gameResult === "WIN" ? WIN : LOSE}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <Text style={styles.resultText}>
            {gameResult === "WIN" ? "YOU WIN!" : "YOU LOSE!"}
          </Text>
          <Text style={[styles.resultTextScore]}>
            Score +{scoreAdded}
          </Text>
        </View>

        {/* Buttons at the Bottom */}
        <View style={styles.buttonContainer}>
          {!multiplayer && (
            <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={onHome}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GameOverModal;
