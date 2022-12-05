import React from 'react';
import {View, Text} from 'react-native';

const Home = ({navigation, route}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>
        You made it to the home screen Hurraaahhh
      </Text>
    </View>
  );
};
export default Home;
