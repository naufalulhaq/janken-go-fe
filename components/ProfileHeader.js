import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/avatars/placeholder.png")}
        style={styles.profileImage}
      ></Image>
      <Text style={styles.profileText}>Hi, Joko Susanto!</Text>
    </View>
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
    borderRadius: 24
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
    color: "#004E28"
  },
});
