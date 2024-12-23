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

const { height: screenHeight } = Dimensions.get("window");

export const MultiplayerOption = () => {
  const [code, setCode] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require("../assets/Rectangle 15.png")}
          style={styles.imageBackground}
        >
          <View style={styles.headerContainer}>
            <ProfileHeader />
          </View>

          <View style={styles.hostSection}>
            <Text style={styles.title}>Be the host!</Text>
            <Text style={styles.title}>To make the first throw</Text>

            <TouchableOpacity style={[styles.button, { marginTop: 35 }]}>
              <Text style={styles.buttonText}>Host a match</Text>
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Join the match</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008C47",
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
    color: "white",
  },
  button: {
    backgroundColor: "#004E28",
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
    color: "#FFE8CE",
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
