import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <View>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
