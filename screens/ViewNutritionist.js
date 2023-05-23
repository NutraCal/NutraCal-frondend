import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';

export default function ViewNutritionist({route, navigation}) {
  const {name} = route.params;
  const {nId} = route.params;
  const [nutritionist, setNutritionist] = useState([]);

  const showNutritionist = async res => {
    var data = JSON.stringify({
      name: name,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/nutritionist/searchNutritionist',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      // console.log(JSON.stringify(response.data));
      if (response && response.data && response.data.length > 0) {
        console.log(response.data[0]._id);
        setNutritionist(response.data);
      }
      // setNutritionist(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    showNutritionist();
  }, []);

  return (
    <View style={styles.MainDiv}>
      <Text style={styles.logo}>NutritionistProfile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  MainDiv: {
    backgroundColor: '#91C788',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 43,
    fontFamily: 'Inter-ExtraBold',
  },
});
