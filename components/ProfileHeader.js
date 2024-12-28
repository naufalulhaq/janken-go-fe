import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../api/restApi";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const ProfileHeader = () => {
  const { theme, themeName, setTheme } = useTheme();
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState("Loading..."); // Default text sementara
  const isFocused = useIsFocused();  // Hook untuk memantau apakah layar sedang aktif
  const playerProfile =
    "https://lh3.googleusercontent.com/d/1tBzDMDdAjlkIcmliHmlH2ljeuSM1QxPJ";
  const { userData } = useAuth();

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
      color: theme.primary,
    },
  });
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Profile")}>
      <Image
        source={{ uri: userData.avatar_url }}
        style={styles.profileImage}
      ></Image>
      <Text style={styles.profileText}>Hi, {userData.nickname}</Text>
    </TouchableOpacity>
  );
};

export default ProfileHeader;
