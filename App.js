import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
  
     <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Register'
        component={Register}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
     </NavigationContainer>
    
  );
}


