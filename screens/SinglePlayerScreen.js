import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import GestureButton from '../components/GestureButton';
// Import images
import buttonRock from '../assets/button_batu_hand.png';
import buttonPaper from '../assets/button_kertas_hand.png';
import buttonScissors from '../assets/button_gunting_hand.png';

import Rock from '../assets/Rock.png';
import Paper from '../assets/Paper.png';
import Scissors from '../assets/Scissor.png';

const SinglePlayerScreen = ({ backgroundColor = '#008C47' }) => {
  const [selectedGesture, setSelectedGesture] = useState(null);
  const [opponentGesture, setOpponentGesture] = useState(null);
  const [opponentChoosing, setOpponentChoosing] = useState(false);

  const handleGesturePress = (gesture) => {
    console.log(`You selected: ${gesture}`);
    setSelectedGesture(gesture); // Update state with the selected gesture
    setOpponentChoosing(true); // Show "opponent choosing action" text
    setOpponentGesture(null); // Reset opponent's gesture

    // Simulate opponent decision delay
    setTimeout(() => {
      const opponentChoice = getOpponentGesture(gesture);
      setOpponentGesture(opponentChoice);
      setOpponentChoosing(false);
    }, 2000); // Delay of 2 seconds
  };

  const getOpponentGesture = (playerGesture) => {
    const gestures = ["Rock", "Paper", "Scissors"];
    // Choose a random gesture that's the opposite of the player's choice
    const counterGesture = {
      Rock: "Paper",
      Paper: "Scissors",
      Scissors: "Rock",
    };
    return counterGesture[playerGesture];
  };

  const gestureImages = {
    Rock: Rock,
    Paper: Paper,
    Scissors: Scissors,
  };

  return (
    <View style={[styles.container, { backgroundColor:'#008C47' }]}>
      <Text style={styles.text}>Welcome to Rock Paper Scissors!</Text>

      <View style={styles.selectedGestureContainer}>
        {/* Show player's gesture or "Choose your action" */}
        {selectedGesture ? (
          <Image
            source={gestureImages[selectedGesture]}
            style={[styles.selectedGestureImageOpp, {transform: [{rotate: '180deg'}]}]}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.actionText}>Choose your action</Text>
        )}
      </View>

      <View style={styles.opponentGestureContainer}>
        {/* Show opponent's gesture or "Opponent choosing action" */}
        {opponentChoosing ? (
          <Text style={styles.actionTextOpp}>Opponent choosing action...</Text>
        ) : opponentGesture ? (
          <Image
            source={gestureImages[opponentGesture]}
            style={styles.selectedGestureImage}
            resizeMode="contain"
          />
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <GestureButton
          imageSource={buttonScissors}
          onPress={() => handleGesturePress("Scissors")}
        />
        <GestureButton
          imageSource={buttonPaper}
          onPress={() => handleGesturePress("Paper")}
        />
        <GestureButton
          imageSource={buttonRock}
          onPress={() => handleGesturePress("Rock")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#008C47",
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
  opponentGestureContainer: {
    position: "absolute",
    bottom: "30%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  selectedGestureImage: {
    width: 400, // Adjust size as needed
    height: 400,
    top:'255', // Adjust size as needed
  },
  selectedGestureImageOpp: {
    width: 400, // Adjust size as needed
    height: 400,
    bottom:'50',
     // Adjust size as needed
  },
  actionText: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    top:'150',
  },

  actionTextOpp: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    bottom:'150',
  },
});

export default SinglePlayerScreen;
