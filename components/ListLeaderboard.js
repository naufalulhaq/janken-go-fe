import {React, useEffect} from "react";
import { View, Text } from "react-native";
import ListLeaderboardItem from "./ListLeaderboardItem";
import { useTheme } from "../context/ThemeContext";

const ListLeaderboard = () => {
  const { theme, themeName, setTheme } = useTheme();

  useEffect(() => {
    const storePlayerName = async () => {
      try {
        await AsyncStorage.setItem("playerName", playerName);
      } catch (e) {
        console.error("Failed to store the player name to storage", e);
      }
    };
    storePlayerName();
  }, []);

  const players = [
    {
      rank: 1,
      profileImage:
        "https://drive.google.com/uc?export=view&id=1lglBhXaLprO4BfhbGJhJOAwyXQJOTscB",
      nickname: "User_1980xx8",
      score: 1234,
    },
    {
      rank: 2,
      profileImage:
        "https://drive.google.com/uc?export=view&id=13kvSext4wOSL-6u-n9LNJTrkH9zMWFVR",
      nickname: "Bambam Widodo",
      score: 987,
    },
    {
      rank: 3,
      profileImage:
        "https://drive.google.com/uc?export=view&id=1_fB5cyuGW8e2rFZuQf9G45ldKTTbs7Fu",
      nickname: "Michael Hutapea",
      score: 897,
    },
    {
      rank: 4,
      profileImage:
        "https://drive.google.com/uc?export=view&id=1tBzDMDdAjlkIcmliHmlH2ljeuSM1QxPJ",
      nickname: "User_1844xx7",
      score: 665,
    },
    {
      rank: 5,
      profileImage:
        "https://drive.google.com/uc?export=view&id=1E1ScXZsSMEIv0YdRJjWoiCqaSFKVePQv",
      nickname: "Jinx*|Pro-Amanda",
      score: 620,
    },
    {
      rank: 23,
      profileImage:
        "https://drive.google.com/uc?export=view&id=1lglBhXaLprO4BfhbGJhJOAwyXQJOTscB",
      nickname: "Joko Susanto",
      score: 412,
    },
  ];

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
      {players.map((player) => (
        <ListLeaderboardItem
          key = {player.rank}
          rank={player.rank}
          profileImage={player.profileImage}
          nickname={player.nickname}
          score={player.score}
        />
      ))}
    </View>
  );
};

export default ListLeaderboard;


