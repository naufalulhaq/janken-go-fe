import React, { createContext, useState, useContext } from 'react';
import Themes from '../components/Themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('greenForest');

    const setTheme = (newTheme) => {
        if (Themes[newTheme]) {
            setThemeName(newTheme);
        }
    }

    const theme = Themes[themeName];

    return(
        <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);