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
// import {ScrollView} from 'react-native-gesture-handler';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import FormData from 'form-data';

export default function BookAppointment({route, navigation}) {
  const nEmail = route.params.nEmail;
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loadData, setLoadData] = useState(true);
  const [image, setImage] = useState(null);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [Day, setDay] = useState([
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
    {label: 'Sunday', value: 'Sunday'},
  ]);

  const [time, setTime] = useState([
    {label: '11 AM', value: '11 AM'},
    {label: '12 PM', value: '12 AM'},
    {label: '1 PM', value: '1 PM'},
    {label: '2 PM', value: '2 PM'},
    {label: '3 PM', value: '3 PM'},
    {label: '4 PM', value: '4 PM'},
  ]);

  const Book = async res => {
    var data = JSON.stringify({
      nutritionistEmail: nEmail,
      userEmail: email,
      day: value2,
      time: value,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/nutritionist/bookAppointment',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      alert('Appointment Booked Successfully');
      setValue(null);
      setValue2(null);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  return (
    // <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <View
          style={{
            alignItems: 'flex-start',
            padding: (10 / dim.h) * dim.Height,
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>Pick a day</Text>
          {/* <TextInput
            style={styles.txtinput}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter blog title"
            placeholderTextColor="#8F9098"
            multiline={true}
          /> */}
          <DropDownPicker
            style={styles.ddpicker}
            containerStyle={{
              width: (350 / dim.w) * dim.Width,
            }}
            textStyle={{
              fontSize: 16,
            }}
            dropDownContainerStyle={{
              height: (120 / dim.h) * dim.Height,
            }}
            zIndex={2000}
            zIndexInverse={2000}
            open={open2}
            value={value2}
            items={Day}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setDay}
            dropDownDirection="BOTTOM"
            placeholder="Select day"
          />
          <Text style={styles.heading}>Pick a time</Text>
          <DropDownPicker
            style={styles.ddpicker}
            containerStyle={{
              width: (350 / dim.w) * dim.Width,
            }}
            textStyle={{
              fontSize: 16,
            }}
            dropDownContainerStyle={{
              height: (120 / dim.h) * dim.Height,
            }}
            zIndex={1000}
            zIndexInverse={3000}
            open={open}
            value={value}
            items={time}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setTime}
            dropDownDirection="BOTTOM"
            placeholder="Select time"
          />

          <TouchableOpacity onPress={Book} style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    flex: 1,
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (8 / dim.h) * dim.Height,
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (70 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
  },

  img: {
    borderRadius: 10,
    width: (90 / dim.w) * dim.Width,
    height: (150 / dim.w) * dim.Width,
  },
  imgView: {
    width: (90 / dim.w) * dim.Width,
    height: (150 / dim.w) * dim.Width,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
    marginTop: (40 / dim.h) * dim.Height,
  },
});
