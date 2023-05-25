import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';

export default function MyAppointments({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const role = user?.data?.user?.role;
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async res => {
    var data = JSON.stringify({
      email: email,
    });

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/users/getAppointments',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      if (response && response.data && response.data.length > 0) {
        setAppointments(response.data);
      }
      // setNutritionist(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const getNAppointments = async res => {
    var data = JSON.stringify({
      email: email,
    });

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/nutritionist/getAppointments',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      if (response && response.data && response.data.length > 0) {
        setAppointments(response.data);
      }
      // setNutritionist(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    console.log(role);
    if (role === 'User') {
      getAppointments();
    } else {
      getNAppointments();
    }
  }, []);

  return (
    <View style={styles.container}>
      {appointments.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box3}
          onPress={() => {
            console.log(item.Title);
            navigation.navigate('CallHome');
          }}>
          <View style={styles.thumbnail2}></View>

          <View style={{width: 250}}>
            {role === 'Nutritionist' ? (
              <View>
                <Text style={styles.name}>{item.user}</Text>
                <Text style={styles.name}>{item.day}</Text>
                <Text style={styles.desc}>{item.time}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.name}>{item.nutritionist}</Text>
                <Text style={styles.name}>{item.day}</Text>
                <Text style={styles.desc}>{item.time}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFF7EE',
    alignSelf: 'flex-start',
    marginVertical: 10,
    width: dim.Width * 0.93,
  },

  thumbnail2: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },

  box3: {
    width: 350,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF7EE',
    alignSelf: 'center',
    paddingVertical: 20,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 0,
  },
  thumbnail2: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },
});
