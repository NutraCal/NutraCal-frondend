import * as React from 'react';
import {SafeAreaView,Platform,ScrollView,StatusBar,Image,StyleSheet,TouchableOpacity,Button, Text,useColorScheme,View,} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

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


import SearchRecipe from './screens/SearchRecipe'
import ApplyFilters from './screens/ApplyFilters'
import ViewRecipe from './screens/ViewRecipe'
import AddRecipe from './screens/AddRecipe'
import MyRecipes from './screens/MyRecipes'
import SuggestRecipe from './screens/SuggestRecipe'
import TabStack from './screens/TabStack';
LogBox.ignoreAllLogs();


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
    <NavigationContainer theme={MyTheme}>
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
        <Stack.Screen name="register" component={register} options={{headerShown: true}}/>
        <Stack.Screen name="Login" component={Login}  options={{headerShown: true}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: true}}/>
        <Stack.Screen name="TabStack" component={TabStack} options={{headerShown: false}}/>
        <Stack.Screen name="ViewRecipe" component={ViewRecipe} options={{headerShown: true}} />
        <Stack.Screen name="MyRecipes" component={MyRecipes} options={{headerShown: true}}/>
        <Stack.Screen name="ApplyFilters" component={ApplyFilters} options={{headerShown: true}}/>
        <Stack.Screen 
        name="SearchRecipe" 
        component={SearchRecipe}
        options={{
          headerBackTitleVisible:false,
          headerTitleAlign:"center",
          title: 'Recipe Book',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }}
        />
      
        <Stack.Screen name="AddRecipe" component={AddRecipe} options={{headerShown: true}}/>
        <Stack.Screen name="SuggestRecipe" component={SuggestRecipe} options={{headerShown: true}} />

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
