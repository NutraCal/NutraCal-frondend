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
      <ProgressBar width={350} style={{marginBottom: 20}} />
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
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  Heading: {
    marginTop: 20,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  Text: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Light',
    lineHeight: 30,
    marginBottom: 20,
    marginTop: 5,
  },
  listItem: {
    height: 72,
    width: 350,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listText: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 8,
  },

  btn: {
    width: 330,
    height: 48,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
    marginBottom: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
export default UserFitnessGoal;
