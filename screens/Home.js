import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Dp from '../assets/images/homedp.svg';
import Calories from '../assets/icons/calories.svg';
import Weight from '../assets/icons/weight.svg';
import Water from '../assets/icons/water.svg';
import Steps from '../assets/icons/steps.svg';
import Forw from '../assets/forwardbtn.svg';
import Login from './Login';
import dim from '../util/dim';

export default function Home({route, navigation}) {
  const {email} = route.params;

  useEffect(() => {
    const hehe = (156 / 872.72) * dim.Height;
    console.log('width ' + dim.Width);
    console.log('height ' + dim.Height);
    console.log('height ' + hehe);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          marginTop: 0,
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{fontFamily: 'Inter-Bold', fontSize: 22, color: 'black'}}>
            Hello,
          </Text>
          <Text
            style={{fontFamily: 'Inter-Regular', fontSize: 18, color: 'black'}}>
            Christie Doe
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Dp
              width={70}
              height={70}
              style={{marginLeft: 8, marginBottom: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box3}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Inter-SemiBold',
            fontSize: 18,
            width: 200,
            lineHeight: 25,
          }}>
          Track Your Weekly Progress
        </Text>
        <TouchableOpacity>
          <Forw width={24} height={24} style={{marginLeft: 20}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Your Insights</Text>

      <View style={{marginTop: 10}}>
        <View style={styles.hbox}>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('Calories')}>
            <Calories width={70} height={70} />
            <Text style={styles.name}>Calories</Text>
            <Text style={styles.desc}>3 min ago</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('Bmi')}>
            <Weight width={70} height={70} />
            <Text style={styles.name}>Weight</Text>
            <Text style={styles.desc}>4 days ago</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hbox}>
          <TouchableOpacity
            style={styles.box2}
            onPress={() =>
              navigation.navigate('WaterLog', {
                email: email,
              })
            }>
            <Water width={70} height={70} />
            <Text style={styles.name}>Water</Text>
            <Text style={styles.desc}>1 hour ago</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('StepCount')}>
            <Steps width={70} height={70} />
            <Text style={styles.name}>Steps</Text>
            <Text style={styles.desc}>1 min ago</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },

  paragraph: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },

  box2: {
    height: (156 / dim.h) * dim.Height,
    width: (148 / dim.w) * dim.Width,
    borderRadius: 20,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#F8F8FB',
    backgroundColor: 'red',
  },

  box3: {
    height: (80 / dim.h) * dim.Height,
    width: 350,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#A3A0CA',
  },

  hbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    fontFamily: 'Inter-ExtraBold',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: 10,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 5,
  },
});
