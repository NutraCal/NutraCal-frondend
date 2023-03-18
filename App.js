import * as React from 'react';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import UserFitnessGoal from './screens/UserFitnessGoal';
import UserGwh from './screens/UserGwh';
import UserAllergies from './screens/UserAllergies';
import UserDiet from './screens/UserDiet';
import UserIng from './screens/UserIng';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/homeDummy';

import SearchRecipe from './screens/SearchRecipe';
import ApplyFilters from './screens/ApplyFilters';
import ViewRecipe from './screens/ViewRecipe';
import AddRecipe from './screens/AddRecipe';
import MyRecipes from './screens/MyRecipes';
import SuggestRecipe from './screens/SuggestRecipe';
import TabStack from './screens/TabStack';
import DrawerNav from './screens/DrawerNav';
import AddRecipeScan from './screens/AddRecipeScan';
import BarcodeScan from './screens/BarcodeScan';
import AddMeal from './screens/AddMeal';

import CallHome from './screens/CallHome';
import Call from './screens/Call';

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
        <Stack.Screen name="UserFitnessGoal" component={UserFitnessGoal} />
        <Stack.Screen name="UserGwh" component={UserGwh} />
        <Stack.Screen name="UserAllergies" component={UserAllergies} />
        <Stack.Screen name="UserDiet" component={UserDiet} />
        <Stack.Screen name="UserIng" component={UserIng} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ViewRecipe"
          component={ViewRecipe}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MyRecipes"
          component={MyRecipes}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ApplyFilters"
          component={ApplyFilters}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="SearchRecipe"
          component={SearchRecipe}
          options={{
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            title: 'Recipe Book',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="AddRecipe"
          component={AddRecipe}
          options={({navigation}) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddRecipeScan')}
                styles={{backgroundColor: '#91C788'}}>
                <Text
                  style={{
                    color: '#91C788',
                    fontSize: 16,
                    marginRight: 10,
                    fontWeight: 'bold',
                  }}>
                  Scan
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="SuggestRecipe"
          component={SuggestRecipe}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddRecipeScan"
          component={AddRecipeScan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BarcodeScan"
          component={BarcodeScan}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddMeal"
          component={AddMeal}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="CallHome"
          component={CallHome}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Call"
          component={Call}
          options={{headerShown: true}}
        />
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
