import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import MultiPlayerScreen from './screens/MultiPlayerScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SinglePlayerScreen/>
      <StatusBar style="auto" />
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
