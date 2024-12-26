import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { updateNickname } from "../api/restApi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import HistoryAtProfile from "../components/HistoryAtProfile";

const { height: screenHeight } = Dimensions.get("window");

const ProfileScreen = () => {
  const [newName, setNewName] = useState("");
  const { theme, themeName, setTheme } = useTheme();
  const { userData, fetchUser } = useAuth();

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: 48,
      alignItems: "center",
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 24,
    },
    profileImage: {
      width: 128,
      height: 128,
      borderRadius: 64,
    },
    formContainer: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 16,
    },
    inputNicknameContainer: {
      height: 48,
      width: 268,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFE8CE",
      borderRadius: 24,
      paddingHorizontal: 16,
    },
    inputNickname: {
      fontSize: 16,
      fontFamily: "poppins",
      fontWeight: 700,
      color: theme.primary,
    },
    buttonContainer: {
      height: 48,
      width: 268,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      borderRadius: 24,
      elevation: 8,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: "poppins",
      fontWeight: 700,
      color: "#FFE8CE",
    },
  });

  const handleSaveName = async () => {
    try {
      const updatedData = await updateNickname(newName);
      await fetchUser();
      alert("Nickname updated successfully!");
    } catch (error) {
      console.error("Failed to update nickname", error.message);
      alert("Failed to update nickname. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScreenHeader ScreenName="Profile" />
      <Image
        source={{ uri: userData.avatar_url }}
        style={styles.profileImage}
      />
      <View style={styles.formContainer}>
        <View style={styles.inputNicknameContainer}>
          <TextInput
            style={styles.inputNickname}
            placeholder={userData.nickname}
            placeholderTextColor={theme.primary}
            onChangeText={(text) => setNewName(text)}
            value={newName}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSaveName}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <HistoryAtProfile />
    </View>
  );
};

export default ProfileScreen;
