import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { getUser } from "../api/restApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const login = async (token) => {
    setUser(token);
    setIsLoggedIn(true);
    await AsyncStorage.setItem("userToken", token);
  };
  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("userToken");
  };

  const refreshToken = async () => {
    console.log("Refreshing token...");
    api.defaults.headers.common["Authorization"] = `Bearer ${user}`;
  };

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch user data: ", error.message);
    }
  };

  useEffect(() => {
    refreshToken();
    if (user) {
        fetchUser()
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser, userData, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
