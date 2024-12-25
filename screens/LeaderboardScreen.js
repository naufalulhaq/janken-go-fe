import React from "react";
import { StyleSheet, View, Dimensions, StatusBar, Image } from "react-native";
import ListLeaderboard from "../components/ListLeaderboard";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");

const LeaderboardScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const imageUrl = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/leaderboard-greenforest.png");
      case "pinkCandy":
        return require("../assets/leaderboard-pinkcandy.png");
      case "blueOcean":
        return require("../assets/leaderboard-blueocean.png");
      default:
        return require("../assets/leaderboard-greenforest.png");
    }
  }

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      backgroundColor: theme.secondary,
      paddingTop: 28,
    },
    leaderboardImage: {
      height: 148,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScreenHeader ScreenName="Leaderboard" />
      <Image
        style={styles.leaderboardImage}
        source={imageUrl()}
        resizeMode="contain"
      />
      <ListLeaderboard />
    </View>
  );
};

export default LeaderboardScreen;
