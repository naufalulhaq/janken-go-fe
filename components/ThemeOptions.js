import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'


export default function ThemeOptions() {
    const { theme, themeName, setTheme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your theme here:</Text>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#004E28'}]} onPress={() => setTheme("greenForest")}>
                <Text style={styles.textButton}>Green Froest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#B84069'}]} onPress={() => setTheme("pinkCandy")}>
                <Text style={styles.textButton}>Pink Candy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#002B47'}]} onPress={() => setTheme("blueOcean")}>
                <Text style={styles.textButton}>Blue Ocean</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        width: "100%",
        marginTop: 144
    },
    title: {
        color: "#FFE8CE",
        fontWeight: "600",
        fontSize: 20
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        width: "100%",
        borderRadius: 24,
        elevation: 8,
    },
    textButton : {
        color: "#FFE8CE",
        fontWeight: "600",
        fontSize: 16,
    }
})








