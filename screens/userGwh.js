import React, {useState, useEffect} from 'react';
import UserAllergies from './UserAllergies';
import UserDiet from './UserDiet';
import UserIng from './UserIng';
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
import dim from '../util/dim';

const Stack = createNativeStackNavigator();
const UserGwh = ({navigation, route}) => {
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
              navigation.navigate('UserAllergies', {
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
              navigation.navigate('UserAllergies');
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
              navigation.navigate('UserAllergies');
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
              navigation.navigate('UserAllergies');
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
      <ProgressBar
        width={(350 / dim.w) * dim.Width}
        style={{marginBottom: (20 / dim.h) * dim.Height}}
      />
      <Text style={styles.Heading}>What is your Gender?</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
    marginTop: (50 / dim.h) * dim.Height,
    marginHorizontal: (20 / dim.w) * dim.Width,
    justifyContent: 'center',
  },
  Heading: {
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Light',
    lineHeight: (30 / dim.h) * dim.Height,
    marginVertical: (20 / dim.h) * dim.Height,
  },
  listItem: {
    height: (52 / dim.h) * dim.Height,
    marginHorizontal: (10 / dim.w) * dim.Width,
    width: (170 / dim.w) * dim.Width,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  listItem1: {
    height: (52 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    color: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  listItem2: {
    height: (52 / dim.h) * dim.Height,
    width: (240 / dim.w) * dim.Width,
    color: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  listItem3: {
    height: (52 / dim.h) * dim.Height,
    width: (100 / dim.w) * dim.Width,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: (20 / dim.h) * dim.Height,
    marginLeft: (10 / dim.w) * dim.Width,
  },
  listText: {
    color: '#1F2024',
    backgroundColor: '#f3f3f3',
    borderColor: 'thistle',
    borderWidth: 1,
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: (30 / dim.h) * dim.Height,
    marginLeft: (8 / dim.w) * dim.Width,
  },
  listText2: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: (30 / dim.h) * dim.Height,
    marginLeft: (8 / dim.w) * dim.Width,
  },
  btn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (80 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
export default UserGwh;
