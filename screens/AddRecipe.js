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

import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import DropDownPicker from 'react-native-dropdown-picker';

import dim from '../util/dim';

import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';

export default function AddRecipe({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);

  const [category, setCategory] = useState([
    {label: 'Cakes and Pies', value: 'Cakes and Pies'},
    {label: 'Eggs And Meat', value: 'Eggs and Meat'},
    {label: 'Pasta And Salads', value: 'Pasta and Salads'},
    {label: 'Soups And Sandwiches', value: 'Soups and Sandwiches'},
    {label: 'Veg Rice and Tacos', value: 'Vegetables, Rice and Tacos'},
    {label: 'Other', value: 'Other'},
  ]);

  const [allergy, setAllergy] = useState([
    {label: 'Lactose Intolerance', value: 'Lactose Intolerant'},
    {label: 'Nut Allergy', value: 'Nut Allergy'},
    {label: 'Egg Allergy', value: 'Egg Allergy'},
    {label: 'None', value: 'None'},
  ]);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [item, setItem] = useState('');
  const [getlist, setList] = useState([]);
  const [loadId, setLoadId] = useState(true);
  const [loadData, setLoadData] = useState(true);

  const [json, setJson] = useState('');

  const additems = () => {
    console.log('in add item function');
    // setList([...getlist, {key: Math.random().toString(), data: item}]);
    setList([...getlist, item]);

    setItem('');
  };

  const deleteItem = key => {
    console.log(key);

    // setList(list => getlist.filter(element => element.key != key));
    const list = getlist.filter(ele => key != getlist.indexOf(ele));
    console.log('list', list);
    setList(list);

    console.log(getlist);
  };

  // const getUserId = async res => {
  //   console.log('inside');
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: endpoint + '/users/getUserId/' + email,
  //       headers: {},
  //     });

  //     // console.log(JSON.stringify(response.data));
  //     // setJson(response.data);
  //     setUserId(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const saveRecipe = async res => {
    // console.log('here');
    // console.log(userId);
    console.log(ingredients.toString());

    var data = JSON.stringify({
      user: userId,
      title: name,
      category: value3,
      quantity: getlist,
      recipeMethod: desc.split('.'),
      ingredients: getlist,
      calories: parseInt(calories),
      proteins: parseInt(proteins),
      fats: parseInt(fats),
      carbs: parseInt(carbs),
      allergies: value4,
      servingSize: servingSize,
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/addRecipe',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        alert('recipe added successfully');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   getUserId();
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
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
            <Text style={styles.heading}>Recipe Name</Text>
            <TextInput
              style={styles.txtinput}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter Recipe name"
              placeholderTextColor="#8F9098"
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
              />
            </View>
            <Text style={styles.heading}>Desciption</Text>
            <TextInput
              value={desc}
              onChangeText={text => setDesc(text)}
              style={[
                styles.txtinput,
                {height: (142 / dim.h) * dim.Height, textAlignVertical: 'top'},
              ]}
              placeholder="Type something here"
              placeholderTextColor="#8F9098"
            />
            <Text style={styles.heading}>Serving Size</Text>
            <TextInput
              value={servingSize}
              onChangeText={text => setServingSize(text)}
              style={[
                styles.txtinput,
                {marginBottom: (10 / dim.h) * dim.Height},
              ]}
              keyboardType="numeric"
              placeholder="Serving Size"
              placeholderTextColor="#8F9098"
            />
            <Text style={styles.heading}>Nutrition</Text>
            <TextInput
              value={calories}
              keyboardType="numeric"
              onChangeText={text => setCalories(text)}
              style={[
                styles.txtinput,
                {marginBottom: (10 / dim.h) * dim.Height},
              ]}
              placeholder="Calories"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={fats}
              keyboardType="numeric"
              onChangeText={text => setFats(text)}
              style={[
                styles.txtinput,
                {marginBottom: (10 / dim.h) * dim.Height},
              ]}
              placeholder="Fats"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={proteins}
              keyboardType="numeric"
              onChangeText={text => setProteins(text)}
              style={[
                styles.txtinput,
                {marginBottom: (10 / dim.h) * dim.Height},
              ]}
              placeholder="Proteins"
              placeholderTextColor="#8F9098"
            />
            <TextInput
              value={carbs}
              keyboardType="numeric"
              onChangeText={text => setCarbs(text)}
              style={[
                styles.txtinput,
                {marginBottom: (10 / dim.h) * dim.Height},
              ]}
              placeholder="Carbs"
              placeholderTextColor="#8F9098"
            />

            <View style={styles.fieldContainer}>
              <Text style={styles.heading}>Allergy:</Text>
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
                multiple={true}
                open={open4}
                value={value4}
                items={allergy}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setAllergy}
                dropDownDirection="DOWN"
                placeholder="Select allergy"
              />
            </View>
            <Text style={styles.heading}>Ingredients</Text>

            <View style={styles.textinputc}>
              <TextInput
                style={[styles.txtinput, {width: (300 / dim.w) * dim.Width}]}
                placeholder="Add your ingredients with quantity"
                placeholderTextColor="#C5C6CC"
                value={item}
                onChangeText={text => setItem(text)}
              />
              <TouchableOpacity style={styles.cbtn} onPress={additems}>
                <Text style={{fontSize: 20, color: 'white'}}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={{width: (350 / dim.w) * dim.Width}}>
              <FlatList
                data={getlist}
                renderItem={({index, item}) => (
                  <View key={index}>
                    <View>
                      <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Ing1
                            width={(40 / dim.w) * dim.Width}
                            height={(39 / dim.w) * dim.Width}
                            style={{marginRight: (20 / dim.w) * dim.Width}}
                          />
                          <Text style={styles.name}>{item}</Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => deleteItem(index)}
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
                    </View>
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
                marginTop: (20 / dim.h) * dim.Height,
                marginBottom: (20 / dim.h) * dim.Height,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Inter-SemiBold',
                }}
                onPress={saveRecipe}>
                Save Recipe
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
});
