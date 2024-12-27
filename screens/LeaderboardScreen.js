import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView
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
        return require("../assets/leaderboard-bg-green.png");
      case "pinkCandy":
        return require("../assets/leaderboard-bg-pink.png");
      case "blueOcean":
        return require("../assets/leaderboard-bg-blue.png");
      default:
        return require("../assets/leaderboard-bg-green.png");
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
      height: 148,
      marginTop: 24,
    },
    imageBackground: {
      flex: 1,
    },
    headerContainer: {
      alignItems: "center",
      paddingTop: 28,
    },
    headerImageBackground: {
      height: 320,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatusBar />
        <View style={styles.headerImageBackground}>
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
          </ImageBackground>
        </View>
        <View>
          <ListLeaderboard />
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
