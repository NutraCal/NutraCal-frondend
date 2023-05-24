import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Calories from '../assets/icons/calories.svg';
import Weight from '../assets/icons/weight.svg';
import Water from '../assets/icons/water.svg';
import Steps from '../assets/icons/steps.svg';
import Forw from '../assets/forwardbtn.svg';
import Login from './Login';
import dim from '../util/dim';
import {AuthContext} from '../context/AuthContext';
import {endpoint} from '../util/config';

import ColorfulCard from 'react-native-colorful-card';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default function Home({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const image = user?.data?.user?.Image;
  const name = user?.data?.user?.name;

  const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  useEffect(() => {
    console.log(image);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <View>
            <Text
              style={{fontFamily: 'Inter-Bold', fontSize: 22, color: 'black'}}>
              Hello,
            </Text>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 18,
                color: 'black',
              }}>
              {name}
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {image.filename != undefined ? (
                <Image
                  source={{
                    uri: endpoint + '/' + image.filename,
                  }}
                  style={styles.thumbnail}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <LineChart
            data={line}
            width={(350 / dim.w) * dim.Width} // from react-native
            height={200}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
            }}
          />
        </View>

        <Text style={styles.heading}>Your Insights</Text>

        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <ColorfulCard
              title="Heart Rate"
              value="126"
              valuePostfix="bpm"
              footerTitle="80-120"
              footerValue="Healthy"
              iconImageSource={require('../assets/icons/pulse.png')}
              onPress={() => {}}
            />
            <ColorfulCard
              title="Sleep"
              value="8"
              valuePostfix="h 42 m"
              footerTitle="Deep Sleep"
              footerValue="3h 13m"
              iconImageSource={require('../assets/icons/sleep.png')}
              style={{backgroundColor: '#7954ff'}}
              onPress={() => {}}
            />
          </View>

          <View
            style={{
              marginTop: 16,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <ColorfulCard
              title="Energy Burn"
              value="583"
              valuePostfix="kcal"
              footerTitle="Daily Goal"
              footerValue="900 kcal"
              iconImageStyle={{tintColor: '#fff'}}
              iconImageSource={require('../assets/icons/hot-or-burn-interface-symbol.png')}
              style={{backgroundColor: '#fe8f62'}}
              onPress={() => {}}
            />
            <ColorfulCard
              title="Steps"
              value="16,741"
              valuePostfix=""
              footerTitle="Daily Goal"
              footerValue="10,000 steps"
              iconImageSource={require('../assets/icons/steps.png')}
              style={{backgroundColor: '#2bc3ff'}}
              onPress={() => {}}
            />
          </View>

          <View
            style={{
              marginTop: 16,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <ColorfulCard
              title="Running"
              value="5,3"
              valuePostfix="km"
              footerTitle="Daily Goal"
              footerValue="10 km"
              iconImageSource={require('../assets/icons/running.png')}
              style={{backgroundColor: '#5a65ff'}}
              onPress={() => {}}
            />
            <ColorfulCard
              title="Cycling"
              value="12,5"
              valuePostfix="km"
              footerTitle="Daily Goal"
              footerValue="20 km"
              iconImageSource={require('../assets/icons/bicycle.png')}
              style={{backgroundColor: '#96da45'}}
              onPress={() => {}}
            />
          </View>
        </SafeAreaView>

        <View
          style={{
            marginTop: (10 / dim.h) * dim.Height,
            marginBottom: (20 / dim.h) * dim.Height,
          }}>
          <View style={styles.hbox}>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => navigation.navigate('Calories')}>
              <Calories
                width={(70 / dim.w) * dim.Width}
                height={(70 / dim.w) * dim.Width}
              />
              <Text style={styles.name}>Calories</Text>
              <Text style={styles.desc}>3 min ago</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box2}
              onPress={() => navigation.navigate('Bmi')}>
              <Weight
                width={(70 / dim.w) * dim.Width}
                height={(70 / dim.w) * dim.Width}
              />
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
              <Water
                width={(70 / dim.w) * dim.Width}
                height={(70 / dim.w) * dim.Width}
              />
              <Text style={styles.name}>Water</Text>
              <Text style={styles.desc}>1 hour ago</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box2}
              onPress={() => navigation.navigate('StepCount')}>
              <Steps
                width={(70 / dim.w) * dim.Width}
                height={(70 / dim.w) * dim.Width}
              />
              <Text style={styles.name}>Steps</Text>
              <Text style={styles.desc}>1 min ago</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    paddingBottom: 0,
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10 / dim.h) * dim.Height,
    marginTop: 20,
    alignItems: 'center',
    width: (350 / dim.w) * dim.Width,
    alignSelf: 'center',
  },

  paragraph: {
    marginLeft: (8 / dim.w) * dim.Width,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },

  box2: {
    height: (156 / dim.h) * dim.Height,
    width: (148 / dim.w) * dim.Width,
    borderRadius: 20,
    margin: (8 / dim.h) * dim.Height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8FB',
  },

  box3: {
    height: (80 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 20,
    margin: (10 / dim.h) * dim.Height,
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
    marginTop: (20 / dim.h) * dim.Height,
    marginLeft: (12 / dim.w) * dim.Width,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (10 / dim.h) * dim.Height,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: (5 / dim.h) * dim.Height,
  },
  thumbnail: {
    width: (60 / dim.w) * dim.Width,
    height: (60 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: 'red',
  },
});
