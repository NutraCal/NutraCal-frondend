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
import axios from 'axios';

const AdminRegister = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState('false');
  const [isPasswordValid, setIsPasswordValid] = useState('false');
  const [pressed, setPressed] = useState(false);

  const createUser = async res => {
    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    try {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        /^(?=.*\d).{8,12}$/.test(password)
      ) {
        console.log(name, email, password);
        console.log(data);

        try {
          console.log('about to send request');
          const response = await axios({
            method: 'post',
            url: endpoint + '/admin/createAdmin',
            headers: {
              'Content-Type': 'application/json',
            },
            data: data,
          });
          console.log(JSON.stringify(response.data));

          if (response.status == 200) {
            navigation.navigate('AdminLogin');
          } else {
            Alert.alert('Uh oh', 'Admin already exists', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        } catch (error) {
          console.log(error.response);
        }
        console.log('in if');

        // setEmail('');
        // setPassword('');
        // setIsEmailValid('true');
        // setIsPasswordValid('true');
      } else {
        console.log('hehe in else');
        // setIsEmailValid('false');
        // setIsPasswordValid('false');
        // Alert.alert('Invalid Input', 'Please check your email and password', [
        //   {text: 'OK', onPress: () => console.log('OK Pressed')},
        // ]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const credentialsValidation = () => {
    console.log('here to validate');
    setPressed(true);

    if (email == '' && password == '' && name == '') {
      Alert.alert('Empty field', 'Please fill the fields', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (name == '') {
      Alert.alert('Empty field', 'Please enter name', [
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

    createUser();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create Account</Text>
      <Text style={styles.h3}>Admin!</Text>

      <View style={styles.midcontainer}>
        <View>
          <Text style={styles.label1}>Name</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Enter your name"
            value={name}
            placeholderTextColor="#C5C6CC"
            onChangeText={text => setName(text)}
            style={styles.txtinput}
          />
        </View>

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
            onPress={() => navigation.navigate('AdminLogin')}>
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
export default AdminRegister;
