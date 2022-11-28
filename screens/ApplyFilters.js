import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function ApplyFilters() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is Apply Filters Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});