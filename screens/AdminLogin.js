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
import deviceStorage from '../util/deviceStorage';

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import {AuthContext} from '../context/AuthContext';

export default function Login({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState('false');
  const [isPasswordValid, setIsPasswordValid] = useState('false');
  const {login} = useContext(AuthContext);

  const credentialsValidation = async () => {
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
      const res = await axios.post(endpoint + '/admin/loginAdmin', {
        email: email,
        password: password,
      });

      console.log(res?.data);
      console.log(res?.status);

      if (res.status == 200) {
        await login(res?.data);
        console.log('successful');

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Hello! Welcome back Admin!</Text>
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
        </View>

        <TouchableOpacity style={styles.btn} onPress={credentialsValidation}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

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
            onPress={() => navigation.navigate('SelectRole')}>
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
