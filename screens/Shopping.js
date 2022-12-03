import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';



export default function AddRecipe() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is Shopping Help Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
  },
});
