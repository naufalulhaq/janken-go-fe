import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MatchOptions = () => {
  return (
    <View style={styles.container}>
      {/* Single player */}
      <View style={styles.optionCard}>
        <Image
          source={require("../assets/match/singleplayer.png")}
          style={styles.cardImage}
        />
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardText}>Single Player</Text>
        </TouchableOpacity>
      </View>
      {/* Multi player */}
      <View style={styles.optionCard}>
        <Image
          source={require("../assets/match/multiplayer.png")}
          style={styles.cardImage}
        />
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardText}>Multi Player</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    marginTop: 100,
    // justifyContent: "center",
    // backgroundColor: "red",
  },
  optionCard: {
    flexDirection: "column",
    gap: 8,
  },
  cardImage: {
    height: 112,
    width: 260,
    borderRadius: 8,
    // backgroundColor: "#B0C6D5",
  },
  cardButton: {
    alignContent: "center",
    justifyContent: "center",
    height: 80,
    width: 260,
    borderRadius: 8,
    backgroundColor: "#FFE8CE",
    elevation: 4,
  },
  cardText: {
    color: "#004E28",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: 700,
  },
});
