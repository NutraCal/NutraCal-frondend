import React, {useState, useEffect, useContext} from 'react';
var axios = require('axios');
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
  const [countData, setCountData] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const image = user?.data?.user?.Image;
  const name = user?.data?.user?.name;

  //Water Intake
  const line2 = {
    labels: ['18', '19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      {
        data: [8, 10, 7, 8, 11, 10, 9, 10],
        strokeWidth: 2, // optional
      },
    ],
  };
  const line = {
    labels: ['18', '19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      {
        data: [1200, 1440, 1530, 1350, 1390, 1356, 1356],
        strokeWidth: 2, // optional
      },
    ],
  };

  const getSteps = async () => {
    try {
      const response = await axios.post(endpoint + '/meals/getSteps', {
        email: email,
      });

      let chartData = response.data.data;

      if (chartData) {
        const count = chartData.map(obj => obj.count);
        const date = chartData.map(obj => obj.date);
        setCountData(count);
        setDateLabels(date);
        console.log('date', dateLabels);
        console.log('count', countData);
        // line = {
        //   labels: dateLabels,
        //   datasets: [
        //     {
        //       data: count,
        //     },
        //   ],
        // };
      } else {
        console.log('chartData is undefined or null');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getSteps();
    console.log(image);
  }, [loadData]);

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
          <Text style={styles.heading}>Calories intake</Text>
          <LineChart
            data={line}
            width={(350 / dim.w) * dim.Width} // from react-native
            height={200}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#e26a00',
              backgroundGradientTo: '#2bc3df',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 8,
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
              title="Calories"
              value="1000-3000"
              valuePostfix=""
              footerTitle="1200"
              footerValue="Healthy"
              iconImageSource={require('../assets/icons/pulse.png')}
              onPress={() => navigation.navigate('Calories')}
            />
            <ColorfulCard
              title="BMI"
              value="18.5-24.9"
              valuePostfix=""
              footerTitle="20"
              footerValue="Normal"
              iconImageSource={require('../assets/icons/sleep.png')}
              style={{backgroundColor: '#7954ff'}}
              onPress={() => navigation.navigate('Bmi')}
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
              title="Water Intake"
              value="8-12"
              valuePostfix="glass"
              footerTitle="Daily Goal"
              footerValue="10"
              iconImageStyle={{tintColor: '#fff'}}
              iconImageSource={require('../assets/icons/hot-or-burn-interface-symbol.png')}
              style={{backgroundColor: '#fe8f62'}}
              onPress={() =>
                navigation.navigate('WaterLog', {
                  email: email,
                })
              }
            />
            <ColorfulCard
              title="Steps"
              value="8000-9000"
              valuePostfix=""
              footerTitle="Daily Goal"
              footerValue="8,000 steps"
              iconImageSource={require('../assets/icons/steps.png')}
              style={{backgroundColor: '#2bc3ff'}}
              onPress={() => navigation.navigate('StepCount')}
            />
          </View>
        </SafeAreaView>
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
    borderRadius: 10,
    backgroundColor: '#91C788',
  },
});
