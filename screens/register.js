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
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FormData from 'form-data';
import axios from 'axios';
import deviceStorage from '../util/deviceStorage';

const Register = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
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
  const [image, setImage] = useState(null);
  const [qualification, setQualification] = useState('');
  const [expertise, setExpertise] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  React.useEffect(() => {
    if (route.params?.role) {
      const role = route.params?.role;

      if (
        role === 'User' &&
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
        // const role = route.params?.role;
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
        setRole(role);
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

        console.log('here in user');
        // console.log(qualification);
        // console.log(allergies);
        // console.log(role);
      } else if (
        role === 'Nutritionist' &&
        route.params?.qualification &&
        route.params?.expertise &&
        route.params?.startDay &&
        route.params?.endDay &&
        route.params?.startTime &&
        route.params?.endTime
      ) {
        const qualification = route.params?.qualification;
        const expertise = route.params?.expertise;
        const startDay = route.params?.startDay;
        const endDay = route.params?.endDay;
        const startTime = route.params?.startTime;
        const endTime = route.params?.endTime;

        console.log('hehe in nutritionist');
        // console.log(qualification);
        // console.log(expertise);
        // console.log(role);
        setRole(role);
        setQualification(qualification);
        setExpertise(expertise);
        setStartDay(startDay);
        setEndDay(endDay);
        setStartTime(startTime);
        setEndTime(endTime);
      }
    }
  }, [
    route.params?.role,
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
    route.params?.qualification,
    route.params?.expertise,
    route.params?.startDay,
    route.params?.endDay,
    route.params?.startTime,
    route.params?.endTime,
  ]);

  const handleChoosePhoto = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createUser = async res => {
    const data = new FormData();
    if (role == 'User') {
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('fitnessGoal', goal);
      data.append('gender', gender);
      data.append('age', age);
      data.append('height', height);
      data.append('heightUnit', heightUnit);
      data.append('weight', weight);
      data.append('weightUnit', weightUnit);
      data.append('allergies', allergies);
      data.append('diet', diet);
      data.append('ingredients', 'abc');
      data.append('role', role);
      const photo = await RNFS.readFile(image.assets[0].uri, 'base64');
      data.append('photo', {
        uri: image.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg', // You can set the type here if you know the specific file type
      });
    } else {
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('qualification', qualification);
      data.append('areaOfExpertise', expertise);
      data.append('startDay', startDay);
      data.append('endDay', endDay);
      data.append('startTime', startTime);
      data.append('endTime', endTime);
      data.append('role', role);
      const photo = await RNFS.readFile(image.assets[0].uri, 'base64');
      data.append('photo', {
        uri: image.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg', // You can set the type here if you know the specific file type
      });
    }

    try {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        /^(?=.*\d).{8,12}$/.test(password)
      ) {
        // console.log(data)
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(role);
        console.log(qualification);
        console.log(expertise);
        console.log(data);
        // console.log(image.assets[0].uri);

        try {
          console.log('about to send request');
          const response = await axios({
            method: 'post',
            maxContentLength: Infinity,
            url: endpoint + '/users/createUser',
            headers: {
              // 'Content-Type': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            data: data,
          });

          console.log(JSON.stringify(response.data));
          if (response.status === 200) {
            registerDevice(email);
            navigation.navigate('Login');
          } else {
            Alert.alert(
              'User already exists',
              'Create Account with new Email',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } catch (error) {
          console.log(error.response);
        }

        console.log('hehe in if dumbooooo');
      } else {
        console.log('hehe in else');
        // setIsEmailValid('false');
        // setIsPasswordValid('false');
        // Alert.alert('Invalid Input', 'Please check your email and password', [
        //   {text: 'OK', onPress: () => console.log('OK Pressed')},
        // ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerDevice = async email => {
    console.log('registerDevice');
    const fcmToken = await deviceStorage.loadItem('FCMToken');
    var data = JSON.stringify({
      tokenID: fcmToken,
      email: email,
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/notifications/registerNotification',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        alert('Device Registered Successfully');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const credentialsValidation = () => {
    setPressed(true);
    console.log('trying');
    console.log('email');

    if (email == '' && password == '' && name == '') {
      Alert.alert('Empty field', 'Please fill all fields first', [
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
      <Text style={styles.h1}>Create Account{ings}</Text>
      <Text style={styles.h3}>Connect with your Friends Today!</Text>
      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={{alignSelf: 'center'}}>
        {image ? (
          <Image source={{uri: image.assets[0].uri}} style={styles.img} />
        ) : (
          <View style={styles.imgView}>
            <Text style={{color: '#FFFFFF', fontSize: 40}}>+</Text>
          </View>
        )}
      </TouchableOpacity>

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
  img: {
    width: (120 / dim.w) * dim.Width,
    height: (120 / dim.h) * dim.Height,
    borderRadius: 100,
  },
  imgView: {
    width: (120 / dim.w) * dim.Width,
    height: (120 / dim.h) * dim.Height,
    borderRadius: 100,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Register;
