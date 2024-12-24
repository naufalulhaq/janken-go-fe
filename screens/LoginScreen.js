import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FormAuth } from "../components/FormAuth";

const LoginScreen = () => {
  return (
    <View style={{flex:1}}>
      <FormAuth state='login'></FormAuth>
    </View>
  );
};

export default LoginScreen;
