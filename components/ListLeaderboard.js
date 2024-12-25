import { React, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ListLeaderboardItem from "./ListLeaderboardItem";
import { useTheme } from "../context/ThemeContext";
import { fetchLeaderboard } from "../api/restApi";

const ListLeaderboard = () => {
  const { theme, themeName, setTheme } = useTheme();
  const [userRank, setUserRank] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboard();
        setUserRank(data.user_rank);
        setLeaderboard(data.leaderboard); 
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  const styles = {
    listContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: 16,
      width: "100%",
    },
    listHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    listHeaderItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      backgroundColor: theme.primary,
      borderRadius: 20,
      elevation: 8,
    },
    listHeaderItemText: {
      fontSize: 16,
      fontWeight: 500,
      color: "#FFE8CE",
    },
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <View style={styles.listHeaderItem}>
          <Text style={styles.listHeaderItemText}>Rank</Text>
        </View>
        <View style={[styles.listHeaderItem, { flex: 3 }]}>
          <Text style={styles.listHeaderItemText}>Nickname</Text>
        </View>
        <View style={[styles.listHeaderItem, { flex: 2 }]}>
          <Text style={styles.listHeaderItemText}>Score</Text>
        </View>
      </View>
      {leaderboard.map((player) => (
        <ListLeaderboardItem
          key={player.id}
          rank={player.rank}
          profileImage={player.avatar_url}
          nickname={player.nickname}
          score={player.score}
          userRank={userRank}
        />
      ))}
    </View>
  );
};

export default ListLeaderboard;
