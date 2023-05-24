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

import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';

import {useFocusEffect} from '@react-navigation/native';

export default function ViewMeal({route, navigation}) {
  const item = route.params?.item;
  const edita = route.params?.edita;
  const [edit, setEditable] = useState(edita);
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
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

  const [json, setJson] = useState('');
  const [btext, setBtext] = useState('Click to update meal');
  const [loadData, setLoadData] = useState(false);

  const updateMeal = async res => {
    var data = JSON.stringify({
      mealId: item._id,
      name: name,
      category: value3,
      calories: parseInt(calories),
      proteins: parseInt(proteins),
      fats: parseInt(fats),
      carbohydrates: parseInt(carbs),
      date: item.date,
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/meals/updateMeal',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        updateDailyNutrition();
        alert('meal updated successfully');
        // navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDailyNutrition = async res => {
    var data = JSON.stringify({
      email: email,
      date: item.date,
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

  useEffect(() => {
    console.log(item);
    console.log(edita);
    setName(item.name);
    setValue3(item.category);
    setCalories(item.calories.toString());
    setFats(item.fats.toString());
    setProteins(item.proteins.toString());
    setCarbs(item.carbohydrates.toString());
  }, []);

  useEffect(() => {
    if (edita !== edit) {
      setEditable(edita);
    }
  }, [edita]);

  return (
    // <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container2}>
      <Image
        source={require('../assets/images/recipecover.png')}
        style={{
          width: (90 / dim.w) * dim.Width,
          height: (130 / dim.w) * dim.Width,
          borderRadius: 20,
        }}
      />

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
          editable={edit}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.heading}>Category:</Text>
          <DropDownPicker
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
            disabled={!edit}
          />
        </View>

        {/* <Text style={styles.heading}>Nutrition</Text> */}
        <Text style={styles.heading2}>Calories</Text>
        <TextInput
          value={calories}
          keyboardType="numeric"
          onChangeText={text => setCalories(text)}
          style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
          placeholder="Calories"
          placeholderTextColor="#8F9098"
          editable={edit}
        />
        <Text style={styles.heading2}>Fats</Text>
        <TextInput
          value={fats}
          keyboardType="numeric"
          onChangeText={text => setFats(text)}
          style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
          placeholder="Fats"
          placeholderTextColor="#8F9098"
          editable={edit}
        />
        <Text style={styles.heading2}>Proteins</Text>
        <TextInput
          value={proteins}
          keyboardType="numeric"
          onChangeText={text => setProteins(text)}
          style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
          placeholder="Proteins"
          placeholderTextColor="#8F9098"
          editable={edit}
        />
        <Text style={styles.heading2}>Carbs</Text>
        <TextInput
          value={carbs}
          keyboardType="numeric"
          onChangeText={text => setCarbs(text)}
          style={[styles.txtinput, {marginBottom: (10 / dim.h) * dim.Height}]}
          placeholder="Carbs"
          placeholderTextColor="#8F9098"
          editable={edit}
        />

        {edita && (
          <TouchableOpacity
            onPress={() => {
              updateMeal();
            }}
            style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Update meal
            </Text>
          </TouchableOpacity>
        )}
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

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (8 / dim.h) * dim.Height,
  },

  heading2: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    // marginTop: (10 / dim.h) * dim.Height,
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

  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: (40 / dim.h) * dim.Height,
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
  },
});
