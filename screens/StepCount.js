import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function StepCount() {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 200, height: 200, marginBottom: 30, marginTop: 20}}
        source={require('../assets/images/walk.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
