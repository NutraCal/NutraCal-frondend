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
        return focused ? (
          <Icon name="home" size={30} color="#91C788" />
        ) : (

          <Icon name="home-outline" size={30} color="black" />
        );

      } 


      else if (route.name === 'RecipeBook') {
        return focused ? (
          <Icon name="fast-food" size={30} color="#91C788" />
        ) : (

          <Icon name="fast-food-outline" size={30} color="black"/>
        );
      }
      else if(route.name === 'DietPlans'){
        return focused ? (
          <Icon name="map" size={30} color="#91C788" />
        ) : (

          <Icon name="map-outline" size={30} color="black"/>
        );
      }
      else if(route.name === 'Shopping'){
        return focused ? (
          <Icon name="ios-checkmark-done-circle" size={30} color="#91C788" />
        ) : (

          <Icon name="ios-checkmark-done-circle-outline" size={30} color="black"/>
        );
      }
      else if(route.name === 'Blogs'){
        return focused ? (
          <Icon name="people-sharp" size={30} color="#91C788" />
        ) : (

          <Icon name="people-outline" size={30} color="black"/>
        );
      }
   
      // You can return any component that you like here!
      return <Icon name={iconName} size={size} color={color} style={{margin: 2}}/>;
    },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "grey",
     
      tabBarStyle: {
        height: 70,
        paddingVertical:8,
        backgroundColor:"#EFF7EE"
      },
      tabBarLabelStyle:{
        paddingBottom:10,
        fontFamily:"Inter-Medium"
      },
    })}>
    <Tab.Screen name="Home" component={Home}
    options={{
      headerBackTitleVisible:false,
      headerTitleAlign:"center",
      title: 'Home',
      headerStyle: {
        borderBottomWidth:1,
        elevation:5,
        backgroundColor:"#91C788"
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color:"white",
        fontFamily:"Inter-Medium",
        fontSize:20
       
      },
      }}/>
    <Tab.Screen name="RecipeBook" component={RecipeBook} 
    options={
      
      ({ navigation }) => 
      {
        return {

          headerTitle: () =>  <HomeHeader navigation={navigation}/>

        }
      }}/>

    <Tab.Screen name="DietPlans" component={DietPlans}  
    options={{
      headerBackTitleVisible:false,
      headerTitleAlign:"center",
      title: 'Diet Plans',
      headerStyle: {
        borderBottomWidth:1,
        elevation:5,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      
      },
      }}
    />
    <Tab.Screen name="Shopping" component={Shopping} 
    options={{
        headerBackTitleVisible:false,
        headerTitleAlign:"center",
        title: 'Shopping Help',
        headerStyle: {
          borderBottomWidth:1,
          elevation:5,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        
        },
        }}
        />
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