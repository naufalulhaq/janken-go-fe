import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ListHistoryItem from "./ListHistoryItem";
import { useNavigation } from "@react-navigation/native";

const HistoryAtProfile = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      //   backgroundColor: "red",
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerHistory}>
        <Text style={styles.headerText}>Match History</Text>
        <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <Text style={styles.headerTextLink}>More</Text>
        </TouchableOpacity>
      </View>
      <ListHistoryItem />
      <ListHistoryItem />
    </View>
  );
};

export default HistoryAtProfile;
