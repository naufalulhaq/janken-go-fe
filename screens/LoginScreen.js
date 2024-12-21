import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FormAuth } from "../components/FormAuth";

export default function Login({navigation}) {
  return (
    <View style={{flex:1}}>
      <FormAuth state='login'></FormAuth>
    </View>
  )
}