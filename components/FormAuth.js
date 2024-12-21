import React from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_900Black } from '@expo-google-fonts/poppins';
import { Alert } from 'react-native';

export const FormAuth = ({state}) => {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')  
  const [errors, setErrors] = useState({})
  // const setLoginState = (token) => {
  //   console.log("Login token:", token);
  //  }

  //  const handleSubmit = () => {
  //   if (state === 'login') {
  //     console.log("handleSubmit login")
  //     handleLogin();
  //   } else if (state === 'register') {
  //     console.log("Calling handleRegister..."); //
  //     handleRegister();
  //     console.log("handleSubmit reg")

  //   } else {
  //     alert('Invalid state: Please specify "login" or "register"');
  //     console.log("handleSubmit error")

  //   }
  // };

  // const handleLogin = async () => {
  //   const payload = {
  //     email: email,
  //     password: password,
  //   };
  
  //   try {
  //     const response = await login(payload); // Ensure the payload matches API expectation
  //     console.log("Token received:", response.data.token);
  //     const token = typeof response.data.token === "string" ? response.data.token : JSON.stringify(response.data.token);
  //     await AsyncStorage.setItem('token', token); // Use `await` for AsyncStorage
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     alert(error.message || 'Login failed'); // Display specific error
  //     console.error("Login failed:", error.message || error); // Debugging log
  //   }
  // };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  };
  
  // const handleRegister = async () => {
  //   console.log("handleRegister called");
  //   const payload = {
  //     email: email.trim(),
  //     password: password.trim()
  //   };
  //   console.log("Payload prepared:", payload);

  //   if (!email.includes('@')) {
  //     console.log("Validation error: Email is invalid");
  //       Alert.alert('Validation Error', 'Please enter a valid email address.');
  //       return;
  //   }
  //   if (password.length < 6) {
  //     console.log("Validation error: Password is invalid");
  //       Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
  //       return;
  //   }

  //   try {
  //     console.log("Sending registration request to API...");
  //       const response = await register(payload.email, payload.password); // Panggil fungsi register
  //       console.log("Registration successful:", response);
  //       Alert.alert('Success', 'Registration successful!');
  //       navigation.navigate('Login'); // Navigasi ke layar login
  //       console.log('Register successful')
  //   } catch (error) {
  //     console.error("Error during registration:", error.response?.data || error.message);
  //       Alert.alert('Error', error.message || 'Registration failed.'); // Tampilkan pesan error
  //   }
  // };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  }
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
      setErrors((prevErrors) => ({ ...prevErrors, messageEmailError: 'Email tidak sesuai' }));
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
      setErrors((prevErrors) => ({ ...prevErrors, messagePasswordError: 'Password harus minimal 7 karakter' }));
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
        messageConfirmedError: 'Password tidak sama',
      }));
    } else {
      setErrors((prevErrors) => {
        const { messageConfirmedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };
  
  return (
    
      <View style = {{flex:1, backgroundColor:'#008C47', justifyContent:'center'}}>
        <View style={{justifyContent:'center', alignItems:'center', paddingTop:30}}>
          <Text style={{fontSize:40, color:'#FFE8CE', fontFamily:'Poppins_900Black', textAlign:'center'}}>Janken-Go</Text>
        </View>
        <View style={{paddingTop:38, justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../assets/Group 14.png')} style={{width:212.61, height:174}}></Image>  
        </View>

        <View style={{justifyContent:'center', alignItems:'center', paddingTop:24}}>
          <View>
            <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'semibold', color:'#FFE8CE'}}>Email</Text>
            <TextInput
            style={{width:268, height:48, borderRadius:100, backgroundColor:'#FFE8CE', elevation:5}}
            placeholder=''
            value={email}
            onChangeText={handleEmailChange}
            // onChangeText={(text) => setEmail (text)}
            backgroundColor='#FFE8CE'
            />
            {errors.messageEmailError && (
            <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.messageEmailError}</Text>
            )}
          </View>

          <View style={{paddingTop:20}}>
            <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'semibold', color:'#FFE8CE'}}>Password</Text>
            <TextInput
            style={{width:268, height:48, borderRadius:100, backgroundColor:'#FFE8CE', elevation:5}}
            placeholder=''
            value={password}
            onChangeText={handlePasswordChange}
            // onChangeText={(text) => setPassword (text)}
            backgroundColor='#FFE8CE'
            secureTextEntry
            />
            {errors.messagePasswordError && (
            <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.messagePasswordError}</Text>
            )}
          </View>

          {state === 'register' &&
          <View style={{paddingTop:20}}>
            <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'semibold', color:'#FFE8CE'}}>Confirm Password</Text>
            <TextInput
            style={{width:268, height:48, borderRadius:100, backgroundColor:'#FFE8CE', elevation:5}}
            placeholder=''
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            // onChangeText={(text) => setConfirmPassword (text)}
            backgroundColor='#FFE8CE'
            secureTextEntry
            />
            {errors.messageConfirmedError && (
          <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.messageConfirmedError}</Text>
          )}
          </View>
          }

          <View style={{paddingTop:30}}>
            {state === 'register'?
          <TouchableOpacity style={{justifyContent: 'center',width:267, height:48,backgroundColor:'#004E28', borderRadius:100}} onPress={handleRegister}>
            <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'semibold', color:'#FFE8CE', textAlign:'center', justifyContent:'center'}}>Sign Up</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{justifyContent: 'center',width:267, height:48,backgroundColor:'#004E28', borderRadius:100}} onPress={handleLogin}>
            <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'semibold', color:'#FFE8CE', textAlign:'center', justifyContent:'center'}}>Sign In</Text>
          </TouchableOpacity>             
            }
          </View>

          {state === 'login' &&
          <View style={{paddingTop:20}}>
          <TouchableOpacity style = {{flexDirection:'row', justifyContent: 'center',width:267, height:48,backgroundColor:'#FFE8CE', borderRadius:100}} onPress={handleLogin}>
          <View style={{justifyContent:'center', width:30}}>
          <Image source={require('../assets/Group.png')} style={{width:16, height:16}}></Image>
          </View>
          <View style={{justifyContent:'center'}}>
          <Text style={{fontFamily:'Poppins', fontWeight:'semibold', fontSize:16, color:'#004E28', textAlign:'center', alignSelf:'center'}}>Sign in with Google</Text>
          </View>
          </TouchableOpacity> 

          <View style={{flexDirection:'row', justifyContent:'center', paddingTop:20}}>
            <Text style={{color:'#FFE8CE', fontFamily:'Poppins', fontSize:14}}>Don't have an account?</Text>
            <Text style={{color: 'white'}} onPress={() => navigation.navigate('Register')}> Sign Up</Text>
          </View>
          </View> 
          }

          {state === 'register' &&
        <View style={{paddingTop:20}}>
          <View style={{flexDirection:'row', justifyContent:'center', paddingTop:20}}>
          <Text style={{color:'#FFE8CE', fontFamily:'Poppins', fontSize:14}}>Already have an account?</Text>
          <Text style={{color: 'white'}} onPress={() => navigation.navigate('Login')}> Sign In</Text>
          </View>
        </View>
          }
            
        </View>
      </View>
  )
  
}