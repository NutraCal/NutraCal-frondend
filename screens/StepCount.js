import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import ColorfulCard from 'react-native-colorful-card';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {accelerometer} from 'react-native-sensors';
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';
const THRESHOLD = 1.2; // Threshold for detecting steps

export default function StepCount({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const [stepCount, setStepCount] = useState(0); // Count of steps taken
  const [dCount, setDCount] = useState(0); // Display steps
  const [lastX, setLastX] = useState(0); // Last known x value
  const [lastY, setLastY] = useState(0); // Last known y value
  const [lastZ, setLastZ] = useState(0); // Last known z value
  const [isRequestSent, setIsRequestSent] = useState(false);

  //StepCount
  const line = {
    labels: ['18', '19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      {
        data: [10000, 5000, 7000, 8000, 4000, 1000, 700],
        strokeWidth: 2, // optional
      },
    ],
  };

  useEffect(() => {
    let subscription = accelerometer.subscribe(({x, y, z}) => {
      // Calculate the difference between the current and last known values
      const xDiff = Math.abs(x - lastX);
      const yDiff = Math.abs(y - lastY);
      const zDiff = Math.abs(z - lastZ);

      // Check if a step has been taken
      if (xDiff + yDiff + zDiff > THRESHOLD) {
        setStepCount(count => count + 1);
      }

      // Set the last known values to the current values
      setLastX(x);
      setLastY(y);
      setLastZ(z);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }

      // Reset the request sent flag when the component unmounts
      setIsRequestSent(false);
    };
  }, [lastX, lastY, lastZ]);

  useEffect(() => {
    // Send step count to server when the step count reaches a certain value
    const sendStepCount = async () => {
      // Send step count to server when the step count reaches a certain value
      if (stepCount % 100 === 0 && stepCount > 0 && !isRequestSent) {
        const data = {
          email: email,
          stepCount: stepCount,
        };

        try {
          console.log('step count updating');
          console.log(stepCount);
          const response = await axios.post(
            endpoint + '/meals/updateStepCount',
            data,
          );
          console.log('step count updated');

          // Set stepCount to 0 after successful request
          setStepCount(0);
          setIsRequestSent(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    sendStepCount();
  }, [stepCount, isRequestSent]);

  useEffect(() => {
    const handleBackButton = () => {
      // Handle back button press here
      console.log('Back button pressed');
      navigation.goBack(); // Go back to the previous screen

      // Return true to indicate that the back button press is handled
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
    // return () => {
    //   BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    // };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Step Count</Text>
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
      <Image
        style={{
          width: (200 / dim.w) * dim.Width,
          height: (200 / dim.h) * dim.Height,
          marginBottom: (30 / dim.h) * dim.Height,
          marginTop: (20 / dim.h) * dim.Height,
        }}
        source={require('../assets/images/walk.png')}
      />
      <Text>Step count: {stepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (20 / dim.h) * dim.Height,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
