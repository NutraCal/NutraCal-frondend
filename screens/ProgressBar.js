import React from 'react';
import {View, Image} from 'react-native';
import PBar from '../assets/progressBar.svg';

const ProgressBar = () => {
  return (
    <View>
      <PBar style={{height: 8, width: 390, marginBottom: 20}} />
    </View>
  );
};

export default ProgressBar;
