import {useContext, useEffect} from 'react';
import {Button, View, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TabStack from './TabStack';
import Login from './Login';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewProfile from './ViewProfile';
import ViewNutritionistProfile from './ViewNutritionistProfile';
import BlogApproval from './BlogApproval';
import RecipeApproval from './RecipeApproval';
import MyAppointments from './MyAppointments';
import dim from '../util/dim';

const Drawer = createDrawerNavigator();

import {AuthContext} from '../context/AuthContext';
import MyRecipes from './MyRecipes';
import MyBlogs from './MyBlogs';

const DrawerNav = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const role = user?.data?.user?.role;

  // useEffect(() => {
  //   console.log(user?.data?.user);
  // }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
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
            <Ionicons
              name="home-outline"
              size={(22 / dim.w) * dim.Width}
              color={color}
            />
          ),
        }}
      />
      {role === 'Admin' && (
        <Drawer.Screen
          name="Blog Approvals"
          component={BlogApproval}
          options={{
            headerShown: true,
            drawerIcon: ({color}) => (
              <Ionicons
                name="home-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role === 'User' && (
        <Drawer.Screen
          name="My Recipes"
          component={MyRecipes}
          options={{
            headerShown: true,
            drawerIcon: ({color}) => (
              <Ionicons
                name="home-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role === 'Nutritionist' && (
        <Drawer.Screen
          name="My Blogs"
          component={MyBlogs}
          options={{
            headerShown: true,
            drawerIcon: ({color}) => (
              <Ionicons
                name="home-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role === 'Admin' && (
        <Drawer.Screen
          name="Recipe Approvals"
          component={RecipeApproval}
          options={{
            headerShown: true,
            drawerIcon: ({color}) => (
              <Ionicons
                name="home-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role !== 'Admin' && (
        <Drawer.Screen
          name="MyAppointments"
          component={MyAppointments}
          options={{
            headerShown: true,
            drawerIcon: ({color}) => (
              <Ionicons
                name="home-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role === 'User' && (
        <Drawer.Screen
          name="My Profile"
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
                    marginRight: (30 / dim.w) * dim.Width,
                    fontWeight: 'bold',
                  }}>
                  Edit User
                </Text>
              </TouchableOpacity>
            ),
            drawerIcon: ({color}) => (
              <Ionicons
                name="settings-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}

      {role === 'Nutritionist' && (
        <Drawer.Screen
          name="Profile"
          component={ViewNutritionistProfile}
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
                    marginRight: (30 / dim.w) * dim.Width,
                    fontWeight: 'bold',
                  }}>
                  Edit Nutrition Profile
                </Text>
              </TouchableOpacity>
            ),
            drawerIcon: ({color}) => (
              <Ionicons
                name="settings-outline"
                size={(22 / dim.w) * dim.Width}
                color={color}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
