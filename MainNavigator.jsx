import {useContext} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import SelectRole from './screens/SelectRole';
import NutritionistRegister from './screens/NutritionistRegister';
import AdminRegister from './screens/AdminRegister';

import UserFitnessGoal from './screens/UserFitnessGoal';
import UserGwh from './screens/UserGwh';
import UserAllergies from './screens/UserAllergies';
import UserDiet from './screens/UserDiet';
import UserIng from './screens/UserIng';
import Register from './screens/Register';
import Login from './screens/Login';
import AdminLogin from './screens/AdminLogin';
import SearchRecipe from './screens/SearchRecipe';
import ApplyFilters from './screens/ApplyFilters';
import ViewRecipe from './screens/ViewRecipe';
import AddRecipe from './screens/AddRecipe';
import MyRecipes from './screens/MyRecipes';
import MyBlogs from './screens/MyBlogs';
import SuggestRecipe from './screens/SuggestRecipe';
import SuggestedRecipeResults from './screens/SuggestedRecipeResults';
import TabStack from './screens/TabStack';
import DrawerNav from './screens/DrawerNav';
import AddRecipeScan from './screens/AddRecipeScan';
import BarcodeScan from './screens/BarcodeScan';
import AddMealScan from './screens/AddMealScan';
import AddMeal from './screens/AddMeal';
import Home from './screens/Home';

import CallHome from './screens/CallHome';
import Call from './screens/Call';

import ViewProfile from './screens/ViewProfile';
import WaterLog from './screens/WaterLog';

import Bmi from './screens/Bmi';
import Calories from './screens/Calories';
import StepCount from './screens/StepCount';
import DietPlans from './screens/DietPlans';

import ViewThread from './screens/ViewThread';
import DiscussionThread from './screens/DiscussionThread';
import ViewBlog from './screens/ViewBlog';
import PostBlog from './screens/PostBlog';
import UpdateBlog from './screens/UpdateBlog';
import UpdateRecipe from './screens/UpdateRecipe';
import BookAppointment from './screens/BookAppointment';

import PostThread from './screens/PostThread';
import ViewMeal from './screens/ViewMeal';
import EditMeal from './screens/EditMeal';

import ViewNutritionistProfile from './screens/ViewNutritionistProfile';
import EditNutritionistProfile from './screens/EditNutritionistProfile';
import ViewNutritionist from './screens/ViewNutritionist';

import MyAppointments from './screens/MyAppointments';

import dim from './util/dim';
import axios from 'axios';
import {endpoint} from './util/config';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

import {AuthContext} from './context/AuthContext';

export default function MainNavigator() {
  const {isLoading, token, user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const role = user?.data?.user?.role;

  console.log(user);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {token != null ? (
          <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
            options={{headerShown: false}}
            initialParams={{
              user: user,
            }}
          />
        ) : (
          <Stack.Screen name="Welcome" component={Welcome} />
        )}

        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen
          name="NutritionistRegister"
          component={NutritionistRegister}
          options={{headerShown: true}}
        />
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
          name="AdminRegister"
          component={AdminRegister}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateRecipe"
          component={UpdateRecipe}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="UpdateBlog"
          component={UpdateBlog}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ViewBlog"
          component={ViewBlog}
          options={({route, navigation}) => {
            const {title} = route.params;

            const handleUpdateRecipe = () => {
              navigation.navigate('UpdateBlog', {title});
            };

            return {
              title: 'View Blog',
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity onPress={handleUpdateRecipe}>
                  <Text
                    style={{
                      color: '#91C788',
                      fontSize: 16,
                      marginRight: (10 / dim.w) * dim.Width,
                      fontWeight: 'bold',
                    }}>
                    Update Blog
                  </Text>
                </TouchableOpacity>
              ),
            };
          }}
        />

        <Stack.Screen
          name="ViewRecipe"
          component={ViewRecipe}
          options={{headerShown: true}}
          // options={({route, navigation}) => {
          //   const {title} = route.params;

          //   const handleUpdateRecipe = () => {
          //     navigation.navigate('UpdateRecipe', {title}); // Pass the nutritionistId to the "EditNutritionist" screen
          //   };

          //   return {
          //     title: 'View Recipe',
          //     headerShown: true,
          //     headerRight: () => (
          //       <TouchableOpacity onPress={handleUpdateRecipe}>
          //         <Text
          //           style={{
          //             color: '#91C788',
          //             fontSize: 16,
          //             marginRight: (10 / dim.w) * dim.Width,
          //             fontWeight: 'bold',
          //           }}>
          //           Update Recipe
          //         </Text>
          //       </TouchableOpacity>
          //     ),
          //   };
          // }}
        />

        <Stack.Screen
          name="MyRecipes"
          component={MyRecipes}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MyBlogs"
          component={MyBlogs}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ApplyFilters"
          component={ApplyFilters}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="DiscussionThread"
          component={DiscussionThread}
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
          name="MyAppointments"
          component={MyAppointments}
          options={({navigation}) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Call')}
                styles={{backgroundColor: '#91C788'}}>
                <Text
                  style={{
                    color: '#91C788',
                    fontSize: 16,
                    marginRight: (10 / dim.w) * dim.Width,
                    fontWeight: 'bold',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
            ),
          })}
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
                    marginRight: (10 / dim.w) * dim.Width,
                    fontWeight: 'bold',
                  }}>
                  Scan
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddMeal"
          component={AddMeal}
          options={({navigation}) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddMealScan')}
                styles={{backgroundColor: '#91C788'}}>
                <Text
                  style={{
                    color: '#91C788',
                    fontSize: 16,
                    marginRight: (10 / dim.w) * dim.Width,
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
          options={{headerShown: true, headerTitle: 'Suggest Recipe'}}
        />
        <Stack.Screen
          name="SuggestedRecipeResults"
          component={SuggestedRecipeResults}
          options={{headerShown: true, headerTitle: 'Recipes'}}
        />

        <Stack.Screen
          name="DietPlans"
          component={DietPlans}
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
          name="AddMealScan"
          component={AddMealScan}
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
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ViewNutritionistProfile"
          component={ViewNutritionistProfile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="WaterLog"
          component={WaterLog}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Bmi"
          component={Bmi}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Calories"
          component={Calories}
          options={({navigation}) => ({
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AddMeal')}>
                <Text
                  style={{
                    color: '#91C788',
                    fontSize: 16,
                    marginRight: (10 / dim.w) * dim.Width,
                    fontWeight: 'bold',
                  }}>
                  Add Meal
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="StepCount"
          component={StepCount}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="BookAppointment"
          component={BookAppointment}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ViewMeal"
          component={ViewMeal}
          options={({route, navigation}) => {
            const {item} = route.params;
            const {edita} = route.params;

            const handleUpdateMeal = () => {
              navigation.setParams({
                ...route.params,
                edita: true,
              });
            };

            return {
              title: 'View Meal',
              headerShown: true,
              headerRight: () => {
                if (role === 'User') {
                  return (
                    <TouchableOpacity onPress={handleUpdateMeal}>
                      <Text
                        style={{
                          color: '#91C788',
                          fontSize: 16,
                          marginRight: (10 / dim.w) * dim.Width,
                          fontWeight: 'bold',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              },
            };
          }}
        />

        {/* <Stack.Screen
          name="ViewMeal"
          component={ViewMeal}
          options={({route, navigation}) => {
            // const {name} = route.params; // Assuming you pass the nutritionistId as a parameter
            // const {nId} = route.params;
            const {item} = route.params;
            const {edita} = route.params;

            const handleUpdateMeal = () => {
              console.log(item);
              console.log(edita);
              // navigation.navigate('ViewMeal', {item, edita});
              navigation.navigate('ViewMeal', {
                item: item,
                edita: true,
              });
            };

            return {
              title: 'View Meal',
              headerShown: true,
              headerRight: () => {
                if (role === 'User') {
                  return (
                    <TouchableOpacity
                      onPress={handleUpdateMeal}
                      styles={{backgroundColor: '#91C788'}}>
                      <Text
                        style={{
                          color: '#91C788',
                          fontSize: 16,
                          marginRight: (10 / dim.w) * dim.Width,
                          fontWeight: 'bold',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return null; // Return null if the role is not "Nutritionist"
                }
              },
            };
          }}
        /> */}

        <Stack.Screen
          name="EditMeal"
          component={EditMeal}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="PostBlog"
          component={PostBlog}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="PostThread"
          component={PostThread}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="EditNutritionistProfile"
          component={EditNutritionistProfile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ViewThread"
          component={ViewThread}
          options={({route, navigation}) => {
            const {title} = route.params;

            const handleDeleteThread = async res => {
              var data = JSON.stringify({
                title: title,
              });

              console.log(data);
              console.log('wow did it');

              try {
                const response = await axios({
                  method: 'delete',
                  url: endpoint + '/discussionThreads/deleteThread',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: data,
                });

                console.log(JSON.stringify(response.data.message));
                navigation.goBack();
              } catch (error) {
                console.log(error.response.data);
                alert(error.response.data);
              }
            };

            return {
              title: 'View Thread',
              headerShown: true,
              headerRight: () => {
                if (role === 'Admin') {
                  return (
                    <TouchableOpacity
                      onPress={handleDeleteThread}
                      styles={{backgroundColor: '#91C788'}}>
                      <Text
                        style={{
                          color: '#91C788',
                          fontSize: 16,
                          marginRight: (10 / dim.w) * dim.Width,
                          fontWeight: 'bold',
                        }}>
                        Delete thread
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return null; // Return null if the role is not "Nutritionist"
                }
              },
            };
          }}
        />

        <Stack.Screen
          name="ViewNutritionist"
          component={ViewNutritionist}
          options={{headerShown: true}}
          // options={({route, navigation}) => {
          //   const {name} = route.params; // Assuming you pass the nutritionistId as a parameter
          //   const {nId} = route.params;

          //   const handleEditNutritionist = () => {
          //     navigation.navigate('EditNutritionistProfile', {name, nId}); // Pass the nutritionistId to the "EditNutritionist" screen
          //   };

          //   return {
          //     title: 'View Nutritionist',
          //     headerShown: true,
          //     headerRight: () => {
          //       if (role === 'User') {
          //         return (
          //           <TouchableOpacity onPress={handleEditNutritionist}>
          //             <Text
          //               style={{
          //                 color: '#91C788',
          //                 fontSize: 16,
          //                 marginRight: (10 / dim.w) * dim.Width,
          //                 fontWeight: 'bold',
          //               }}>
          //               Edit
          //             </Text>
          //           </TouchableOpacity>
          //         );
          //       } else {
          //         return null; // Return null if the role is not "Nutritionist"
          //       }
          //     },
          //   };
          // }}
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
    padding: (8 / dim.h) * dim.Height,
  },
  paragraph: {
    margin: (24 / dim.h) * dim.Height,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
