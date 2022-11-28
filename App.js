import React, {useState} from 'react';
import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import userFitnessGoal from './screens/userFitnessGoal';
import userGwh from './screens/userGwh';
import userAllergies from './screens/userAllergies';
import userDiet from './screens/userDiet';
import userIng from './screens/userIng';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
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
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="userFitnessGoal" component={userFitnessGoal} />
        <Stack.Screen name="userGwh" component={userGwh} />
        <Stack.Screen name="userAllergies" component={userAllergies} />
        <Stack.Screen name="userDiet" component={userDiet} />
        <Stack.Screen name="userIng" component={userIng} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
