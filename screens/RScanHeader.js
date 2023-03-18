import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicon from "react-native-vector-icons/Ionicons" 

const RScanHeader = ({ title, onBackPress, onNextPress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, width:'100%',  backgroundColor: '#F7F7F7', paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicon name="arrow-back" size={24} color="#91C788" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color:"#1F2024"}}>{title}</Text>
      <TouchableOpacity onPress={onNextPress}>
        <Text style={{ fontSize: 16, color: '#91C788' }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RScanHeader;
