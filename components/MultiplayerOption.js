import ProfileHeader from "./ProfileHeader";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { generateRoomCode } from "../utils/roomCodeGenerator";

const { height: screenHeight } = Dimensions.get("window");

export const MultiplayerOption = () => {
  const { theme, themeName, setTheme } = useTheme();
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const imageUrl = () => {
    switch (themeName) {
      case "greenForest":
        return require("../assets/multioptions-bg-green.png");
      case "pinkCandy":
        return require("../assets/multioptions-bg-pink.png");
      case "blueOcean":
        return require("../assets/multioptions-bg-blue.png");
      default:
        return require("../assets/multioptions-bg-green.png");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    imageBackground: {
      flex: 1,
    },
    headerContainer: {
      paddingLeft: 20,
      paddingTop: 30,
    },
    hostSection: {
      height: 400,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: 24,
      color: theme.neutral,
    },
    button: {
      backgroundColor: theme.primary,
      width: 268,
      height: 48,
      borderRadius: 100,
      justifyContent: "center",
      marginTop: 16,
    },
    buttonText: {
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "bold",
      color: theme.neutral,
      textAlign: "center",
    },
    buttonSecondary: {
      backgroundColor: theme.neutral,
      width: 268,
      height: 48,
      borderRadius: 100,
      justifyContent: "center",
      marginTop: 16,
    },
    buttonTextSecondary: {
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      textAlign: "center",
    },
    joinSection: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      paddingBottom: 48,
    },
    input: {
      backgroundColor: "#FFE8CE",
      width: 264,
      height: 48,
      borderRadius: 24,
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "bold",
      color: "#FEB96B",
      marginTop: 25,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground source={imageUrl()} style={styles.imageBackground}>
          <View style={styles.headerContainer}>
            <ProfileHeader />
          </View>

          <View style={styles.hostSection}>
            <Text style={styles.title}>Be the host!</Text>
            <Text style={styles.title}>To make the first throw</Text>

            <TouchableOpacity
              style={[styles.buttonSecondary, { marginTop: 35 }]}
              onPress={() =>
                navigation.navigate("MultiplayerScreen", {
                  isHost: true,
                  roomCode: generateRoomCode(),
                })
              }
            >
              <Text style={styles.buttonTextSecondary}>Host a match</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <KeyboardAvoidingView style={styles.joinSection}>
          <Text style={styles.title}>Got the code?</Text>
          <Text style={styles.title}>Jump in and play!</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your code here..."
            placeholderTextColor={"#FEB96B"}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("MultiplayerScreen", {
                isHost: false,
                roomCode: code,
              })
            }
          >
            <Text style={styles.buttonText}>Join the match</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
