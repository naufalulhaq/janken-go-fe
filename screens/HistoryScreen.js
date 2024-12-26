import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";
import { StyleSheet, Dimensions, View, StatusBar, ScrollView } from "react-native";
import ListHistoryItem from "../components/ListHistoryItem";

const { height: screenHeight } = Dimensions.get("window");

const HistoryScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 16,
    },
    historyContainer: {
      marginTop: 48,
      marginBottom: 108,
      height: 480,
      flexDirection: "column",
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScreenHeader ScreenName="Match History" />
      <ScrollView style={styles.historyContainer} contentContainerStyle={{ justifyContent: "space-between", gap: 16 }} showsVerticalScrollIndicator={false}>
        <ListHistoryItem />
        <ListHistoryItem />
        <ListHistoryItem />
        <ListHistoryItem />
        <ListHistoryItem />
        <ListHistoryItem />
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
