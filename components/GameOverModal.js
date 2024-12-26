import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import WIN from '../assets/Group 22.png'; // Replace with your actual WIN image path
import LOSE from '../assets/Group 22.png'; // Replace with your actual LOSE image path

const GameOverModal = ({ visible, gameResult, onPlayAgain, onHome }) => (
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
          source={gameResult === 'WIN' ? WIN : LOSE}
          style={styles.resultImage}
          resizeMode="contain"
        />
        <Text style={styles.resultText}>
          {gameResult === 'WIN' ? 'YOU WIN!' : 'YOU LOSE!'}
        </Text>
      </View>

      {/* Buttons at the Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHome}>
          <Text style={styles.buttonText}>Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Allows the image and text to take up central space
  },
  resultImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFE8CE',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#008C47',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameOverModal;
