import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

// Pre-import images
import buttonRock from '../assets/button_batu_hand.png';
import buttonPaper from '../assets/button_kertas_hand.png';
import buttonScissors from '../assets/button_gunting_hand.png';

const GestureButton = ({ onPress, imageSource }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain" // Ensures the full image is visible
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#004E28",
    borderWidth: 2,
    backgroundColor: '#FFE8CE',
    padding: 20,
    borderRadius: 50,
  },
  image: {
    width: 50,  // Width of the image
    height: 50, // Height of the image
  },
});

export default GestureButton;
