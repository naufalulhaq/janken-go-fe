import ProfileHeader from "./ProfileHeader";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export const MultiplayerOption = () => {
    const [code, setCode] = useState('')
    return (
<View style={{backgroundColor:'#008C47', height: screenHeight}}>
    <ImageBackground source={require('../assets/Rectangle 15.png')}>
      <View>

        <View style={{paddingLeft:20, paddingTop:30}}>
        <ProfileHeader />
        </View>

        <View style={{height:400, justifyContent:'center', alignItems:'center'}}>
        <View>
        <Text style={{textAlign:'center', fontFamily:'Poppins', fontWeight:'bold', fontSize:24, color:'white'}}>Be the host!</Text>
        <Text style={{textAlign:'center', fontFamily:'Poppins', fontWeight:'bold', fontSize:24, color:'white'}}>To make the first throw</Text>
        </View>

        <View style={{paddingTop:35}}>
            <TouchableOpacity style={{backgroundColor:'#004E28', width:268, height:48, borderRadius:100, justifyContent:'center'}}>
                <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'bold', color:'#FFE8CE', textAlign:'center'}}>Host a match</Text>
            </TouchableOpacity>
        </View>
        </View>

      </View>
    </ImageBackground>

    <View style={{justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center', fontFamily:'Poppins', fontSize:24, fontWeight:'bold', color:'white'}}>Got the code?</Text>
            <Text style={{textAlign:'center', fontFamily:'Poppins', fontSize:24, fontWeight:'bold', color:'white'}}>Jump in and play!</Text>
        </View>

        <View style={{justifyContent:'center', alignItems:'center', paddingTop:25}}>
            <TextInput
            style={{backgroundColor:'#FFE8CE', width:264, height:48, borderRadius:100, textAlign:'center', fontFamily:'Poppins', fontSize:16, fontWeight:'bold', color:'#FEB96B'}}
            placeholder="Enter your code here..."
            placeholderTextColor={'#FEB96B'}
            value={code}
            onChangeText={setCode}
            />
        </View>

        <View style={{paddingTop:20, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#004E28', width:264, height:48, borderRadius:100, justifyContent:'center'}}>
                <Text style={{fontFamily:'Poppins', fontSize:16, fontWeight:'bold', color:'#FFE8CE', textAlign:'center'}}>Join the match</Text>
            </TouchableOpacity>
        </View>

    </View>
</View>
    );
  };


const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight,
    flexDirection: "column",
    // justifyContent: "",
    // alignItems: "center",
    backgroundColor: "#008C47",
    paddingTop: 28,
    paddingHorizontal: 16,
  },
});