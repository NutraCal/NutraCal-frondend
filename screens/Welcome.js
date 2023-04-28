import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Intro from './Intro';
import dim from '../util/dim';

const Welcome = ({navigation, route}) => {
  setTimeout(() => {
    navigation.navigate('Intro');
  }, 2000);
  return (
    <View style={styles.MainDiv}>
      <Text style={styles.logo}>NutraCal</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  MainDiv: {
    backgroundColor: '#91C788',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 43,
    fontFamily: 'Inter-ExtraBold',
  },
});
export default Welcome;
