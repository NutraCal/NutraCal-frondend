import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import type {Node} from 'react';
import {Button, TextInput} from 'react-native-paper';
import Login from './Login';
const register = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const [isEmailValid, setIsEmailValid] = useState('false');
  const [isPasswordValid, setIsPasswordValid] = useState('false');
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
      route.params?.diet &&
      route.params?.ingredients
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
      const ingredients = route.params?.ingredients;
      setGoal(fitnessGoal);
      setGender(gender);
      setAge(age);
      setHeight(height);
      setHeightUnit(heightUnit);
      setWeight(weight);
      setWeightUnit(weightUnit);
      setAllergies(allergies);
      setDiet(diet);
      setIngs(ings);
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
    route.params?.ingredients,
  ]);
  const credentialsValidation = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /^(?=.*\d).{8,12}$/.test(password)
    ) {
      fetch('http://192.168.100.101:3000/users/createUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fitnessGoal: goal,
          gender: gender,
          age: age,
          height: height,
          heightUnit: heightUnit,
          weight: weight,
          weightUnit: weightUnit,
          allergies: allergies,
          diet: diet,
          ingredients: 'abc',
        }),
      });
      setEmail('');
      setPassword('');
      setIsEmailValid('true');
      setIsPasswordValid('true');
    } else {
      setIsEmailValid('false');
      setIsPasswordValid('false');
      Alert.alert('Invalid Input', 'Please check your email and password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  const registerUser = () => {
    fetch('http://localhost:3000/users/createUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
      }),
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create Account{ings}</Text>
      <Text style={styles.h3}>Connect with your Friends Today!</Text>

      <View style={styles.midcontainer}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            mode="outlined"
            onChangeText={text => setEmail(text)}
            style={styles.input}></TextInput>
          <Text
            style={{
              color: email != '' ? '#f3f3f3' : '#FF0000',
              fontSize: 12,
              marginBottom: 10,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password.value}
            mode="outlined"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry></TextInput>
          <Text
            style={{
              color: email != '' ? '#f3f3f3' : '#FF0000',
              fontSize: 12,
              marginBottom: 10,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
        </View>
        <Text style={styles.Text}>I agree to the terms and conditions,</Text>
        <Button
          style={styles.btn}
          onPress={credentialsValidation}
          color="#90C888"
          labelStyle={{color: 'white'}}
          mode="contained">
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text
            style={{
              marginBottom: 10,
              color: 'black',
              fontFamily: 'Inter-Regular',
            }}>
            Already Have An Account?{' '}
          </Text>
          <Text
            style={{
              color: '#90C888',
              fontFamily: 'Inter-SemiBold',
            }}
            onPress={() => navigation.navigate('Login')}>
            Log In
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20,
    marginTop: 50,
  },

  midcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 25,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'left',
    marginBottom: 10,
    color: 'black',
  },

  h3: {
    color: 'grey',
    marginBottom: 30,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },
  Text: {
    color: 'grey',
    marginVertical: 30,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },

  label: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'black',
    fontFamily: 'Inter-Regular',
  },

  input: {
    height: 50,
    marginBottom: 10,
    width: 300,
  },

  btn: {
    marginTop: 20,
    width: 300,
    marginBottom: 40,
    fontFamily: 'Inter-SemiBold',
  },

  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    width: 150,
    height: 35,
    borderRadius: 10,
    borderColor: '#90C888',
  },

  icon: {
    height: 25,
    width: 25,
    marginRight: 6,
  },

  hcontainer: {
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
});
export default register;
