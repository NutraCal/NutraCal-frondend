import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import dim from '../util/dim';
// import {accelerometer} from 'react-native-sensors';
// import {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
import axios from 'axios';
const THRESHOLD = 1.2; // Threshold for detecting steps

export default function StepCount() {
  // const [stepCount, setStepCount] = useState(0); // Count of steps taken
  // const [lastX, setLastX] = useState(0); // Last known x value
  // const [lastY, setLastY] = useState(0); // Last known y value
  // const [lastZ, setLastZ] = useState(0); // Last known z value

  // useEffect(() => {
  //   let subscription = accelerometer.subscribe(({x, y, z}) => {
  //     // Calculate the difference between the current and last known values
  //     const xDiff = Math.abs(x - lastX);
  //     const yDiff = Math.abs(y - lastY);
  //     const zDiff = Math.abs(z - lastZ);

  //     // Check if a step has been taken
  //     if (xDiff + yDiff + zDiff > THRESHOLD) {
  //       setStepCount(count => count + 1);
  //     }
  //     // Set the last known values to the current values
  //     setLastX(x);
  //     setLastY(y);
  //     setLastZ(z);
  //   });

  //   return async () => {
  //     if (subscription) {
  //       subscription.unsubscribe();
  //     }
  //     // Send step count to server when the component unmounts
  //     if (stepCount % 500 === 0 && stepCount > 0) {
  //       try {
  //         const res = await axios.post(
  //           'http://192.168.100.101:8000/meals/updateStepCount',
  //           {
  //             email: 'khadija@gmail.com',
  //             stepCount: stepCount,
  //           },
  //         );

  //         console.log(res?.data);
  //         console.log(res?.status);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  // }, [lastX, lastY, lastZ, stepCount]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: (200 / dim.w) * dim.Width,
          height: (200 / dim.h) * dim.Height,
          marginBottom: (30 / dim.h) * dim.Height,
          marginTop: (20 / dim.h) * dim.Height,
        }}
        source={require('../assets/images/walk.png')}
      />
      <Text>Step count: {stepCount}</Text>;
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (20 / dim.h) * dim.Height,
  },
});
