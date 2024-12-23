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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeader from "../components/ScreenHeader";

const { height: screenHeight } = Dimensions.get("window");

const ProfileScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const [newName, setNewName] = useState("");

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
  const playerProfile =
    "https://drive.google.com/uc?export=view&id=1E1ScXZsSMEIv0YdRJjWoiCqaSFKVePQv";

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScreenHeader ScreenName="Profile" />
      <Image source={{ uri: playerProfile }} style={styles.profileImage} />
      <View style={styles.formContainer}>
        <View style={styles.inputNicknameContainer}>
          <TextInput
            style={styles.inputNickname}
            placeholder={playerName}
            placeholderTextColor="#004E28"
            onChangeText={(text) => setNewName(text)}
            value={newName}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 48,
    alignItems: "center",
    backgroundColor: "#008C47",
    paddingTop: 28,
    paddingHorizontal: 16,
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
    color: "#004E28",
  },
  buttonContainer: {
    height: 48,
    width: 268,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004E28",
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