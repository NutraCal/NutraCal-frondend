import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ViewRecipe({route, navigation}) {
  const {title} = route.params;
  const [id, setId] = useState('');
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
  const [getqlist, setQList] = useState([]);

  const [likes, setLikes] = useState(0);

  const [liked, setLiked] = useState(false);

  const [showremarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');

  const {user} = useContext(AuthContext);
  const userId = user?.data?.user?._id;
  const email = user?.data?.user?.email;
  const role = user?.data?.user?.role;

  const handleLikePress = () => {
    setLiked(!liked);
    updateLikes();
  };

  const approveRecipe = async res => {
    var data = JSON.stringify({
      recipeId: id,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/recipes/approveRecipe',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      alert('Recipe has been approved');
    } catch (error) {
      console.log(error.response);
    }
  };

  const rejectRecipe = async res => {
    var data = JSON.stringify({
      title: title,
      remarks: remarks,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/recipes/rejectRecipe',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      alert('Recipe has been rejected');
      setRemarks('');
      setShowRemarks(!showremarks);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateLikes = async res => {
    var data = JSON.stringify({
      email: email,
      title: name,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/likeRecipe',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      setLikes(response.data.likesCount);
      console.log(response.data.likesCount);
    } catch (error) {
      console.log(error.response);
    }
  };

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
      setId(response.data[0]._id);
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
      setLikes(response.data[0].LikesCount.length());
      const slist = response.data[0].Ingredients;
      console.log(...slist);
      setList([...slist]);
      const qlist = response.data[0].Quantity;
      setQList([...qlist]);
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
    // <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Image
        // source={{uri: item.thumbnail}}
        source={require('../assets/images/recipefood.png')}
        style={styles.coverimg}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: dim.Width,
        }}>
        <View>
          <Text style={styles.heading2}>{name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleLikePress}
            style={{
              // backgroundColor: 'blue',
              marginRight: 50,
              padding: 10,
              alignItems: 'center',
            }}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={25}
              color={liked ? 'red' : 'black'}
            />
            {/* <Text>{liked ? 'Unlike' : 'Like'}</Text> */}
            <Text>{likes} likes</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      {desc.map((item, index) => (
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
      ))}

      <Text style={[styles.heading, {width: (280 / dim.w) * dim.Width}]}>
        Ingredients That You Will Need
      </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {getqlist.map((item, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <View style={styles.box1}>
              <Ing
                width={(50 / dim.w) * dim.Width}
                height={(50 / dim.w) * dim.Width}
              />
            </View>

            <View>
              <Text style={[styles.name, {width: 120, textAlign: 'center'}]}>
                {item}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {role !== 'Admin' ? (
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
      ) : null}

      {role === 'Admin' ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'yellow',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: dim.Width * 0.8,
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <TouchableOpacity style={styles.btn1} onPress={approveRecipe}>
              <Text style={styles.btntxt}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => {
                setShowRemarks(!showremarks);
              }}>
              <Text style={styles.btntxt}>Unapprove</Text>
            </TouchableOpacity>
          </View>
          {showremarks === true && (
            <View
              style={{
                alignItems: 'center',
                // backgroundColor: 'blue',
                width: dim.Width * 0.8,
              }}>
              <TextInput
                style={styles.remarks}
                placeholder="Leave remarks"
                placeholderTextColor="#8F9098"
                value={remarks}
                onChangeText={text => setRemarks(text)}
                multiline={true}
              />
              <TouchableOpacity
                onPress={rejectRecipe}
                style={[styles.btn1, {alignSelf: 'flex-end', marginRight: 10}]}>
                <Text style={styles.btntxt}>Add Remarks</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (10 / dim.h) * dim.Height,
    paddingTop: (20 / dim.h) * dim.Height,
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: (10 / dim.h) * dim.Height,
    alignSelf: 'flex-start',
    padding: (10 / dim.h) * dim.Height,
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    padding: (10 / dim.h) * dim.Height,
    // backgroundColor: 'blue',
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
    width: (120 / dim.w) * dim.Width,
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
    // alignSelf: 'flex-start',
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
    width: dim.Width,
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

  box3: {
    width: dim.Width * 0.93,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFF7EE',
    paddingVertical: 10,
  },

  btntxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },

  btn1: {
    paddingHorizontal: (30 / dim.w) * dim.Width,
    paddingVertical: (8 / dim.h) * dim.Height,
    marginTop: (15 / dim.h) * dim.Height,
    borderRadius: 20,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },

  remarks: {
    // borderColor: '#E1E3E8',
    backgroundColor: '#EFF7EE',
    // borderWidth: 1,
    height: (80 / dim.h) * dim.Height,
    width: dim.Width * 0.93,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
