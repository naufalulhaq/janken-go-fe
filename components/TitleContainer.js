import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const TitleContainer = ({ children, source }) => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row", // Align items horizontally
      alignItems: "center", // Center items vertically
      backgroundColor: "#fde8ce", // Beige background
      borderRadius: 24, // Rounded edges
      padding: 8, // Vertical padding
      height: 48,
      width: 212,
      shadowColor: "#000", // Shadow color
      shadowOffset: { width: 0, height: 4 }, // Shadow offset
      shadowOpacity: 0.1, // Shadow opacity
      shadowRadius: 6, // Shadow radius
      elevation: 4, // For Android shadow
      alignSelf: "flex-start", // Adjust size to content
    },
    circle: {
      width: 32, // Diameter of the circle
      height: 32, // Diameter of the circle
      backgroundColor: "#9fc4d9", // Light blue circle
      borderRadius: 24, // Makes the shape a circle (radius = half of diameter)
    },
    titleText: {
      fontFamily: "poppins", // Font family
      fontSize: 16, // Font size
      fontWeight: 700, // Bold text
      color: theme.primary,
      textAlign: "center",
      flex: 1,
    },
  });

  return (
    <View style={styles.titleContainer}>
      <Image style={styles.circle} source={source}></Image>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

export default TitleContainer;
