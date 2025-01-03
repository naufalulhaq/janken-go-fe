import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://54.254.8.9/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async () => {
  console.log("Fetching user data...");
  try {
    const response = await api.get("/users/current");
    const userData = response.data.data;
    console.log("User data fetched!");
    return userData;
  } catch (error) {
    console.log("Failed to fetch user data:", error.message);
    throw new Error("Failed to fetch data: " + error.message);
  }
};

export const updateNickname = async (newNickname) => {
  console.log("Updating nickname...");
  try {
    const response = await api.put("/users", { nickname: newNickname });
    console.log("Nickname updated!");
    return response.data;
  } catch (error) {
    throw new Error("Failed to update nickname: " + error.message);
  }
};

export const login = async (data) => {
  console.log("Sending login request to API...");
  try {
    const response = await api.post("/auth/login", data);
    console.log("Login succeed!");
    return response.data;
  } catch (error) {
    // console.error("Error during login:", error.response?.data || error.message); // Debugging log
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const register = async (email, password) => {
  console.log("Sending registration request to API...");
  try {
    const response = await api.post("/auth/register", {
      email: email,
      password: password,
    });
    console.log("Register succeed!");
    return response.data;
  } catch (error) {
    // console.error(
    //   "Registration API error:",
    //   error.response?.data || error.message
    // );
    throw new Error(error.response?.data?.message || error.response?.data?.errors[0]?.message || "Registration failed");
  }
};

export const fetchLeaderboard = async () => {
  console.log("Fetching leaderboard data...");
  try {
    const response = await api.get("/leaderboard", { params: { limit: 5 } });
    console.log("Leaderboard data fetched!");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
};

export const fetchHistory = async () => {
  console.log("Fetching history data...");
  try {
    const response = await api.get("/games/history");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch history data:", error);
    throw new Error("Failed to fetch history data");
  }
};

export const createGameOffline = async (data) => {
  try {
    const response = await api.post("/games/create/offline", data);
    return response.data;
  } catch (error) {
    console.error(
      "Error Creating Game:",
      error.response?.data || error.message
    ); // Debugging log
    throw new Error(error.response?.data?.error || "Game Creation Failed");
  }
};

export const saveGame = async (data) => {
  try {
    const response = await api.post("/games/save", data);
    return response.data;
  } catch (error) {
    console.error("Error Saving Game:", error.response?.data || error.message); // Debugging log
    throw new Error(error.response?.data?.error || "Game Saving Failed");
  }
};

export default api;
