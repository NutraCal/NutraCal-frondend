import React from 'react';
import {View, Image} from 'react-native';
import PBar from '../assets/progressBar.svg';
import dim from '../util/dim';

const ProgressBar = () => {
  return (
    <View>
      <PBar
        style={{
          height: (8 / dim.h) * dim.Height,
          width: (390 / dim.w) * dim.Width,
          marginBottom: (20 / dim.h) * dim.Height,
        }}
      />
    </View>
  );
};

export default ProgressBar;
