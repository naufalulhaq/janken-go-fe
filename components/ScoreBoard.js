import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreBoard = ({ title, score }) => (
  <View style={styles.container}>
    <Text style={styles.score}>{score}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    padding: 0, 
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004E28',
  },
});

export default ScoreBoard;
