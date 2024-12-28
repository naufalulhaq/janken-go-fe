import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ScoreBoard = ({ title, score }) => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      margin: 10,
      padding: 0,
    },
    score: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default ScoreBoard;
