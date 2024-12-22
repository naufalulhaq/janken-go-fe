import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Text,
  Image,
} from "react-native";
import ListLeaderboard from "../components/ListLeaderboard";

const { height: screenHeight } = Dimensions.get("window");

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>
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
  header: {
    height: 48,
    width: 296,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8CE",
    borderRadius: 24,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#004E28",
  },
  leaderboardImage: {
    width: 148,
    height: 148,
  },
});
