import React, { createContext, useState, useContext, useEffect } from 'react';
import Themes from '../components/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('greenForest');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem("themeName");
                if (savedTheme && Themes[savedTheme]) {
                    setThemeName(savedTheme);
                } 
            } catch (error) {
                console.error("Error loading theme", error);
            }
        };
        loadTheme();
    }, []);

    const setTheme = async (newTheme) => {
        if (Themes[newTheme]) {
            setThemeName(newTheme);
            try {
                await AsyncStorage.setItem("themeName", newTheme);
            } catch (error) {
                console.error("Error saving theme", error);
            }
        }
    };

    const theme = Themes[themeName];

    return(
        <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);