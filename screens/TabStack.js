import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Home from './Home';
import RecipeBook from './SearchRecipe';
import DietPlans from './DietPlans';
import Shopping from './Shopping';
import Blogs from './SearchBlog';
import AddMeal from './AddMeal';
import HomeHeader from './HomeHeader';
import CallHome from './CallHome';
import Call from './Call';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {HeaderTitle} from '@react-navigation/elements';
import ShoppingHeader from './ShoppingHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabStack = ({route, navigation}) => {
  const {email} = route.params;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            return focused ? (
              <Icon name="home" size={25} color="#91C788" />
            ) : (
              <Icon name="home-outline" size={25} color="black" />
            );
          } else if (route.name === 'RecipeBook') {
            return focused ? (
              <Icon name="fast-food" size={25} color="#91C788" />
            ) : (
              <Icon name="fast-food-outline" size={25} color="black" />
            );
          } else if (route.name === 'DietPlans') {
            return focused ? (
              <Icon name="map" size={25} color="#91C788" />
            ) : (
              <Icon name="map-outline" size={25} color="black" />
            );
          } else if (route.name === 'Shopping') {
            return focused ? (
              <Icon
                name="ios-checkmark-done-circle"
                size={25}
                color="#91C788"
              />
            ) : (
              <Icon
                name="ios-checkmark-done-circle-outline"
                size={25}
                color="black"
              />
            );
          } else if (route.name === 'Blogs') {
            return focused ? (
              <Icon name="people-sharp" size={25} color="#91C788" />
            ) : (
              <Icon name="people-outline" size={25} color="black" />
            );
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{margin: 2}}
            />
          );
        },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',

        tabBarStyle: {
          height: 60,
          // positiion: 'absolute',
          // bottom: 16,
          // borderRadius: 16,
          // right: 16,
          // left: 16,
          // width: 360,

          paddingVertical: 8,
          backgroundColor: '#EFF7EE',
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontFamily: 'Inter-Medium',
        },
      })}>
      <Tab.Screen
        name="Home"
        initialParams={{email: email}}
        component={Home}
        options={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Home',
          headerStyle: {
            borderBottomWidth: 1,
            elevation: 5,
            backgroundColor: '#91C788',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Inter-Medium',
            fontSize: 20,
          },
        }}
      />
      <Tab.Screen
        name="RecipeBook"
        component={RecipeBook}
        options={({navigation}) => {
          return {
            headerTitle: () => <HomeHeader navigation={navigation} />,
          };
        }}
      />

      <Tab.Screen
        name="DietPlans"
        component={DietPlans}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            borderBottomWidth: 1,
            elevation: 5,
          },
          headerTitleStyle: {
            marginLeft: 20,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddMeal')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: 30,
                  fontWeight: 'bold',
                }}>
                Scan
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Shopping"
        initialParams={{email: email}}
        component={Shopping}
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: {
            borderBottomWidth: 1,
            elevation: 5,
          },
          headerTitleStyle: {
            marginLeft: 20,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BarcodeScan')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: 30,
                  fontWeight: 'bold',
                }}>
                Scan
              </Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Tab.Screen
        name="Blogs"
        component={Blogs}
        options={({navigation}) => ({
          title: 'Community',
          headerShown: true,
          headerStyle: {
            borderWidth: 1,
            elevation: 5,
          },
          headerTitleStyle: {
            marginLeft: 20,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CallHome')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: 30,
                  fontWeight: 'bold',
                }}>
                Call
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
export default TabStack;
