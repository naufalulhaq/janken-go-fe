import { React, useEffect } from "react";
import { StyleSheet, View, Dimensions, StatusBar, Image, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileHeader from "../components/ProfileHeader";
import MatchOptions from "../components/MatchOptions";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");
const playerName = "Joko Susanto";

const HomeScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const imageUrl = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/home-bg-green.png");
      case "pinkCandy":
        return require("../assets/home-bg-pink.png");
      case "blueOcean":
        return require("../assets/home-bg-blue.png");
      default:
        return require("../assets/home-bg-green.png");
    }
  }

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      backgroundColor: theme.background,
      // paddingTop: 28,
      // paddingHorizontal: 16,
    },
    imageBackground: {
      flex: 1,
    },
    headerContainer: {
      paddingLeft: 20,
      paddingTop: 30,
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
      <ImageBackground
                source={imageUrl()}
                style={styles.imageBackground}
      >
      <View style={styles.headerContainer}>
            <ProfileHeader />
      </View>
      <MatchOptions />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;


