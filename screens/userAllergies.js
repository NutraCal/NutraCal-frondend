import React, {useState, useEffect} from 'react';
import UserGwh from './UserGwh';
import UserDiet from './UserDiet';
import UserIng from './UserIng';
import ProgressBar from '../assets/progressbar3';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const UserAllergies = ({navigation, route}) => {
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState('');
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState('');
  const [allergies, setAllergies] = useState('');
  React.useEffect(() => {
    if (
      route.params?.fitnessGoal &&
      route.params?.gender &&
      route.params?.age &&
      route.params?.height &&
      route.params?.heightUnit &&
      route.params?.weight &&
      route.params?.weightUnit
    ) {
      const fitnessGoal = route.params?.fitnessGoal;
      const gender = route.params?.gender;
      const age = route.params?.age;
      const height = route.params?.height;
      const heightUnit = route.params?.heightUnit;
      const weight = route.params?.weight;
      const weightUnit = route.params?.weightUnit;
      setGoal(fitnessGoal);
      setGender(gender);
      setAge(age);
      setHeight(height);
      setHeightUnit(heightUnit);
      setWeight(weight);
      setWeightUnit(weightUnit);
    }
  }, [
    route.params?.fitnessGoal,
    route.params?.gender,
    route.params?.age,
    route.params?.height,
    route.params?.heightUnit,
    route.params?.weight,
    route.params?.weightUnit,
  ]);

  const setAllergens = allg => {
    setAllergies(allg);
  };
  const inputValidation = () => {
    if (allergies != '') {
      navigation.navigate('UserDiet', {
        fitnessGoal: goal,
        gender: gender,
        age: age,
        height: height,
        heightUnit: heightUnit,
        weight: weight,
        weightUnit: weightUnit,
        allergies: allergies,
      });
    } else {
      Alert.alert('Invalid Input', 'Please select allergies', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar width={350} style={{marginBottom: 20}} />
      <Text style={styles.Heading}>
        Which restrictions/allergies do you have?
      </Text>

      <TouchableOpacity
        onPress={() => setAllergens('Lactose Intolerant')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              allergies == 'Lactose Intolerant'
                ? 'rgba(145, 199, 136, 0.2)'
                : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Lactose Intolerant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAllergens('Nut Allergy')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              allergies == 'Nut Allergy'
                ? 'rgba(145, 199, 136, 0.2)'
                : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Nut Allergy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAllergens('Egg')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              allergies == 'Egg' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Egg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setAllergens('None')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              allergies == 'None' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>None</Text>
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
    height: 72,
    width: 350,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
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
    marginTop: 180,
    marginBottom: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
export default UserAllergies;
