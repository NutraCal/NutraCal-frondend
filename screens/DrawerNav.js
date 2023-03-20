import * as React from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TabStack from './TabStack';
import Login from './Login';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewProfile from './ViewProfile';

const Drawer = createDrawerNavigator();

const DrawerNav = ({route, navigation}) => {
  const {email} = route.params;
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#91C788',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabStack}
        initialParams={{email: email}}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ViewProfile}
        initialParams={{email: email, editable: false}}
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewProfile', {
                  email: email,
                  editable: true,
                })
              }
              styles={{backgroundColor: '#91C788'}}>
              <Text
                style={{
                  color: '#91C788',
                  fontSize: 16,
                  marginRight: 30,
                  fontWeight: 'bold',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          ),
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
