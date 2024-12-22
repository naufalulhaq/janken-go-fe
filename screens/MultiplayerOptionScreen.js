import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MultiplayerOption } from "../components/MultiplayerOption";

const { height: screenHeight } = Dimensions.get("window");

const MultiplayerOptionScreen = () => {
  return (
    <View style={{flex:1}}>
      <MultiplayerOption />
    </View>
  );
};

export default MultiplayerOptionScreen;


