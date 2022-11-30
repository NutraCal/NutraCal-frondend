import React, {useState} from 'react';
import register from './register';
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
import Mushroom from '../assets/mushroom.svg';
import Olives from '../assets/olives.svg';
import Tofu from '../assets/tofu.svg';
import Brocolli from '../assets/brocolli.svg';
import Onion from '../assets/onion.svg';
import Shrimp from '../assets/shrimp.svg';
const Stack = createNativeStackNavigator();

const userIng = ({navigation, route}) => {
  const [pressed, setPressed] = useState(6);
  const [pressed1, setPressed1] = useState(6);
  const [pressed2, setPressed2] = useState(6);
  const [pressed3, setPressed3] = useState(6);
  const [pressed4, setPressed4] = useState(6);
  const [pressed5, setPressed5] = useState(6);
  const setColor = number => {
    if (pressed == 0) {
      setPressed(1);
    } else {
      setPressed(number);
    }
  };
  const setColor1 = number => {
    if (pressed1 == 1) {
      setPressed1(0);
    } else {
      setPressed1(number);
    }
  };
  const setColor2 = number => {
    if (pressed2 == 2) {
      setPressed2(0);
    } else {
      setPressed2(number);
    }
  };
  const setColor3 = number => {
    if (pressed3 == 3) {
      setPressed3(0);
    } else {
      setPressed3(number);
    }
  };
  const setColor4 = number => {
    if (pressed4 == 4) {
      setPressed4(0);
    } else {
      setPressed4(number);
    }
  };
  const setColor5 = number => {
    if (pressed5 == 5) {
      setPressed5(0);
    } else {
      setPressed5(number);
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={styles.Heading}>Which ingredients do you dislike?</Text>
      <Text style={styles.Text}>Select all that apply.</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setColor(0)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed == 0 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Mushroom style={styles.vector} />
          <Text style={styles.listText}>Mushroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor1(1)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed1 == 1 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Olives style={styles.vector} />
          <Text style={styles.listText}>Olives</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setColor2(2)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed2 == 2 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Tofu style={styles.vector} />
          <Text style={styles.listText}>Tofu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor3(3)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed3 == 3 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Brocolli style={styles.vector} />
          <Text style={styles.listText}>Brocolli</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setColor4(4)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed4 == 4 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Onion style={styles.vector} />
          <Text style={styles.listText}>Onion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor5(5)}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed5 == 5 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Shrimp style={styles.vector} />
          <Text style={styles.listText}>Shrimp</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('register')}>
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
    height: 80,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginLeft: 15,
    marginBottom: 30,
    flexDirection: 'row',
  },
  listText: {
    color: '#1F2024',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    lineHeight: 30,
    marginLeft: 2,
  },
  btn: {
    backgroundColor: '#91C788',
    height: 50,
    width: 370,
    borderRadius: 18,
    marginTop: 250,
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
export default userIng;
