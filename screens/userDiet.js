import React, {useState} from 'react';
import UserGwh from './UserGwh';
import UserIng from './UserIng';
import ProgressBar from '../assets/progressbar4';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dp1 from '../assets/dp1.svg';
import Dp2 from '../assets/dp2.svg';
import Dp3 from '../assets/dp3.svg';
import Dp4 from '../assets/dp4.svg';
const Stack = createNativeStackNavigator();
const UserDiet = ({navigation, route}) => {
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState('');
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diet, setDiet] = useState('');
  React.useEffect(() => {
    if (
      route.params?.fitnessGoal &&
      route.params?.gender &&
      route.params?.age &&
      route.params?.height &&
      route.params?.heightUnit &&
      route.params?.weight &&
      route.params?.weightUnit &&
      route.params?.allergies
    ) {
      const fitnessGoal = route.params?.fitnessGoal;
      const gender = route.params?.gender;
      const age = route.params?.age;
      const height = route.params?.height;
      const heightUnit = route.params?.heightUnit;
      const weight = route.params?.weight;
      const weightUnit = route.params?.weightUnit;
      const allergies = route.params?.allergies;
      setGoal(fitnessGoal);
      setGender(gender);
      setAge(age);
      setHeight(height);
      setHeightUnit(heightUnit);
      setWeight(weight);
      setWeightUnit(weightUnit);
      setAllergies(allergies);
    }
  }, [
    route.params?.fitnessGoal,
    route.params?.gender,
    route.params?.age,
    route.params?.height,
    route.params?.heightUnit,
    route.params?.weight,
    route.params?.weightUnit,
    route.params?.allergies,
  ]);
  const setDietPref = inp => {
    setDiet(inp);
  };
  const inputValidation = () => {
    if (diet != '') {
      navigation.navigate('UserIng', {
        fitnessGoal: goal,
        gender: gender,
        age: age,
        height: height,
        heightUnit: heightUnit,
        weight: weight,
        weightUnit: weightUnit,
        allergies: allergies,
        diet: diet,
      });
    } else {
      Alert.alert('Invalid Input', 'Please select your Goal', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar width={350} style={{marginBottom: 20}} />
      <Text style={styles.Heading}>
        Do you follow any of the{'\n'}following diets?
      </Text>

      <TouchableOpacity
        onPress={() => setDietPref('None')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              diet == 'None' ? 'rgba(145, 199, 136, 0.2)' : '##ffffff',
          },
        }}>
        <Dp1 style={styles.vector} />
        <Text style={styles.listText}>None</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDietPref('Vegetarian')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              diet == 'Vegetarian' ? 'rgba(145, 199, 136, 0.2)' : '##ffffff',
          },
        }}>
        <Dp2 style={styles.vector} />
        <Text style={styles.listText}>Vegetarian</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDietPref('Low-Carb')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              diet == 'Low-Carb' ? 'rgba(145, 199, 136, 0.2)' : '##ffffff',
          },
        }}>
        <Dp3 style={styles.vector} />
        <Text style={styles.listText}>Low-Carb</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDietPref('Keto')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              diet == 'Keto' ? 'rgba(145, 199, 136, 0.2)' : '#ffffff',
          },
        }}>
        <Dp4 style={styles.vector} />
        <Text style={styles.listText}>Keto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={inputValidation}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  Heading: {
    marginTop: 20,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  listItem: {
    height: 80,
    width: 350,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  listText: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 8,
  },
  btn: {
    width: 330,
    height: 48,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
    marginBottom: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  vector: {
    height: 50,
    width: 50,
    margin: 15,
  },
});
export default UserDiet;
