import * as React from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';

import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchRecipe from './screens/SearchRecipe'
import ApplyFilters from './screens/ApplyFilters'
import ViewRecipe from './screens/ViewRecipe'
import AddRecipe from './screens/AddRecipe'
import MyRecipes from './screens/MyRecipes'
import SuggestRecipe from './screens/SuggestRecipe'
import TabStack from './screens/TabStack';



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
    <NavigationContainer
    theme={MyTheme}
    >
      <Stack.Navigator>
      
      <Stack.Screen name="TabStack" component={TabStack} options={{headerShown: false}}/>
      <Stack.Screen name="ViewRecipe" component={ViewRecipe} />
     
      <Stack.Screen name="MyRecipes" component={MyRecipes}/>
      <Stack.Screen name="ApplyFilters" component={ApplyFilters}/>
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
    
      <Stack.Screen name="AddRecipe" component={AddRecipe} />
      <Stack.Screen name="SuggestRecipe" component={SuggestRecipe} />
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
