import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ListHistoryItem from "./ListHistoryItem";
import { useNavigation } from "@react-navigation/native";
import { fetchHistory } from "../api/restApi";
import { useTheme } from "../context/ThemeContext";

const HistoryAtProfile = () => {
  const navigation = useNavigation();
  const [histories, setHistories] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistory();
        setHistories(data);
        console.log("History data fetched!");
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 16,
      width: "100%",
    },
    headerHistory: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerText: {
      fontSize: 16,
      fontWeight: 700,
      color: "#FFE8CE",
    },
    headerTextLink: {
      fontSize: 16,
      fontWeight: 500,
      color: "#FFE8CE",
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
  });

  console.log("History fetched:", histories);

  return (
    <View style={styles.container}>
      <View style={styles.headerHistory}>
        <Text style={styles.headerText}>Match History</Text>
        <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <Text style={styles.headerTextLink}>More</Text>
        </TouchableOpacity>
      </View>
      {histories && histories.length > 0 ? (
        <>
          {console.log("ini di ternary:", histories)}
          <ListHistoryItem data={histories[0]} />
          <ListHistoryItem data={histories[1]} />
        </>
      ) : (
        <View style={styles.containerNoMatch}>
          <Text style={styles.textNoMatch}>No match history found</Text>
          <Text style={[styles.textNoMatch, { fontWeight: 400 }]}>
            Start playing to view your match history
          </Text>
        </View>
      )}
    </View>
  );
};

export default HistoryAtProfile;
