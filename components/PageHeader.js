import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';


const PageHeader = ({ children }) => {
  const { theme, themeName, setTheme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      height: 48,
      width: 296,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFE8CE",
      borderRadius: 24,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.primary,
    },
  });
  
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{ children }</Text>
      </View>
    </View>
  );
}



export default PageHeader