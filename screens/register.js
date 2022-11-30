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
import Login from './Login';
const register = ({route, navigation}) => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create Account</Text>
      <Text style={styles.h3}>Connect with your Friends Today!</Text>

      <View style={styles.midcontainer}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email.value}
            mode="outlined"
            onChangeText={text => setEmail(text)}
            style={styles.input}></TextInput>
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
        </View>
        <Text style={styles.Text}>I agree to the terms and conditions,</Text>
        <Button
          style={styles.btn}
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
    marginBottom: 10,
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
