import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import ListLeaderboard from "../components/ListLeaderboard";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";

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
  };

  const imageUrlBackground = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/leaderboard-bg-green-2.png");
      case "pinkCandy":
        return require("../assets/leaderboard-bg-pink-2.png");
      case "blueOcean":
        return require("../assets/leaderboard-bg-blue-2.png");
      default:
        return require("../assets/leaderboard-bg-green-2.png");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "flex-start",
    },
    scrollContent: {
      flexGrow: 1,
    },
    leaderboardImage: {
      height: 140,
      marginTop: 28,
      marginBottom: 44
    },
    imageBackground: {
      flex: 1,
      // backgroundColor: "green",
      height: 300,
    },
    headerContainer: {
      alignItems: "center",
      paddingTop: 28,
    },
    headerImageBackground: {
      height: 300,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar />
        <ImageBackground
          source={imageUrlBackground()}
          style={styles.imageBackground}
        >
          <View style={styles.headerContainer}>
            <View>
              <ScreenHeader ScreenName="Leaderboard" />
            </View>
            <Image
              style={styles.leaderboardImage}
              source={imageUrl()}
              resizeMode="contain"
            />
          </View>
          <ListLeaderboard />
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
