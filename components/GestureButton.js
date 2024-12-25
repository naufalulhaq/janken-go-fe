import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const GestureButton = ({ onPress, imageSource, style, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#004E28',
    borderWidth: 2,
    backgroundColor: '#FFE8CE',
    padding: 20,
    borderRadius: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default GestureButton;
