import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListLeaderboardItem = ({ rank, profileImage, nickname, score }) => {
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const fetchPlayerName = async () => {
      try {
        const name = await AsyncStorage.getItem("playerName");
        if (name !== null) {
          setPlayerName(name);
        }
      } catch (e) {
        console.error("Failed to fetch the player name from storage", e);
      }
    };

    fetchPlayerName();
  }, []);

  const getBackgroundColor = () => {
    if (rank === 1) return "#FAAF5A";
    if (rank === 2) return "#9D9D9D";
    if (rank === 3) return "#E2A269";
    return "#95B9D1"; // Default color
  };

  return (
    <View style={(nickname === playerName) ? styles.listContainerPlayer : styles.listContainer}>
      <View
        style={[
          styles.rankContainer,
          { backgroundColor: getBackgroundColor() },
        ]}
      >
        <Text style={styles.numberText}>{rank}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={(nickname === playerName) ? styles.profileTextPlayer : styles.profileText}>{nickname}</Text>
      </View>
      <View
        style={[
          styles.scoreContainer,
          { backgroundColor: getBackgroundColor() },
        ]}
      >
        <Text style={styles.numberText}>{score}</Text>
      </View>
    </View>
  );
};

export default ListLeaderboardItem;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: "#FFE8CE",
    height: 48,
    width: "100%",
    borderRadius: 24,
    paddingHorizontal: 8,
    elevation: 8,
  },
  listContainerPlayer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: "#004E28",
    height: 48,
    width: "100%",
    borderRadius: 24,
    paddingHorizontal: 8,
    elevation: 8,
  },
  rankContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  profileImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  profileText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#004E28",
  },
  profileTextPlayer: {
    fontSize: 16,
    fontWeight: 700,
    color: "#FFE8CE",
  },
  scoreContainer: {
    height: 32,
    width: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#95B9D1",
  },
  numberText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#FFE8CE",
  },
});