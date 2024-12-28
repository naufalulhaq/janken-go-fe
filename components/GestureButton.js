import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const GestureButton = ({ onPress, imageSource, style, disabled }) => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.primary,
      borderWidth: 2,
      backgroundColor: "#FFE8CE",
      padding: 20,
      borderRadius: 50,
    },
    image: {
      width: 50,
      height: 50,
    },
  });
  
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

export default GestureButton;
