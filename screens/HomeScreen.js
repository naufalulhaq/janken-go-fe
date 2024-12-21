import React from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import MatchOptions from "../components/MatchOptions";

const { height: screenHeight } = Dimensions.get("window");

const HomeScreen = () => {
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
