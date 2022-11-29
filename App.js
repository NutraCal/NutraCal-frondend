import {useState,useEffect}  from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchRecipe from './screens/SearchRecipe'
import ApplyFilters from './screens/ApplyFilters'
import ViewRecipe from './screens/ViewRecipe'
import AddRecipe from './screens/AddRecipe'



const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded,setIsLoaded] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000);
  })


  return (
    <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        logoImage={require("./assets/images/Logo.png")}
        backgroundColor={"#999999"}
        logoHeight={150}
        logoWidth={150}
      >
      
      </AnimatedSplash>
    

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

