import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchPosts } from "../api/restApi";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileHeader = () => {
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState("Loading..."); // Default text sementara
  const isFocused = useIsFocused();  // Hook untuk memantau apakah layar sedang aktif
  const playerProfile =
    "https://lh3.googleusercontent.com/d/1tBzDMDdAjlkIcmliHmlH2ljeuSM1QxPJ";

  // Mengambil data dari API
  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const data = await fetchPosts(); // Mengambil data dari API
        // Asumsikan data mengandung properti nickname
        const nickname = data?.nickname || "Unknown Player";
        setPlayerName(nickname); // Mengatur playerName dari hasil API
      } catch (error) {
        console.error("Failed to fetch player data:", error.message);
      }
    };

    getPlayerData();
  }, []); // Dipanggil hanya sekali saat komponen dirender

  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Profile")}>
      <Image
        source={{ uri: playerProfile }}
        style={styles.profileImage}
      ></Image>
      <Text style={styles.profileText}>Hi, {playerName}</Text>
    </TouchableOpacity>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 16,
    height: 48,
    width: 212,
    backgroundColor: "#FFE8CE",
    borderRadius: 24,
  },
  profileImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  profileText: {
    fontSize: 16,
    fontFamily: "poppins",
    fontWeight: 700,
    color: "#004E28",
  },
});
