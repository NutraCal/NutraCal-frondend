import React, {useState} from 'react';
import userGwh from './userGwh';
import userAllergies from './userAllergies';
import userDiet from './userDiet';
import userIng from './userIng';
import ProgressBar from './ProgressBar';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
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
const userFitnessGoal = ({navigation, route}) => {
  const [pressed, setPressed] = useState(3);
  const setColor = number => {
    setPressed(number);
  };
  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={styles.Heading}>What is your Goal?</Text>
      <Text style={styles.Text}>
        It will help us choose the best program{'\n'}for you
      </Text>
      <TouchableOpacity
        onPress={() => setColor(0)}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              pressed == 0 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Lose Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setColor(1)}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              pressed == 1 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Gain Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setColor(2)}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              pressed == 2 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Text style={styles.listText}>Be Healthier</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('userGwh')}>
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
    width: 370,
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
    backgroundColor: '#91C788',
    height: 50,
    width: 370,
    borderRadius: 18,
    marginTop: 240,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
});
export default userFitnessGoal;
