import React, {useState} from 'react';
import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import userFitnessGoal from './screens/userFitnessGoal';
import userGwh from './screens/userGwh';
import userAllergies from './screens/userAllergies';
import userDiet from './screens/userDiet';
import userIng from './screens/userIng';
import register from './screens/register';
import Login from './screens/Login';
import Home from './screens/homeDummy';
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

export default function App() {

    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#FFF',
      },
    };

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
        <Stack.Screen name="register" component={register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

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
