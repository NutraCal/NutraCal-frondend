import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import Cover from '../assets/images/recipecover.svg';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';
import {endpoint} from '../util/config';

export default function AddMeal({route, navigation}) {
  const {email} = route.params;

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

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
  const [userId, setUserId] = useState('');
  const [json, setJson] = useState('');

  const getUserId = async res => {
    console.log('inside');
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/users/getUserId/' + email,
        headers: {},
      });

      console.log(JSON.stringify(response.data));

      setJson(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const saveMeal = async res => {
    console.log('here');
    console.log(userId);

    var data = JSON.stringify({
      name: name,
      category: value3,
      calories: parseInt(calories),
      proteins: parseInt(proteins),
      fats: parseInt(fats),
      carbohydrates: parseInt(carbs),
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/meals/addMeal/' + email,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        updateDailyNutrition();
        alert('meal added successfully');
        navigation.goBack({
          email: email,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDailyNutrition = async res => {
    var data = JSON.stringify({
      email: email,
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <Cover width={90} height={150} />

          <View
            style={{
              alignItems: 'flex-start',
              padding: 10,
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
                style={{
                  width: 350,
                  borderWidth: 1,
                  height: 20,
                  borderColor: '#E1E3E8',
                }}
                containerStyle={{
                  width: 350,
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

            <Text style={styles.heading}>Nutrition</Text>
            <TextInput
              value={calories}
              keyboardType="numeric"
              onChangeText={text => setCalories(text)}
              style={[styles.txtinput, {marginBottom: 10}]}
              placeholder="Calories"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={fats}
              keyboardType="numeric"
              onChangeText={text => setFats(text)}
              style={[styles.txtinput, {marginBottom: 10}]}
              placeholder="Fats"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={proteins}
              keyboardType="numeric"
              onChangeText={text => setProteins(text)}
              style={[styles.txtinput, {marginBottom: 10}]}
              placeholder="Proteins"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={carbs}
              keyboardType="numeric"
              onChangeText={text => setCarbs(text)}
              style={[styles.txtinput, {marginBottom: 10}]}
              placeholder="Carbs"
              placeholderTextColor="#8F9098"
            />

            <TouchableOpacity
              onPress={saveMeal}
              style={{
                width: 330,
                height: 48,
                backgroundColor: '#91C788',
                alignSelf: 'center',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 20,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 8,
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: 48,
    width: 350,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },

  textinputc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 350,
  },

  box3: {
    height: 55,
    width: 350,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  cbtn: {
    width: 30,
    height: 30,
    backgroundColor: '#91C788',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: 5,
    width: 180,
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
});
