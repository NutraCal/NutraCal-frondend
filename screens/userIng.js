import React, {useState} from 'react';
import userGwh from './userGwh';
import userAllergies from './userAllergies';
import userDiet from './userDiet';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const userIng = ({navigation, route}) => {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
};

export default userIng;
