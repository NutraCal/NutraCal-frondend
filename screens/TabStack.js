import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Home from './Home';
import RecipeBook from './SearchRecipe'
import DietPlans from './DietPlans'
import Shopping from './Shopping'
import Blogs from './SearchBlog'
import HomeHeader from './HomeHeader';


import Icon from "react-native-vector-icons/Ionicons" 
import Icon2 from "react-native-vector-icons/Entypo" 
import { HeaderTitle } from '@react-navigation/elements';


const Tab = createBottomTabNavigator();


const TabStack=()=>{

  return(
  <Tab.Navigator screenOptions={({ route }) => ({
    
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      
      if (route.name === 'Home') {
        iconName = focused? 'home': 'home-outline';
      } 
      else if (route.name === 'RecipeBook') {
        iconName = focused ? 'fast-food' : 'fast-food-outline';
      }
      else if(route.name === 'DietPlans'){
        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
      }
      else if(route.name === 'Shopping'){
        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
      }
      else if(route.name === 'Blogs'){
        iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
      }
   
   

      // You can return any component that you like here!
      return <Icon name={iconName} size={size} color={color} style={{margin: 2}}/>;
    },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "grey",
     
      tabBarStyle: {
        height: 70,
        paddingVertical:8,
      },
      tabBarLabelStyle:{
        paddingBottom:10,
      },
    })}>
    <Tab.Screen name="Home" component={Home} options={{ headerShown:false}}/>
    <Tab.Screen name="RecipeBook" component={RecipeBook} 
    options={
      ({ navigation }) => 
      {
        return {
          headerTitle: () =>  <HomeHeader navigation={navigation} />

        }
      }}/>

    <Tab.Screen name="DietPlans" component={DietPlans}  />
    <Tab.Screen name="Shopping" component={Shopping} 
    options={{
        headerBackTitleVisible:false,
        headerTitleAlign:"center",
        title: 'Shopping Help',
        headerStyle: {
          borderWidth:1,
          backgroundColor: '#f4511e',
          elevation:5,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }}/>
    <Tab.Screen name="Blogs" component={Blogs}
    options={{
      headerBackTitleVisible:false,
      headerTitleAlign:"center",
      title: 'Community',
      headerStyle: {
        borderWidth:1,
       
        elevation:5,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }}
    />
  
  </Tab.Navigator>
  )
}
export default TabStack