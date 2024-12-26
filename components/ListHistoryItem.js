import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

function ListHistoryItem() {
  const { theme, themeName, setTheme } = useTheme();

  const player1 = "Joko Susanto";
  const playerAvatar1 =
    "https://lh3.googleusercontent.com/d/1E1ScXZsSMEIv0YdRJjWoiCqaSFKVePQv";
  const player2 = "Boby Kartanegara";
  const playerAvatar2 =
    "https://lh3.googleusercontent.com/d/1lglBhXaLprO4BfhbGJhJOAwyXQJOTscB";
  const score = "6 - 1";
  const date = "Dec 25, 2024";
  const roundPlayed = "10";
  const status = "Win";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      backgroundColor: "#FFE8CE",
      width: "100%",
      borderRadius: 16,
      gap: 8,
    },
    containerUpper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    containerPlayer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 16,
      gap: 4,
    },
    playerAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    playerText: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.primary,
    },
    containerScore: {
      justifyContent: "center",
      gap: 4,
    },
    textStatus: {
      fontSize: 14,
      fontWeight: 700,
      color: status === "Lose" ? "#CF2D48" : "#004E28",
      textAlign: "center",
    },
    score: {
      backgroundColor: status === "Lose" ? "#CF2D48" : "#004E28",
      paddingVertical: 8,
      textAlign: "center",
      width: 48,
      borderRadius: 16,
      color: "#FFE8CE",
      fontSize: 14,
      fontWeight: 700,
    },
    containerUnder: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    textUnderLabel: {
      fontSize: 12,
      fontWeight: 700,
      color: "#FFE8CE",
    },
    textUnderValue: {
      fontSize: 12,
      fontWeight: 400,
      color: "#FFE8CE",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.containerUpper}>
        <View style={styles.containerPlayer}>
          <Image source={{ uri: playerAvatar1 }} style={styles.playerAvatar} />
          <Text style={styles.playerText}>{player1}</Text>
        </View>
        <View style={styles.containerScore}>
          <Text style={styles.textStatus}>{status}</Text>
          <Text style={styles.score}>{score}</Text>
        </View>
        <View style={styles.containerPlayer}>
          <Image source={{ uri: playerAvatar2 }} style={styles.playerAvatar} />
          <Text style={styles.playerText}>{player2}</Text>
        </View>
      </View>
      <View style={styles.containerUnder}>
        <Text style={styles.textUnderLabel}>
          Date: <Text style={styles.textUnderValue}>{date}</Text> | Round
          Played: <Text style={styles.textUnderValue}>{roundPlayed}</Text>
        </Text>
      </View>
    </View>
  );
}

export default ListHistoryItem;