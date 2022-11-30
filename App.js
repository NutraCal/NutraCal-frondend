import * as React from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';

import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchRecipe from './screens/SearchRecipe'
import ApplyFilters from './screens/ApplyFilters'
import ViewRecipe from './screens/ViewRecipe'
import AddRecipe from './screens/AddRecipe'



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
      <Stack.Screen name="Apply Filters" component={ApplyFilters}/>
      <Stack.Screen 
      name="Search Recipe" 
      component={SearchRecipe}
      options={{
        headerBackTitleVisible:false,
        headerTitleAlign:"center",
        title: 'Recipe Book',
        headerTitleStyle: {
          fontWeight: 'bold',
      
        },
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
            />
          ),
       
        }}
      />
     
      <Stack.Screen name="View Recipe" component={ViewRecipe} />
      <Stack.Screen name="Add Recipe" component={AddRecipe} />
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
