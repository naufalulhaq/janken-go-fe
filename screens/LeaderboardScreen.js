import React from "react";
import { StyleSheet, View, Dimensions, StatusBar, Image, ImageBackground } from "react-native";
import ListLeaderboard from "../components/ListLeaderboard";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");

const LeaderboardScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const imageUrl = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/leaderboard-illus-green.png");
      case "pinkCandy":
        return require("../assets/leaderboard-illus-pink.png");
      case "blueOcean":
        return require("../assets/leaderboard-illus-blue.png");
      default:
        return require("../assets/leaderboard-illus-green.png");
    }
  }

  const imageUrlBackground = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/leaderboard-bg-green.png");
      case "pinkCandy":
        return require("../assets/leaderboard-bg-pink.png");
      case "blueOcean":
        return require("../assets/leaderboard-bg-blue.png");
      default:
        return require("../assets/leaderboard-bg-green.png");
    }
  }

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      backgroundColor: theme.background,
      // flexDirection: "column",
      // flex:1,
      // alignItems: "center",
      // gap: 16,
      // paddingTop: 28,
    },
    leaderboardImage: {
      height: 148,
      marginTop: 32
    },
    imageBackground: {
      flex: 1,
      height: 320
    },
    headerContainer: {
      paddingTop: 28,
    },
    headerContent: {
      alignItems: "center"
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground
          source={imageUrlBackground()}
          style={styles.imageBackground}
        >
        <StatusBar />
        <View style={styles.headerContent}>
          <View style={styles.headerContainer}>
              <ScreenHeader ScreenName="Leaderboard" />
          </View>
          <Image
          style={styles.leaderboardImage}
          source={imageUrl()}
          resizeMode="contain"
          />
        </View>
      </ImageBackground>
      <ListLeaderboard />
    </View>
  );
};

export default LeaderboardScreen;
