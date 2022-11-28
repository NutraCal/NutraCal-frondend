import React, {useState} from 'react';
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
  TextInput,
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
  const [pressed, setPressed] = useState(1);
  const [pressed1, setPressed1] = useState(1);
  const [pressed2, setPressed2] = useState(1);
  const setColor = () => {
    if (pressed == 0) {
      setPressed(1);
      setPressed1(1);
      setPressed2(1);
    } else {
      setPressed(0);
      setPressed1(1);
      setPressed2(1);
    }
  };
  const setColor1 = () => {
    if (pressed1 == 0) {
      setPressed1(1);
      setPressed(1);
      setPressed2(1);
    } else {
      setPressed1(0);
      setPressed(1);
      setPressed2(1);
    }
  };
  const setColor2 = () => {
    if (pressed2 == 0) {
      setPressed1(1);
      setPressed(1);
      setPressed2(1);
    } else {
      setPressed2(0);
      setPressed1(1);
      setPressed(1);
    }
  };
  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={styles.Heading}>What is your Gender?</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setColor()}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed == 0 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Text style={styles.listText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor1()}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed1 == 0 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Text style={styles.listText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor2()}
          style={{
            ...styles.listItem,
            ...{
              backgroundColor:
                pressed2 == 0 ? 'rgba(145, 199, 136, 0.2)' : '#f3f3f3',
            },
          }}>
          <Text style={styles.listText}>Ignore</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.Heading}>How old are you?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput style={styles.listItem1} />
      </View>
      <Text style={styles.Heading}>What is your Height?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput style={styles.listItem2} />
        <View style={styles.listItem3}>
          <Text style={styles.listText}>ft</Text>
        </View>
      </View>

      <Text style={styles.Heading}>What is your current Weight?</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput style={styles.listItem2} />
        <View style={styles.listItem3}>
          <Text style={styles.listText}>kg</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('userAllergies')}>
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
    marginVertical: 20,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem1: {
    height: 52,
    width: 370,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem2: {
    height: 52,
    width: 280,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem3: {
    height: 52,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 15,
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
    marginTop: 100,
    borderRadius: 18,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
});
export default userGwh;
