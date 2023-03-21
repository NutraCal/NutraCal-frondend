import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Recipe1 from '../assets/images/recipe1.svg';
import Macro1 from '../assets/images/macro1.svg';
import Macro2 from '../assets/images/macro2.svg';
import Macro3 from '../assets/images/macro3.svg';
import Macro4 from '../assets/images/macro4.svg';
import Icon1 from '../assets/images/icon1.svg';
import Icon2 from '../assets/images/icon2.svg';
import Icon3 from '../assets/images/icon3.svg';
import Icon4 from '../assets/images/icon4.svg';
import Star from '../assets/images/star.svg';
import Dp1 from '../assets/images/dp1.svg';
import Dp2 from '../assets/images/dp2.svg';
import Dp3 from '../assets/images/dp3.svg';
import Reply from '../assets/images/reply.svg';
import Like from '../assets/images/like.svg';
import axios from 'axios';
import {endpoint} from '../util/config';

export default function ViewRecipe({navigation}) {
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

  const searchRecipeByName = async res => {
    var data = JSON.stringify({
      title: 'Broccoli Salad',
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

  useEffect(() => {
    searchRecipeByName();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <Avatar.Image
            size={200}
            source={require('../assets/images/recipe1.png')}
          />

          <Text style={styles.heading}>{name}</Text>

          <Text style={styles.heading}>Nutrition</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View>
              <View>
                <View style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
                  <View style={{marginRight: 10}}>
                    <Text style={styles.name}>{calories}</Text>
                    <Text style={styles.tag}>kCal</Text>
                  </View>
                  <Macro1 width={20} height={21} />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
                  <View style={{marginRight: 10}}>
                    <Text style={styles.name}>{fats}</Text>
                    <Text style={styles.tag}>fats</Text>
                  </View>
                  <Macro2 width={20} height={21} />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
                  <View style={{marginRight: 10}}>
                    <Text style={styles.name}>{proteins}</Text>
                    <Text style={styles.tag}>proteins</Text>
                  </View>
                  <Macro3 width={20} height={21} />
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
                  <View style={{marginRight: 10}}>
                    <Text style={styles.name}>{carbs}</Text>
                    <Text style={styles.tag}>carbs</Text>
                  </View>
                  <Macro4 width={20} height={21} />
                </View>
              </View>
            </View>
          </ScrollView>

          <Text style={styles.heading}>Desciption</Text>
          <Text style={styles.desc}>{desc}</Text>

          <Text style={[styles.heading, {width: 250}]}>
            Ingredients That You Will Need
          </Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={getlist}
            renderItem={({index, item}) => (
              <View key={index} style={{alignItems: 'center'}}>
                <View style={styles.box1}>
                  <Icon1 width={50} height={50} />
                </View>

                <View style={{}}>
                  <Text style={styles.name}>{item}</Text>
                </View>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              width: 370,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={[styles.heading]}>Rate & Review</Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Star width={20} height={20} style={{marginLeft: 5}} />
              <Star width={20} height={20} style={{marginLeft: 5}} />
              <Star width={20} height={20} style={{marginLeft: 5}} />
              <Star width={20} height={20} style={{marginLeft: 5}} />
              <Star
                width={20}
                height={20}
                style={{marginLeft: 5, marginRight: 10}}
              />
            </View>
          </View>

          <TextInput
            style={styles.txtInput}
            placeholder="Leave a comment"
            placeholderTextColor="#8F9098"
          />

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Dp1 width={50} height={50} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>Bessie Cooper</Text>
              <Text style={[styles.tag, {width: 300}]}>
                I think you can tell a lot about a person by whether they use a
                shape
              </Text>
              <View
                style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                <Reply width={20} height={20} />
                <Like width={20} height={20} style={{marginLeft: 10}} />
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Dp1 width={50} height={50} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>Bessie Cooper</Text>
              <Text style={[styles.tag, {width: 300}]}>
                I think you can tell a lot about a person by whether they use a
                shape
              </Text>
              <View
                style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                <Reply width={20} height={20} />
                <Like width={20} height={20} style={{marginLeft: 10}} />
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Dp1 width={50} height={50} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.name}>Bessie Cooper</Text>
              <Text style={[styles.tag, {width: 300}]}>
                I think you can tell a lot about a person by whether they use a
                shape
              </Text>
              <View
                style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                <Reply width={20} height={20} />
                <Like width={20} height={20} style={{marginLeft: 10}} />
              </View>
            </View>
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
    padding: 12,

    paddingTop: 20,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  box: {
    height: 73,
    width: 90,
    borderRadius: 15,
    marginVertical: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-around',
  },

  box1: {
    height: 100,
    width: 100,
    backgroundColor: '#F7F8F8',
    borderRadius: 15,
    marginVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-around',
  },

  txtInput: {
    marginVertical: 10,
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    height: 50,
    width: 370,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    alignSelf: 'flex-start',
  },

  tag: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },

  desc: {
    fontSize: 14,
    width: 350,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Inter-Light',
    alignSelf: 'flex-start',
  },
});
