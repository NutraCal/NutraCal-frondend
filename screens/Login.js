import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import register from './register';
import Home from './homeDummy';
import userGwh from './userGwh';
import userFitnessGoal from './userFitnessGoal';
import Facebook from '../assets/Facebook.svg';
import Google from '../assets/Google.svg';
import ErrorMessage from '../components/ErrorMessage';
export default function Login({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState('false');
  const [isPasswordValid, setIsPasswordValid] = useState('false');
  const credentialsValidation = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /^(?=.*\d).{8,12}$/.test(password)
    ) {
      fetch('http://192.168.100.101:3000/users/login', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(response => {
        if (response.status == 200) {
          navigation.navigate('Home');
        } else {
          Alert.alert('Invalid Credentials', 'Invalid email and password', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        console.log(response.status); // returns 200
      });
      setIsEmailValid('true');
      setIsPasswordValid('true');
      setEmail('');
      setPassword('');
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
      <View>
        <Text style={styles.h1}>Hello! Welcome back!</Text>
        <Text style={styles.h3}>You've been missed!</Text>
      </View>

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
          <Text style={styles.label}>Enter password</Text>
        </View>
        <View>
          <TextInput
            placeholder="Enter your password"
            value={password}
            mode="outlined"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry></TextInput>
          <Text
            style={{
              color: password != '' ? '#f3f3f3' : '#FF0000',
              fontSize: 12,
              marginBottom: 10,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
        </View>

        <Button
          style={styles.btn}
          color="#90C888"
          onPress={credentialsValidation}
          labelStyle={{color: 'white'}}
          mode="contained">
          Login
        </Button>

        <Text style={styles.label}> ──────── or Login with ──────── </Text>

        <View style={styles.hcontainer}>
          <TouchableOpacity style={styles.touchable}>
            <Google style={styles.icon} />
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-SemiBold',
              }}>
              Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <Facebook style={styles.icon} />
            <Text style={{color: 'black', fontFamily: 'Inter-SemiBold'}}>
              Facebook
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text
            style={{
              marginBottom: 10,
              color: 'black',
              fontFamily: 'Inter-Regular',
            }}>
            {' '}
            Don't have an Account?{' '}
          </Text>
          <Text
            style={{
              color: '#90C888',
              fontFamily: 'Inter-SemiBold',
            }}
            onPress={() => navigation.navigate('userFitnessGoal')}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

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

  label: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'black',
    fontFamily: 'Inter-Regular',
  },

  input: {
    height: 50,
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
    margin: 8,
  },

  icon: {
    height: 25,
    width: 25,
    marginRight: 6,
  },

  hcontainer: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
});
