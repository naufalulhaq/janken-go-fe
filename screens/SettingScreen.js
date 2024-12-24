import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import ThemeOptions from "../components/ThemeOptions";
import LogoutButton from "../components/LogoutButton";
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext'

const { height: screenHeight } = Dimensions.get("window");

const SettingScreen = () => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      minHeight: screenHeight,
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      backgroundColor: theme.background,
      paddingTop: 28,
      paddingHorizontal: 32,
    },
    content: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <PageHeader>Setting</PageHeader>
      <ThemeOptions></ThemeOptions>
      <LogoutButton></LogoutButton>
    </View>
  );
}



export default SettingScreen