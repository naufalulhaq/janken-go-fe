import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import ListLeaderboard from "../components/ListLeaderboard";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");

const LeaderboardScreen = () => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 32,
    },
    leaderboardImage: {
      width: 148,
      height: 148,
    },
  });
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScreenHeader ScreenName="Leaderboard" />
      <Image
        style={styles.leaderboardImage}
        source={require("../assets/leaderboard.png")}
      />
      <ListLeaderboard/>
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#008C47",
    paddingTop: 28,
    paddingHorizontal: 32,
  },
  leaderboardImage: {
    width: 148,
    height: 148,
  },
});
