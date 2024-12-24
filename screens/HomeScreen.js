import { React, useEffect } from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../components/ProfileHeader";
import MatchOptions from "../components/MatchOptions";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");
const playerName = "Joko Susanto";

const HomeScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      // justifyContent: "",
      // alignItems: "center",
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 16,
    },
  });
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


