import React, {useState} from 'react';
import register from './register';
import ProgressBar from './ProgressBar';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
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
import Mushroom from '../assets/mushroom.svg';
import Olives from '../assets/olives.svg';
import Tofu from '../assets/tofu.svg';
import Brocolli from '../assets/brocolli.svg';
import Onion from '../assets/onion.svg';
import Shrimp from '../assets/shrimp.svg';
const Stack = createNativeStackNavigator();

const userIng = ({navigation, route}) => {
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState('');
  const [weight, setWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diet, setDiet] = useState('');
  const [ings, setIngs] = useState('');
  React.useEffect(() => {
    if (
      route.params?.fitnessGoal &&
      route.params?.gender &&
      route.params?.age &&
      route.params?.height &&
      route.params?.heightUnit &&
      route.params?.weight &&
      route.params?.weightUnit &&
      route.params?.allergies &&
      route.params?.diet
    ) {
      const fitnessGoal = route.params?.fitnessGoal;
      const gender = route.params?.gender;
      const age = route.params?.age;
      const height = route.params?.height;
      const heightUnit = route.params?.heightUnit;
      const weight = route.params?.weight;
      const weightUnit = route.params?.weightUnit;
      const allergies = route.params?.allergies;
      const diet = route.params?.diet;
      setGoal(fitnessGoal);
      setGender(gender);
      setAge(age);
      setHeight(height);
      setHeightUnit(heightUnit);
      setWeight(weight);
      setWeightUnit(weightUnit);
      setAllergies(allergies);
      setDiet(diet);
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
    route.params?.diet,
  ]);

  const setIngredient = value => {
    setIngs(value);
  };
  const inputValidation = () => {
    if (ings != '') {
      navigation.navigate('register', {
        fitnessGoal: goal,
        gender: gender,
        age: age,
        height: height,
        heightUnit: heightUnit,
        weight: weight,
        weightUnit: weightUnit,
        allergies: allergies,
        diet: diet,
        ingredients: ings,
      });
    } else {
      Alert.alert('Invalid Input', 'Please select ingredients you dislike', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={styles.Heading}>Which ingredients do you dislike?</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setIngredient('Mushroom')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Mushroom' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Mushroom style={styles.vector} />
          <Text style={styles.listText}>Mushroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIngredient('Olives')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Olives' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Olives style={styles.vector} />
          <Text style={styles.listText}>Olives</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setIngredient('Tofu')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Tofu' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Tofu style={styles.vector} />
          <Text style={styles.listText}>Tofu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIngredient('Brocolli')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Brocolli' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Brocolli style={styles.vector} />
          <Text style={styles.listText}>Brocolli</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setIngredient('Onion')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Onion' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Onion style={styles.vector} />
          <Text style={styles.listText}>Onion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIngredient('Shrimp')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                ings == 'Shrimp' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Shrimp style={styles.vector} />
          <Text style={styles.listText}>Shrimp</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 10,
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Light',
    lineHeight: 30,
    marginBottom: 20,
    marginTop: 5,
  },
  listItem: {
    height: 80,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginLeft: 15,
    marginBottom: 30,
    flexDirection: 'row',
  },
  listText: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 2,
  },
  btn: {
    backgroundColor: '#91C788',
    height: 50,
    width: 370,
    borderRadius: 18,
    marginTop: 250,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  vector: {
    height: 50,
    width: 50,
    margin: 15,
  },
});
export default userIng;
