import React, {useState} from 'react';
import userGwh from './userGwh';
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
import Dp1 from '../assets/dp1.svg';
import Dp2 from '../assets/dp2.svg';
import Dp3 from '../assets/dp3.svg';
import Dp4 from '../assets/dp4.svg';
const Stack = createNativeStackNavigator();
const userDiet = ({navigation, route}) => {
  const [pressed, setPressed] = useState(4);
  const setColor = number => {
    setPressed(number);
  };
  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={styles.Heading}>
        Do you follow any of the{'\n'}following diets?
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
        <Dp1 style={styles.vector} />
        <Text style={styles.listText}>None</Text>
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
        <Dp2 style={styles.vector} />
        <Text style={styles.listText}>Vegetarian</Text>
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
        <Dp3 style={styles.vector} />
        <Text style={styles.listText}>Low-Carb</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setColor(3)}
        style={{
          ...styles.listItem,
          ...{
            backgroundColor:
              pressed == 3 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
          },
        }}>
        <Dp4 style={styles.vector} />
        <Text style={styles.listText}>Keto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('userIng')}>
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
    marginBottom: 20,
  },
  listItem: {
    height: 80,
    width: 370,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
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
    marginTop: 190,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  vector: {
    height: 50,
    width: 50,
    margin: 15,
  },
});
export default userDiet;
