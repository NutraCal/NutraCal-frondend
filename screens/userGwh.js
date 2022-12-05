import React, {useState, useEffect} from 'react';
import userAllergies from './userAllergies';
import userDiet from './userDiet';
import userIng from './userIng';
import ProgressBar from '../assets/progressbar2';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const userGwh = ({navigation, route}) => {
  const [goal, setGoal] = useState('');
  const [pressed, setPressed] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [heightUnit, setHeightUnit] = useState([
    {label: 'cm', value: 'cm'},
    {label: 'ft', value: 'ft'},
  ]);
  const [weightUnit, setWeightUnit] = useState([
    {label: 'kg', value: 'kg'},
    {label: 'lbs', value: 'lbs'},
  ]);
  const setGender = value => {
    setPressed(value);
  };
  React.useEffect(() => {
    if (route.params?.fitnessGoal) {
      const fitnessGoal = route.params?.fitnessGoal;
      setGoal(fitnessGoal);
    }
  }, [route.params?.fitnessGoal]);
  const inputValidation = () => {
    if (value == 'ft') {
      if (value2 == 'kg') {
        if (height >= 1 && height <= 7 && age >= 10) {
          if (weight >= 15 && weight <= 200) {
            if (pressed == 'Male' || pressed == 'Female') {
              navigation.navigate('userAllergies', {
                fitnessGoal: goal,
                gender: pressed,
                age: age,
                height: height,
                heightUnit: value,
                weight: weight,
                weightUnit: value2,
              });
            } else {
              Alert.alert(
                'Invalid Input',
                'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          } else {
            Alert.alert(
              'Invalid Input',
              'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } else {
          Alert.alert(
            'Invalid Input',
            'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      }
      if (value2 == 'lbs') {
        if (height >= 1 && height <= 7 && age >= 10) {
          if (weight >= 34 && weight <= 441) {
            if (pressed == 'Male' || pressed == 'Female') {
              navigation.navigate('userAllergies');
            } else {
              Alert.alert(
                'Invalid Input',
                'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          } else {
            Alert.alert(
              'Invalid Input',
              'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } else {
          Alert.alert(
            'Invalid Input',
            'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      }
    }
    if (value == 'cm') {
      if (value2 == 'kg') {
        if (height >= 54 && height <= 214 && age >= 10) {
          if (weight >= 15 && weight <= 200) {
            if (pressed == 'Male' || pressed == 'Female') {
              navigation.navigate('userAllergies');
            } else {
              Alert.alert(
                'Invalid Input',
                'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          } else {
            Alert.alert(
              'Invalid Input',
              'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } else {
          Alert.alert(
            'Invalid Input',
            'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      }
      if (value2 == 'lbs') {
        if (height >= 54 && height <= 214 && age >= 10) {
          if (weight >= 15 && weight <= 200) {
            if (pressed == 'Male' || pressed == 'Female') {
              navigation.navigate('userAllergies');
            } else {
              Alert.alert(
                'Invalid Input',
                'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          } else {
            Alert.alert(
              'Invalid Input',
              'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          }
        } else {
          Alert.alert(
            'Invalid Input',
            'Please enter height b/w (1-7ft or 54-214cm) and weight b/w (15-200kg or 34-441lbs)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar width={350} style={{marginBottom:20}}/>
      <Text style={styles.Heading}>What is your Gender?</Text>
      <View style={{flexDirection: 'row', alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity
          onPress={() => setGender('Male')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed == 'Male' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Text style={styles.listText2}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender('Female')}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed == 'Female' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Text style={styles.listText2}>Female</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.Heading}>How old are you?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.listItem1}
          keyboardType="numeric"
          onChangeText={text => setAge(text)}
        />
      </View>
      <Text style={styles.Heading}>What is your Height?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.listItem2}
          keyboardType="numeric"
          onChangeText={text => setHeight(text)}
        />

        <View style={styles.listItem3}>
          <DropDownPicker
            style={styles.listText}
            open={open}
            value={value}
            items={heightUnit}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setHeightUnit}
          />
        </View>
      </View>

      <Text style={styles.Heading}>What is your current Weight?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.listItem2}
          keyboardType="numeric"
          onChangeText={text => setWeight(text)}
        />
        <View style={styles.listItem3}>
          <DropDownPicker
            style={styles.listText}
            open={open2}
            value={value2}
            items={weightUnit}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setWeightUnit}
          />
        </View>
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
    marginBottom: 20,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Light',
    lineHeight: 30,
    marginVertical: 20,
  },
  listItem: {
    height: 52,
    marginHorizontal: 10,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem1: {
    height: 52,
    width: 350,
    color: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem2: {
    height: 52,
    width: 240,
    color: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem3: {
    height: 52,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  listText: {
    color: '#1F2024',
    backgroundColor: '#f3f3f3',
    borderColor: 'thistle',
    borderWidth: 1,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 8,
  },
  listText2: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 8,
  },
  btn:{
    width:330, 
    height:48, 
    backgroundColor:"#91C788",
    alignSelf:"center", 
    borderRadius:12,
     alignItems:"center", 
     justifyContent:"center",
     marginTop:80, 
     marginBottom:20,
  },

  btnText: {
    color:"white", 
    fontSize:16, 
    fontFamily:"Inter-SemiBold"
  },
});
export default userGwh;