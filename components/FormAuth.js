import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_900Black,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Alert } from "react-native";
import { register, login } from "../api/restApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FormAuth = ({ state }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

  // TOKEN
  const setLoginState = (token) => {
    console.log("Login token:", token);
   }

  //handleSubmit Auth
   const handleSubmit = () => {
    if (state === 'login') {
      console.log("handleSubmit login")
      handleLogin();
    } else if (state === 'register') {
      console.log("Calling handleRegister..."); //
      handleRegister();
      console.log("handleSubmit reg")

    } else {
      alert('Invalid state: Please specify "login" or "register"');
      console.log("handleSubmit error")

    }
  };

  //handleLogin Auth
  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await login(payload); // Ensure the payload matches API expectation
      console.log("Token received:", response.data.token);
      const token = typeof response.data.token === "string" ? response.data.token : JSON.stringify(response.data.token);
      await AsyncStorage.setItem('token', token); // Use `await` for AsyncStorage
      navigation.navigate("TabNavigation");
    } catch (error) {
      alert(error.message || 'Login failed'); // Display specific error
      console.error("Login failed:", error.message || error); // Debugging log
    }
  };

  //handleLogin ONLY VALIDATION
  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Error", "Please enter both email and password.");
  //     return;
  //   }
  // };

  const handleRegister = async () => {
    console.log("handleRegister called");
    const payload = {
      email: email.trim(),
      password: password.trim()
    };
    console.log("Payload prepared:", payload);

    if (!email.includes('@')) {
      console.log("Validation error: Email is invalid");
        Alert.alert('Validation Error', 'Please enter a valid email address.');
        return;
    }
    if (password.length < 6) {
      console.log("Validation error: Password is invalid");
        Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
        return;
    }

    try {
      console.log("Sending registration request to API...");
        const response = await register(payload.email, payload.password); // Panggil fungsi register
        console.log("Registration successful:", response);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login'); // Navigasi ke layar login
        console.log('Register successful')
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
        Alert.alert('Error', error.message || 'Registration failed.'); // Tampilkan pesan error
    }
  };

  //handleRegister ONLY VALIDATION
  // const handleRegister = async () => {
  //   if (!email || !password || !confirmPassword) {
  //     Alert.alert("Error", "Please enter both email and password.");
  //     return;
  //   }
  // };
  //   const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   if (!email || !validEmail) {
  //       errors.messageEmailError= 'Email tidak sesuai'
  //   }

  // const validPassword = password.length > 7
  //   if (!validPassword) {
  //       errors.messagePasswordError= 'Password kurang dari 7'
  //   }

  // const validConfirmedPassword = confirmPassword === password
  // if (!validConfirmedPassword) {
  //     errors.messageConfirmedError= 'Password tidak sama'
  // }

  // if (Object.keys(errors).length > 0) {
  //   setErrors(errors);
  //   return;
  // }

  // // Jika semua validasi lolos
  // setErrors({}); // Kosongkan error
  // };

  // const validate = () => {
  //   // Todo: bikin validasi untuk name minimal 3 karakter, validasi format email
  //   const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   if (!validEmail) {
  //     setErrors({
  //       messageEmailError: 'Email tidak sesuai'
  //     })
  //     return false;
  //   }
  //   const validPassword = password.length > 7 ? true : false;
  //   if (!validPassword) {
  //     setErrors({
  //       messagePasswordError: 'Password kurang dari 7'
  //     })
  //     return false;
  //   }
  //   handleLogin (email, password);

  // }
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        messageEmailError: "Email tidak sesuai",
      }));
    } else {
      setErrors((prevErrors) => {
        const { messageEmailError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 7) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        messagePasswordError: "Password harus minimal 7 karakter",
      }));
    } else {
      setErrors((prevErrors) => {
        const { messagePasswordError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        messageConfirmedError: "Password tidak sama",
      }));
    } else {
      setErrors((prevErrors) => {
        const { messageConfirmedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Janken-Go</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Group 14.png")}
          style={styles.image}
        ></Image>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}> Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            backgroundColor="#FFE8CE"
          />
          {errors.messageEmailError && (
            <Text style={styles.errorText}>{errors.messageEmailError}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            backgroundColor="#FFE8CE"
            secureTextEntry
          />
          {errors.messagePasswordError && (
            <Text style={styles.errorText}>{errors.messagePasswordError}</Text>
          )}
        </View>

        {state === "register" && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              backgroundColor="#FFE8CE"
              secureTextEntry
            />
            {errors.messageConfirmedError && (
              <Text style={styles.errorText}>
                {errors.messageConfirmedError}
              </Text>
            )}
          </View>
        )}

        <View style={styles.buttonContainer}>
          {state === "register" ? (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        {state === "login" && (
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity style={styles.buttonGoogle} onPress={handleSubmit}>
              <Image
                source={require("../assets/Group.png")}
                style={{ width: 16, height: 16 }}
              ></Image>
              <Text style={[styles.buttonText, { color: "#004E28" }]}>
                Sign in with Google
              </Text>
            </TouchableOpacity>

            <Text style={styles.textUnder}>
              Don't have an account?
              <Text
                style={styles.textUnderLink}
                onPress={() => navigation.navigate("Register")}
              >
                {" "}
                Sign Up
              </Text>
            </Text>
          </View>
        )}

        {state === "register" && (
          <Text style={styles.textUnder}>
            Already have an account?
            <Text
              style={styles.textUnderLink}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Sign In
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008C47",
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 40,
    color: "#FFE8CE",
    fontFamily: "Poppins_900Black",
    textAlign: "center",
  },
  imageContainer: {
    paddingTop: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 212.61,
    height: 174,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFE8CE",
  },
  input: {
    width: 268,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#FFE8CE",
    elevation: 5,
    paddingHorizontal: 16,
  },
  inputContainer: {
    paddingTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    paddingTop: 30,
  },
  button: {
    justifyContent: "center",
    width: 267,
    height: 48,
    backgroundColor: "#004E28",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFE8CE",
    textAlign: "center",
  },
  buttonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: 267,
    height: 48,
    backgroundColor: "#FFE8CE",
    borderRadius: 100,
    borderColor: "#004E28",
    borderWidth: 2,
    elevation: 5,
  },
  textUnder: {
    color: "#FFE8CE",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
  },
  textUnderLink: {
    color: "white",
    fontWeight: 700,
  },
});
