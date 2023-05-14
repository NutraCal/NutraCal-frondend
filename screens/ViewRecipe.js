import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Recipe1 from '../assets/images/recipe1.svg';
import Macro1 from '../assets/images/macro1.svg';
import Macro2 from '../assets/images/macro2.svg';
import Macro3 from '../assets/images/macro3.svg';
import Macro4 from '../assets/images/macro4.svg';
import Ing from '../assets/icons/Ing.svg';
import Step from '../assets/icons/step.svg';

import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';
import dim from '../util/dim';

export default function ViewRecipe({route, navigation}) {
  const {title} = route.params;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState([]);
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [item, setItem] = useState('');
  const [getlist, setList] = useState([]);

  const {user} = useContext(AuthContext);

  const userId = user?.data?.user?._id;

  const searchRecipeByName = async res => {
    console.log('here');
    console.log(title);
    var data = JSON.stringify({
      title: title,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/searchRecipes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      setName(response.data[0].Title);
      setDesc(response.data[0].RecipeMethod);
      const c = response.data[0].Calories.toString();
      setCalories(c);
      const f = response.data[0].Fats.toString();
      setFats(f);
      const p = response.data[0].Proteins.toString();
      setProteins(p);
      const ca = response.data[0].Carbs.toString();
      setCarbs(ca);
      const slist = response.data[0].Ingredients;
      console.log(...slist);
      setList([...slist]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateShoppingList = async res => {
    console.log(title);
    console.log('going to update shopping list');
    var data = JSON.stringify({
      userId: userId,
      list: getlist,
    });
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/shoppingList/updateList',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      alert('added');
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    searchRecipeByName();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <Image
            // source={{uri: item.thumbnail}}
            source={require('../assets/images/recipefood.png')}
            style={styles.coverimg}
          />

          <Text style={styles.heading}>{name}</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View>
              <View>
                <View style={styles.box}>
                  <View style={{marginRight: (10 / dim.w) * dim.Width}}>
                    <Text style={styles.name}>{calories}</Text>
                    <Text style={styles.tag}>kCal</Text>
                  </View>
                  <Macro1
                    width={(20 / dim.w) * dim.Width}
                    height={(21 / dim.w) * dim.Width}
                  />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={styles.box}>
                  <View style={{marginRight: (10 / dim.w) * dim.Width}}>
                    <Text style={styles.name}>{fats}</Text>
                    <Text style={styles.tag}>fats</Text>
                  </View>
                  <Macro2
                    width={(20 / dim.w) * dim.Width}
                    height={(21 / dim.w) * dim.Width}
                  />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={styles.box}>
                  <View style={{marginRight: (10 / dim.w) * dim.Width}}>
                    <Text style={styles.name}>{proteins}</Text>
                    <Text style={styles.tag}>proteins</Text>
                  </View>
                  <Macro3
                    width={(20 / dim.w) * dim.Width}
                    height={(21 / dim.w) * dim.Width}
                  />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={styles.box}>
                  <View style={{marginRight: (10 / dim.w) * dim.Width}}>
                    <Text style={styles.name}>{carbs}</Text>
                    <Text style={styles.tag}>carbs</Text>
                  </View>
                  <Macro4
                    width={(20 / dim.w) * dim.Width}
                    height={(21 / dim.w) * dim.Width}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <Text style={styles.heading}>Cooking Steps:</Text>

          <FlatList
            data={desc}
            renderItem={({index, item}) => (
              <View key={index}>
                <TouchableOpacity
                  style={[styles.steps, {backgroundColor: '#F7F8F8'}]}>
                  <Step
                    width={(20 / dim.w) * dim.Width}
                    height={(20 / dim.w) * dim.Width}
                    style={{marginRight: 10}}
                  />
                  <Text style={[styles.step, {width: 280}]}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={[styles.heading, {width: (250 / dim.w) * dim.Width}]}>
            Ingredients That You Will Need
          </Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={getlist}
            renderItem={({index, item}) => (
              <View key={index} style={{alignItems: 'center'}}>
                <View style={styles.box1}>
                  <Ing
                    width={(50 / dim.w) * dim.Width}
                    height={(50 / dim.w) * dim.Width}
                  />
                </View>

                <View>
                  <Text style={[styles.name, {width: 80, textAlign: 'center'}]}>
                    {item}
                  </Text>
                </View>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.btnn}
            onPress={() => updateShoppingList()}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Add to Shopping List
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (12 / dim.h) * dim.Height,
    paddingTop: (20 / dim.h) * dim.Height,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: (10 / dim.h) * dim.Height,
    alignSelf: 'flex-start',
  },
  box: {
    height: (73 / dim.h) * dim.Height,
    width: (90 / dim.w) * dim.Width,
    borderRadius: 15,
    marginVertical: (10 / dim.h) * dim.Height,
    marginRight: (10 / dim.w) * dim.Width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: (10 / dim.h) * dim.Height,
    justifyContent: 'space-around',
    backgroundColor: '#EBF2FF',
  },

  box1: {
    height: (100 / dim.h) * dim.Height,
    width: (100 / dim.w) * dim.Width,
    backgroundColor: '#EBF2FF',
    borderRadius: 15,
    marginVertical: (10 / dim.h) * dim.Height,
    marginRight: (10 / dim.w) * dim.Width,
    alignItems: 'center',
    padding: (10 / dim.h) * dim.Height,
    justifyContent: 'space-around',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    alignSelf: 'flex-start',
  },

  step: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },

  tag: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    marginBottom: (5 / dim.h) * dim.Height,
  },

  desc: {
    fontSize: 14,
    width: (350 / dim.w) * dim.Width,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Inter-Light',
    alignSelf: 'flex-start',
  },

  coverimg: {
    width: '100%',
    height: 250,
  },

  steps: {
    // height: (80 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 12,
    margin: (10 / dim.w) * dim.Width,
    padding: (10 / dim.w) * dim.Width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  btnn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (30 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },
});
