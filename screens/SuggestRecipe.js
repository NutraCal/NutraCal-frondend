import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import dim from '../util/dim';

import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';

export default function SuggestRecipe({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;

  const [idata, setIData] = useState([]); // Separate state for the data array

  const [ing, setIng] = useState('');

  const addIngredient = () => {
    //Add a new ingredient to the data array
    if (ing.trim() === '') {
      return; // Skip if the ingredient is empty or whitespace
    }
    if (idata.length > 4) {
      alert('number of ingredients exceeded');
      return;
    }
    if (idata.some(item => item.name.toLowerCase() === ing.toLowerCase())) {
      alert('Ingredient already exists');
      return;
    }
    const newIngredient = {id: idata.length + 1, name: ing};
    setIData(prevData => [...prevData, newIngredient]);
    setIng(''); // Clear the input after adding the ingredient
    console.log(idata);
  };

  const removeIngredient = id => {
    // Remove an ingredient from the data array
    // setIData(prevData => prevData.filter(item => item.id !== id));

    setIData(prevData => {
      const updatedData = prevData.filter(item => item.id !== id);
      // Update the IDs of the remaining ingredients
      const updatedDataWithConsistentIDs = updatedData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      return updatedDataWithConsistentIDs;
    });
  };

  const suggestRecipe = async res => {
    // setLoading(true);
    // console.log(idata);
    const ingredientNames = idata.map(item => item.name);
    console.log(ingredientNames);

    var data = JSON.stringify({
      ingredients: ingredientNames,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/suggestRecipes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));

      // setRecipes(response.data);
      if (response.status == 200) {
        const responseArray = response.data;
        console.log('hehe', responseArray);
        navigation.navigate('SuggestedRecipeResults', {
          responseArray,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-start',
          width: (350 / dim.w) * dim.Width,
          marginTop: (20 / dim.h) * dim.Height,
          marginBottom: (10 / dim.h) * dim.Height,
        }}>
        <Text style={styles.boldheading}>What's in your kitchen?</Text>
        <Text style={styles.subheading}>Enter up to 5 ingredients</Text>
      </View>

      <View style={styles.textinputc}>
        <TextInput
          style={[styles.txtinput, {width: (300 / dim.w) * dim.Width}]}
          placeholder="Type and add your ingredients"
          placeholderTextColor="#C5C6CC"
          value={ing}
          onChangeText={text => setIng(text)}
        />
        <TouchableOpacity style={styles.cbtn} onPress={addIngredient}>
          <Text style={{fontSize: 20, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 450}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={idata}
          keyExtractor={item => item.id.toString()}
          // renderItem={({item}) => <Text>{item.name}</Text>}
          renderItem={({item}) => (
            <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ing1
                  width={(40 / dim.w) * dim.Width}
                  height={(39 / dim.h) * dim.Height}
                  style={{marginRight: (20 / dim.w) * dim.Width}}
                />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeIngredient(item.id)}
                style={[
                  styles.cbtn,
                  {
                    marginLeft: (50 / dim.w) * dim.Width,
                    elevation: 2,
                    backgroundColor: 'white',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#91C788',
                    alignSelf: 'center',
                  }}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          width: (330 / dim.w) * dim.Width,
          height: (48 / dim.h) * dim.Height,
          backgroundColor: '#91C788',
          alignSelf: 'center',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: (40 / dim.h) * dim.Height,
          marginBottom: (20 / dim.h) * dim.Height,
        }}
        onPress={suggestRecipe}>
        <Text
          style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold'}}>
          Find Recipes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    alignItems: 'center',
  },
  boldheading: {
    fontSize: 22,
    fontFamily: 'Inter-Black',
    color: 'black',
  },
  subheading: {
    fontSize: 16,
    color: '#71727A',
    fontFamily: 'Inter-Regular',
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
    justifyContent: 'space-between',
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
  },

  box3: {
    height: (70 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: (10 / dim.h) * dim.Height,
  },

  cbtn: {
    width: (30 / dim.w) * dim.Width,
    height: (30 / dim.h) * dim.Height,
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
    width: (160 / dim.w) * dim.Width,
  },
});
