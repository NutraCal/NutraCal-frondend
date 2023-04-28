import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import dim from '../util/dim';

export default function Calories() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (8 / dim.h) * dim.Height,
  },
});
