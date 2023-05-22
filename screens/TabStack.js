import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';

import Home from './Home';
import RecipeBook from './SearchRecipe';
import DietPlans from './DietPlans';
import Shopping from './Shopping';
import ViewBlog from './ViewBlog';
import Blogs from './Community';
import DiscussionThread from './DiscussionThread';
import AddMealScan from './AddMealScan';
import AddMeal from './AddMeal';

import HomeHeader from './HomeHeader';
import CallHome from './CallHome';
import Call from './Call';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {HeaderTitle} from '@react-navigation/elements';
import ShoppingHeader from './ShoppingHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const TabStack = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const role = user?.data?.user?.role;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            return focused ? (
              <Icon
                name="home"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="home-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          } else if (route.name === 'RecipeBook') {
            return focused ? (
              <Icon
                name="fast-food"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="fast-food-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          } else if (route.name === 'DietPlans') {
            return focused ? (
              <Icon
                name="map"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="map-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          } else if (route.name === 'Shopping') {
            return focused ? (
              <Icon
                name="ios-checkmark-done-circle"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="ios-checkmark-done-circle-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          } else if (route.name === 'Discussion') {
            return focused ? (
              <Icon
                name="ios-checkmark-done-circle"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="ios-checkmark-done-circle-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          } else if (route.name === 'Blogs') {
            return focused ? (
              <Icon
                name="people-sharp"
                size={(25 / dim.w) * dim.Width}
                color="#91C788"
              />
            ) : (
              <Icon
                name="people-outline"
                size={(25 / dim.w) * dim.Width}
                color="black"
              />
            );
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{margin: (2 / dim.h) * dim.Height}}
            />
          );
        },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',

        tabBarStyle: {
          height: (60 / dim.h) * dim.Height,
          // positiion: 'absolute',
          // bottom: 16,
          // borderRadius: 16,
          // right: 16,
          // left: 16,
          // width: 360,

          paddingVertical: (8 / dim.h) * dim.Height,
          backgroundColor: '#EFF7EE',
        },
        tabBarLabelStyle: {
          paddingBottom: (10 / dim.h) * dim.Height,
          fontFamily: 'Inter-Medium',
        },
      })}>
      <Tab.Screen
        name="Home"
        initialParams={{email: email}}
        component={Home}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="RecipeBook"
        component={RecipeBook}
        options={({navigation}) => {
          return {
            headerTitle: props => <HomeHeader navigation={navigation} />,
          };
        }}
      />
      {role != 'Nutritionist' ? (
        <Tab.Screen
          name="DietPlans"
          initialParams={{email: email}}
          component={DietPlans}
          options={({navigation}) => ({
            headerShown: true,
            headerStyle: {
              borderBottomWidth: 1,
              elevation: 5,
            },
            headerTitleStyle: {
              marginLeft: (20 / dim.w) * dim.Width,
            },
          })}
        />
      ) : null}
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
            marginLeft: (20 / dim.w) * dim.Width,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BarcodeScan')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: (30 / dim.w) * dim.Width,
                  fontWeight: 'bold',
                }}>
                Scan
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Discussion"
        component={DiscussionThread}
        options={({navigation}) => ({
          headerTitle: 'Discuss',
          headerShown: true,
          headerStyle: {
            borderBottomWidth: 1,
            elevation: 5,
          },
          headerTitleStyle: {
            marginLeft: (20 / dim.w) * dim.Width,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BarcodeScan')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: (30 / dim.w) * dim.Width,
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
            marginLeft: (20 / dim.w) * dim.Width,
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CallHome')}
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: (30 / dim.w) * dim.Width,
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
