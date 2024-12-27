import { React, useEffect } from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import MatchOptions from "../components/MatchOptions";
import { useTheme } from "../context/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");

const HomeScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <ProfileHeader />
      <MatchOptions />
    </View>
  );
};

export default HomeScreen;


