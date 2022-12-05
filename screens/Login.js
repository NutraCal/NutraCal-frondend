import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput
} from 'react-native';
import register from './register';
import Home from './homeDummy';
import userGwh from './userGwh';
import userFitnessGoal from './userFitnessGoal';
import Facebook from '../assets/Facebook.svg';
import Google from '../assets/Google.svg';
import ErrorMessage from '../components/ErrorMessage';
import TabStack from './TabStack';


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
      fetch('http://10.113.12.243:3000/users/login', {
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
          <Text style={styles.label1}>Email</Text>
          <TextInput 
            style={styles.txtinput} 
            placeholder="Enter your email" 
            value={email}
            placeholderTextColor="#C5C6CC" 
            onChangeText={text => setEmail(text)}
            style={styles.txtinput}/>
          <Text
            style={{
              color: email != '' ? '#f3f3f3' : '#FF0000',
              fontSize: 12,
              marginBottom: 10,
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
              color: password != '' ? '#f3f3f3' : '#FF0000',
              fontSize: 12,
              marginBottom: 10,
              fontFamily: 'Inter-Light',
            }}>
            Please fill out the field
          </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TabStack')}>
        <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>


        <Text style={styles.label}> ─────────── or Login with ─────────── </Text>

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
    marginTop: 50,
    marginHorizontal: 20,
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
    marginBottom: 10,
    color: 'black',
  },

  h3: {
    color: 'grey',
    marginBottom: 30,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },

  label1: {
    marginTop: 24,
    marginBottom:10,
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    textAlign: 'left',
    color:"black",
    alignSelf:'flex-start'
  },
  label: {
    fontSize: 14,
    marginHorizontal: 10,
    color: '#90C888',
    marginTop:20,
    fontFamily: 'Inter-Medium',
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


  btn:{
    width:330, 
    height:48, 
    backgroundColor:"#91C788",
    alignSelf:"center", 
    borderRadius:12,
     alignItems:"center", 
     justifyContent:"center",
     marginTop:20,
     marginBottom:20,
  },
  
  btnText: {
    color:"white", 
    fontSize:16, 
    fontFamily:"Inter-SemiBold"
  },

  txtinput:{ 
    borderColor: '#E1E3E8', 
    borderWidth: 1,
    height: 48,
    width:350,
    paddingHorizontal:15,
    borderRadius:10,
    fontFamily:"Inter-Regular",
    color:"black",
    fontSize:16,
    marginBottom:5,
    
  },
});
