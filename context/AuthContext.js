import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  const login = async (token) => {
    setUser({ token });
    await AsyncStorage.setItem('userToken', token);

  };
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
//export const useAuth = () => useContext(AuthContext);