import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import Register from './Register';
import UserGwh from './UserGwh';
import UserFitnessGoal from './UserFitnessGoal';
import Facebook from '../assets/Facebook.svg';
import Google from '../assets/Google.svg';
import ErrorMessage from '../components/ErrorMessage';
import TabStack from './TabStack';
import DrawerNav from './DrawerNav';
import {endpoint} from '../util/config';
import axios from 'axios';
import dim from '../util/dim';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {AuthContext} from '../context/AuthContext';

GoogleSignin.configure();

let res = {};

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    return {code: 'Success', data: userInfo};
    // console.log(userInfo);
  } catch (error) {
    return {code: 'Failed', data: ''};
  }
};

export default function Login({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState('false');
  const [isPasswordValid, setIsPasswordValid] = useState('false');
  const {login} = useContext(AuthContext);

  const credentialsValidation = async () => {
    console.log(endpoint + '/users/login');
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /^(?=.*\d).{8,12}$/.test(password)
    ) {
      const res = await axios.post(endpoint + '/users/login', {
        email: email,
        password: password,
      });

      console.log(res?.data);
      console.log(res?.status);

      if (res.status == 200) {
        await login(res?.data);
        navigation.navigate('DrawerNav', {
          email: email,
        });

        setIsEmailValid('true');
        setIsPasswordValid('true');
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Invalid Credentials', 'Invalid email and password', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } else {
      setIsEmailValid('false');
      setIsPasswordValid('false');
      Alert.alert('Invalid Input', 'Please check your email and password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const socialLogIn = email => {
    console.log(email);
    fetch('http://192.168.10.89:8000/users/googleLogIn', {
      method: 'POST',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
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
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Hello! Welcome back!</Text>
        <Text style={styles.h3}>You've been missed!</Text>
      </View>

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
          <Text
            style={{
              color: email != '' ? '#ffffff' : '#FF0000',
              fontSize: 12,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
          <Text style={styles.label1}>Enter password</Text>
        </View>
        <View>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#C5C6CC"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.txtinput}
            secureTextEntry></TextInput>
          <Text
            style={{
              color: password != '' ? '#ffffff' : '#FF0000',
              fontSize: 12,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={credentialsValidation}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          {' '}
          ─────────── or Login with ───────────{' '}
        </Text>

        <View style={styles.hcontainer}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={async () => {
              try {
                const call = await googleSignIn();
                if (call.code !== 'Failed') {
                  socialLogIn(call?.data?.user?.email);
                  alert('Sign In');
                } else {
                  alert('Sign in Failed');
                }
              } catch (e) {
                console.log(e);
              }
            }}>
            <Google style={styles.icon} />
            <Text
              style={{
                color: 'black',
                fontFamily: 'Inter-SemiBold',
              }}>
              Google
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.touchable}>
            <Facebook style={styles.icon} />
            <Text style={{color: 'black', fontFamily: 'Inter-SemiBold'}}>
              Facebook
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.row}>
          <Text
            style={{
              marginBottom: (10 / dim.h) * dim.Height,
              color: 'black',
              fontFamily: 'Inter-Regular',
            }}>
            {' '}
            Don't have an Account?{' '}
          </Text>
          <Text
            style={{
              color: '#91C888',
              fontFamily: 'Inter-SemiBold',
            }}
            onPress={() => navigation.navigate('UserFitnessGoal')}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: (50 / dim.h) * dim.Height,
    marginHorizontal: (20 / dim.w) * dim.Width,
    justifyContent: 'center',
  },

  midcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: (24 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,
    marginHorizontal: (10 / dim.w) * dim.Width,
    color: '#90C888',
    marginTop: (20 / dim.h) * dim.Height,
    fontFamily: 'Inter-Medium',
  },
  input: {
    height: (50 / dim.h) * dim.Height,
    width: (300 / dim.w) * dim.Width,
  },

  btn: {
    marginTop: (20 / dim.h) * dim.Height,
    width: (300 / dim.w) * dim.Width,
    marginBottom: (40 / dim.h) * dim.Height,
    fontFamily: 'Inter-SemiBold',
  },

  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    width: (150 / dim.w) * dim.Width,
    height: (35 / dim.h) * dim.Height,
    borderRadius: 10,
    borderColor: '#90C888',
    margin: (8 / dim.h) * dim.Height,
  },

  icon: {
    height: (25 / dim.h) * dim.Height,
    width: (25 / dim.w) * dim.Width,
    marginRight: (6 / dim.w) * dim.Width,
  },

  hcontainer: {
    marginTop: (20 / dim.h) * dim.Height,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: (30 / dim.h) * dim.Height,
  },
  row: {
    flexDirection: 'row',
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
