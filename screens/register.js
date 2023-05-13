import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import type {Node} from 'react';
import Login from './Login';
import {endpoint} from '../util/config';
import dim from '../util/dim';

const Register = ({route, navigation}) => {
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
  const [pressed, setPressed] = useState(false);

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
    setPressed(true);
    console.log('trying');
    console.log('email');

    if (email == '' && password == '') {
      Alert.alert('Empty field', 'Please enter email and password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (email == '') {
      Alert.alert('Empty field', 'Please enter email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (password == '') {
      Alert.alert('Empty field', 'Please enter password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /^(?=.*\d).{8,12}$/.test(password)
    ) {
      fetch(endpoint + '/users/createUser', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'sonia',
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
          role: 'User',
        }),
      }).then(response => {
        if (response.status == 200) {
          navigation.navigate('Login');
        } else {
          Alert.alert('User already exists', 'Create Account with new Email', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        console.log(response.status); // returns 200
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
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create Account{ings}</Text>
      <Text style={styles.h3}>Connect with your Friends Today!</Text>

      <View style={styles.midcontainer}>
        <View>
          <Text style={styles.label1}>Email</Text>

          <TextInput
            style={styles.txtinput}
            placeholder="Enter your email"
            value={email}
            placeholderTextColor="#C5C6CC"
            onChangeText={text => setEmail(text)}
            style={styles.txtinput}
          />
        </View>

        <View>
          <Text style={styles.label1}>Password</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter your password"
            value={password.value}
            placeholderTextColor="#C5C6CC"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={credentialsValidation}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text
            style={{
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
    marginTop: (50 / dim.h) * dim.Height,
    marginHorizontal: (20 / dim.w) * dim.Width,
    justifyContent: 'center',
  },

  midcontainer: {
    justifyContent: 'center',
  },

  h1: {
    fontSize: 25,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'left',
    marginBottom: (10 / dim.h) * dim.Height,
    color: 'black',
  },

  h3: {
    color: 'grey',
    marginBottom: (30 / dim.h) * dim.Height,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },

  label1: {
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
  },

  Text: {
    color: 'grey',
    marginVertical: (30 / dim.h) * dim.Height,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
export default Register;
