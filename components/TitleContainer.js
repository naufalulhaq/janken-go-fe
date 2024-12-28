import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TitleContainer = ({ children, source }) => {
  return (
    <View style={styles.titleContainer}>
      <Image style={styles.circle} source={source}></Image>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: "#fde8ce", // Beige background
    borderRadius: 50, // Rounded edges
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 6, // Shadow radius
    elevation: 4, // For Android shadow
    alignSelf: "flex-start", // Adjust size to content
  },
  circle: {
    width: 40, // Diameter of the circle
    height: 40, // Diameter of the circle
    backgroundColor: "#9fc4d9", // Light blue circle
    borderRadius: 20, // Makes the shape a circle (radius = half of diameter)
    marginRight: 10, // Space between circle and text
  },
  titleText: {
    fontFamily: "Arial", // Font family
    fontSize: 18, // Font size
    fontWeight: "bold", // Bold text
    color: "#2b4f2c",
    paddingHorizontal: 50, // Green text
  },
});

export default TitleContainer;
