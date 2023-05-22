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
import SearchRecipe from './screens/SearchRecipe';
import ApplyFilters from './screens/ApplyFilters';
import ViewRecipe from './screens/ViewRecipe';
import AddRecipe from './screens/AddRecipe';
import MyRecipes from './screens/MyRecipes';
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
import ViewBlog from './screens/ViewBlog';
import ViewMeal from './screens/ViewMeal';
import EditMeal from './screens/EditMeal';

import ViewNutritionistProfile from './screens/ViewNutritionistProfile';

import dim from './util/dim';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

import {AuthContext} from './context/AuthContext';

export default function MainNavigator() {
  const {isLoading, token, user} = useContext(AuthContext);

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
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ViewRecipe"
          component={ViewRecipe}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MyRecipes"
          component={MyRecipes}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ApplyFilters"
          component={ApplyFilters}
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
              <TouchableOpacity
                onPress={() => navigation.navigate('AddMeal')}
                styles={{backgroundColor: '#91C788'}}>
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
          name="ViewThread"
          component={ViewThread}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ViewMeal"
          component={ViewMeal}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="ViewBlog"
          component={ViewBlog}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="EditMeal"
          component={EditMeal}
          options={{headerShown: true}}
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
