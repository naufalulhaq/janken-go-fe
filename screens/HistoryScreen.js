import { React, useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";
import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import ListHistoryItem from "../components/ListHistoryItem";
import { fetchHistory } from "../api/restApi";

const { height: screenHeight } = Dimensions.get("window");

const HistoryScreen = () => {
  const { theme, themeName, setTheme } = useTheme();
  const [histories, setHistories] = useState([]);
  const imageUrl = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/history-bg-greenforest.png");
      case "pinkCandy":
        return require("../assets/history-bg-pinkcandy.png");
      case "blueOcean":
        return require("../assets/history-bg-blueocean.png");
      default:
        return require("../assets/history-bg-greenforest.png");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistory();
        setHistories(data);
        console.log("History data fetched!");
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      }
    };
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.background,
      // paddingTop: 28,
      // paddingHorizontal: 16,
    },
    historyContainer: {
      marginTop: 8,
      marginBottom: 84,
      paddingHorizontal: 24,
      height: 480,
      flexDirection: "column",
      width: "100%",
    },
    containerNoMatch: {
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      backgroundColor: "#FFE8CE",
      borderRadius: 8,
    },
    textNoMatch: {
      fontSize: 16,
      fontWeight: 500,
      textAlign: "center",
      color: theme.primary,
    },
    imageBackground: {
      width: "100%",
      height: 140, // Adjust this to match your image's desired height
      justifyContent: "flex-start",
      alignItems: "center",
      // backgroundColor: "red",
      paddingTop: 32
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground source={imageUrl()} style={styles.imageBackground}>
        <ScreenHeader ScreenName="Match History" />
      </ImageBackground>
      <ScrollView
        style={styles.historyContainer}
        contentContainerStyle={{ justifyContent: "space-between", gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {histories && histories.length > 0 ? (
          histories.map((history) => (
            <ListHistoryItem key={history.game_id} data={history} />
          ))
        ) : (
          <View style={styles.containerNoMatch}>
            <Text style={styles.textNoMatch}>No match history found</Text>
            <Text style={[styles.textNoMatch, { fontWeight: 400 }]}>
              Start playing to view your match history
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
