import React, {useState} from 'react';
import UserGwh from './UserGwh';
import UserAllergies from './UserAllergies';
import UserDiet from './UserDiet';
import UserIng from './UserIng';
import ProgressBar from '../assets/progressbar1';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
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
const UserFitnessGoal = ({navigation, route}) => {
  const [goal, setFitnessGoal] = useState('');
  const setGoal = goal => {
    setFitnessGoal(goal);
  };
  const inputValidation = () => {
    if (goal != '') {
      navigation.navigate('UserGwh', {fitnessGoal: goal});
    } else {
      Alert.alert('Invalid Input', 'Please select your Goal', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar
        width={(350 / dim.w) * dim.Width}
        style={{marginBottom: (20 / dim.h) * dim.Height}}
      />
      <Text style={styles.Heading}>What is your Goal?</Text>
      <Text style={styles.Text}>
        It will help us choose the best program{'\n'}for you
      </Text>
      <TouchableOpacity
        onPress={() => setGoal('Lose Weight')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              goal == 'Lose Weight' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Lose Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setGoal('Gain Weight')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              goal == 'Gain Weight' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Gain Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setGoal('Be Healthier')}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              goal == 'Be Healthier' ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Be Healthier</Text>
      </TouchableOpacity>

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
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: (10 / dim.h) * dim.Height,
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Light',
    lineHeight: (30 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
    marginTop: (5 / dim.h) * dim.Height,
  },
  listItem: {
    height: (72 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  listText: {
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
    marginTop: (220 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
export default UserFitnessGoal;
