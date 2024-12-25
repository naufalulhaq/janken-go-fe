import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://54.254.8.9/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPosts = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token:", token);
    const response = await api.get("/users/current");
    console.log("Testing 2");
    //return response.data;
    console.log("Response data:", response.data);

    // Ambil data pengguna dari respons
    const userData = response.data.data;
    console.log("Nickname adalah:", userData.nickname);

    return userData;
  } catch (error) {
    throw new Error("Failed to fetch data: " + error.message);
  }
};

export const updateNickname = async (newNickname) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token:", token);
    const response = await api.put("/users", { nickname: newNickname });
    console.log("Nickname terbaru ", newNickname);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update nickname: " + error.message);
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message); // Debugging log
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const register = async (email, password) => {
  console.log("Payload received in register API:", { email, password }); //
  try {
    const response = await api.post("/auth/register", {
      email: email,
      password: password,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Registration API error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const fetchLeaderboard = async () => {
  console.log("Fetching leaderboard data...");
  try {
    const response = await api.get("/leaderboard", { params: { limit: 5 } });
    console.log("Leaderboard data (api):", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
};

export default api;
