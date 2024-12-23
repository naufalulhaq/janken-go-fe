import { React, useEffect } from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../components/ProfileHeader";
import MatchOptions from "../components/MatchOptions";

const { height: screenHeight } = Dimensions.get("window");
const playerName = "Joko Susanto";

const HomeScreen = () => {
  useEffect(() => {
    const storePlayerName = async () => {
      try {
        await AsyncStorage.setItem("playerName", playerName);
      } catch (e) {
        console.error("Failed to store the player name to storage", e);
      }
    };
    storePlayerName();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ProfileHeader />
      <MatchOptions />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    flexDirection: "column",
    // justifyContent: "",
    // alignItems: "center",
    backgroundColor: "#008C47",
    paddingTop: 28,
    paddingHorizontal: 16,
  },
});
