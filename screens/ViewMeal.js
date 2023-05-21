import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';

export default function ViewMeal({route, navigation}) {
  const item = route.params?.item;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log('made it to View Meal------------');
    console.log(item);
    setName(item.name);
    setCategory(item.category);
    setCalories(item.calories.toString());
    setFats(item.fats.toString());
    setProteins(item.proteins.toString());
    setCarbs(item.carbohydrates.toString());
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/recipecover.png')}
        style={{
          width: (90 / dim.w) * dim.Width,
          height: (150 / dim.w) * dim.Width,
        }}
      />

      <View
        style={{
          alignItems: 'flex-start',
          padding: (10 / dim.h) * dim.Height,
          justifyContent: 'center',
        }}>
        <Text style={styles.heading}>Meal Name</Text>

        <Text style={styles.txtinput}>{name}</Text>

        <Text style={styles.heading}>Category</Text>

        <Text style={styles.txtinput}>{category}</Text>

        <Text style={styles.heading}>Nutrition</Text>

        <Text style={styles.txtinput}>Calories : {calories}</Text>

        <Text style={styles.txtinput}>Fats : {fats}</Text>

        <Text style={styles.txtinput}>Proteins : {proteins}</Text>

        <Text style={styles.txtinput}>Carbs : {carbs}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
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
    paddingTop: 12,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (15 / dim.h) * dim.Height,
  },
});
