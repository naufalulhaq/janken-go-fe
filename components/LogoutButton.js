import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";


export default function LogoutButton() {
    const { theme, themeName, setTheme } = useTheme();
    const { logout: authLogout } = useAuth();

    const styles = StyleSheet.create({
        container: {
            marginTop: 56,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        },
        button: {
            justifyContent: "center",
            alignItems: "center",
            height: 48,
            width: "100%",
            borderRadius: 24,
            elevation: 8,
            backgroundColor: "#FFE8CE",
            flexDirection: "row",
            gap: 8
        },
        textButton : {
            color: theme.primary,
            fontWeight: "600",
            fontSize: 16,
        },
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={authLogout}> 
                <Icon name="log-out-outline" size={32} color={theme.primary}></Icon>
                <Text style={styles.textButton}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}








