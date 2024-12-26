import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ListLeaderboardItem = ({ rank, profileImage, nickname, score, userRank }) => {
  const { theme, themeName, setTheme } = useTheme();

  const getBackgroundColor = () => {
    if (rank === 1) return "#FAAF5A";
    if (rank === 2) return "#9D9D9D";
    if (rank === 3) return "#E2A269";
    return "#95B9D1"; // Default color
  };

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
      backgroundColor: theme.primary,
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
      color: theme.primary,
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

  return (
    <View style={(rank === userRank) ? styles.listContainerPlayer : styles.listContainer}>
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
        <Text style={(rank === userRank) ? styles.profileTextPlayer : styles.profileText}>{nickname}</Text>
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


