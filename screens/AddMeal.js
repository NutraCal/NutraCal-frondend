import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  // ScrollView,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import FormData from 'form-data';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';

export default function AddMeal({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const [category, setCategory] = useState([
    {label: 'Breakfast', value: 'Breakfast'},
    {label: 'Lunch', value: 'Lunch'},
    {label: 'Dinner', value: 'Dinner'},
    {label: 'Snacks', value: 'Snacks'},
  ]);

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [loadId, setLoadId] = useState(true);
  const [loadData, setLoadData] = useState(true);
  const [image, setImage] = useState(null);
  const [cDate, setCDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState('');

  const handleChoosePhoto = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const saveMeal = async res => {
    if (
      name === '' ||
      value3 === null ||
      calories === '' ||
      proteins === '' ||
      fats === '' ||
      carbs === '' ||
      cDate === '' ||
      time === '' ||
      image === null
    ) {
      alert('Please fill all fields');
      return;
    }
    console.log(cDate);
    const fTime = moment(time, 'HH:mm').format('hh:mm A');

    const data = new FormData();
    data.append('name', name);
    data.append('category', value3);
    data.append('calories', calories);
    data.append('proteins', proteins);
    data.append('fats', fats);
    data.append('carbohydrates', carbs);
    data.append('date', cDate);
    data.append('time', fTime);
    data.append('photo', {
      uri: image.assets[0].uri,
      name: 'photo.jpg',
      type: 'image/jpeg', // You can set the type here if you know the specific file type
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        maxContentLength: Infinity,
        url: endpoint + '/meals/addMeal/' + email,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        updateDailyNutrition();
        alert('meal added successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDailyNutrition = async res => {
    var data = JSON.stringify({
      email: email,
      date: cDate,
    });

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/meals/updateCalories',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTimeChange = time => {
    setTime(time);
    setModalVisible(false);
  };

  return (
    // <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={{alignSelf: 'center'}}>
          {image ? (
            <Image source={{uri: image.assets[0].uri}} style={styles.img} />
          ) : (
            <View style={styles.imgView}>
              <Text style={{color: '#FFFFFF', fontSize: 40}}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View>
            <DatePicker
              mode="time"
              onTimeChange={handleTimeChange}
              options={{
                textHeaderColor: '#333333',
                textDefaultColor: '#333333',
                mainColor: '#91C788',
                textSecondaryColor: '#D6C7A1',
              }}
              style={{borderRadius: 10}}
            />
          </View>
        </Modal>

        <View
          style={{
            alignItems: 'flex-start',
            padding: (10 / dim.h) * dim.Height,
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>Meal Name</Text>
          <TextInput
            style={styles.txtinput}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter Meal name"
            placeholderTextColor="#8F9098"
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.heading}>Category:</Text>
            <DropDownPicker
              nestedScrollEnabled={true}
              style={{
                width: (350 / dim.w) * dim.Width,
                borderWidth: 1,
                height: (20 / dim.h) * dim.Height,
                borderColor: '#E1E3E8',
              }}
              containerStyle={{
                width: (350 / dim.w) * dim.Width,
              }}
              textStyle={{
                fontSize: 16,
              }}
              open={open3}
              value={value3}
              items={category}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setCategory}
              dropDownDirection="BOTTOM"
              placeholder="Select category"
            />
          </View>

          <View style={[styles.fieldContainer]}>
            <Text style={[styles.heading, {marginTop: 30}]}>Time</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.to}>
              {time !== '' && <Text style={styles.input2}>{time}</Text>}
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Nutrition</Text>
          <TextInput
            value={calories}
            keyboardType="numeric"
            onChangeText={text => setCalories(text)}
            style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
            placeholder="Calories"
            placeholderTextColor="#8F9098"
          />
          <TextInput
            value={fats}
            keyboardType="numeric"
            onChangeText={text => setFats(text)}
            style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
            placeholder="Fats"
            placeholderTextColor="#8F9098"
          />
          <TextInput
            value={proteins}
            keyboardType="numeric"
            onChangeText={text => setProteins(text)}
            style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
            placeholder="Proteins"
            placeholderTextColor="#8F9098"
          />
          <TextInput
            value={carbs}
            keyboardType="numeric"
            onChangeText={text => setCarbs(text)}
            style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
            placeholder="Carbs"
            placeholderTextColor="#8F9098"
          />

          <TouchableOpacity
            onPress={saveMeal}
            style={{
              width: (330 / dim.w) * dim.Width,
              height: (48 / dim.h) * dim.Height,
              backgroundColor: '#91C788',
              alignSelf: 'center',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: (20 / dim.h) * dim.Height,
              marginBottom: (20 / dim.h) * dim.Height,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Add Meal
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
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: (24 / dim.h) * dim.Height,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
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
    height: (48 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  textinputc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
  },

  box3: {
    height: (55 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: (10 / dim.h) * dim.Height,
  },

  cbtn: {
    width: (30 / dim.w) * dim.Width,
    height: (30 / dim.w) * dim.Width,
    backgroundColor: '#91C788',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: (10 / dim.w) * dim.Width,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: (40 / dim.h) * dim.Height,
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
  input2: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: (15 / dim.w) * dim.Width,
  },

  to: {
    width: (350 / dim.w) * dim.Width,
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    borderColor: '#E1E3E8',
    borderRadius: 10,
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: (10 / dim.h) * dim.Height,
  },
});
