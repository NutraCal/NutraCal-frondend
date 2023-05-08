import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import dim from '../util/dim';

export default function StepCount() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: (200 / dim.w) * dim.Width,
          height: (200 / dim.h) * dim.Height,
          marginBottom: (30 / dim.h) * dim.Height,
          marginTop: (20 / dim.h) * dim.Height,
        }}
        source={require('../assets/images/walk.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (20 / dim.h) * dim.Height,
  },
});
