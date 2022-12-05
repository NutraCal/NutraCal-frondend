import React, {useState} from 'react';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Eating from '../assets/eating.svg';
import Cooking from '../assets/cooking.svg';
import Mobile from '../assets/mobile.svg';
import Ob1 from '../assets/Ob1.svg';
import Ob2 from '../assets/Ob2.svg';
import Ob3 from '../assets/Ob3.svg';

import Login from './Login';
import userFitnessGoal from './userFitnessGoal';

const Intro = ({navigation, route}) => {
  return (
    <View style={styles.MainDiv2}>
      <Text style={styles.PrimaryColor}>NutraCal</Text>
      <ScrollView horizontal={true}>
        <View style={styles.MainDiv3}>
          <Eating style={styles.image} />
          <Text style={styles.HeadingOnboarding}>Eat Healthy</Text>
          <Text style={styles.TextOnboarding}>
            Maintaining good health should be the{'\n'}primary focus of
            everyone.
          </Text>
          <Ob1 style={styles.image2} />
        </View>
      
        <View style={styles.MainDiv3}>
          <Cooking style={styles.image} />
          <Text style={styles.HeadingOnboarding}>Healthy Recipes</Text>
          <Text style={styles.TextOnboarding}>
            Browse thousands of healthy recipes{'\n'}from all over the world.
          </Text>
          <Ob2 style={styles.image2} />
        </View>
        <View style={styles.MainDiv3}>
          <Mobile style={styles.image} />
          <Text style={styles.HeadingOnboarding}>Track Your Health</Text>
          <Text style={styles.TextOnboarding}>
            With amazing inbuilt tools you can{'\n'}track your progress.
          </Text>
          <Ob3 style={styles.image2} />
        </View>
      </ScrollView>

  
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('userFitnessGoal')}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    


      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={styles.TextOnboarding}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.TextOnboarding2}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  MainDiv: {
    backgroundColor: '#91C788',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainDiv2: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainDiv3: {
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 43,
    fontFamily: 'Inter-ExtraBold',
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 20,
    marginTop: 60,
  },
  image2: {
    height: 8,
    width: 80,
    marginTop: 20,
  },
  PrimaryColor: {
    color: '#91C788',
    fontSize: 30,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  HeadingOnboarding: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 25,
    fontFamily: 'Inter-SemiBold',
    margin: 10,
  },
  TextOnboarding: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 30,
  },
  TextOnboarding2: {
    color: '#91C788',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 30,
  },

  btn:{
    width:330, 
    height:48, 
    backgroundColor:"#91C788",
    alignSelf:"center", 
    borderRadius:12,
     alignItems:"center", 
     justifyContent:"center",
     marginTop:40, 
     marginBottom:10,
  },

  
  btnText: {
    color:"white", 
    fontSize:16, 
    fontFamily:"Inter-SemiBold"
  },
});

export default Intro;
