import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = AsyncStorage.getItem('token')

const api = axios.create({
    baseURL: 'http://54.254.8.9/api/v1',
    headers: {
        'Content-Type' : 'application/json',
        Authorization: 'Bearer' + token
    }
});

export const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token)
        const response = await api.get('/users/current', {
          headers: {Authorization: `Bearer ${token}`}
        });
        console.log('Testing 2')
        //return response.data;
        console.log('Response data:', response.data);

        // Ambil data pengguna dari respons
        const userData = response.data.data;
        console.log('Nickname adalah:', userData.nickname);

        return userData;
    } catch (error) {
        throw new Error('Failed to fetch data: ' + error.message)
    }
};

export const updateNickname = async (newNickname) => {
  try {
    const token = await AsyncStorage.getItem('token');
      console.log('Token:', token)
    const response = await api.put('/users', { nickname: newNickname}, {headers: {Authorization : `Bearer ${token}`}});
    console.log('Nickname terbaru ', newNickname)

    return response.data;
  } catch (error) {
    throw new Error('Failed to update nickname: ' + error.message);
  }
}

export const createPost = async (postData) => {
    try {
      const response = await api.post('/users', postData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post: ' + error.message);
    }
  };
  
  {/* */}
  export const login = async (data) => {
    console.log("Payload sent to API:", data); // Debugging log
    try {
      const response = await api.post('/auth/login', data); // Send `data` directly
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message); // Debugging log
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };
  
  
  export const register = async (email, password) => {
    console.log("Payload received in register API:", { email, password }); //
    try {
      const response = await api.post('/auth/register', { 
        email: email, 
        password:password});
        console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  

export default api;
