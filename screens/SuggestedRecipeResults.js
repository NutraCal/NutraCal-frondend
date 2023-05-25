import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Myrec1 from '../assets/images/myrec1.svg';
import Myrec2 from '../assets/images/myrec2.svg';
import Hearticon from '../assets/images/heart.svg';
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';

export default function SuggestedRecipeResults({route, navigation}) {
  const {responseArray} = route.params;
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // const fetchRecipe = async res => {
  //   console.log('in fetch recipe');
  //   setLoading(true);
  //   var data = JSON.stringify({
  //     title: searchQuery,
  //   });
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: endpoint + '/recipes/viewRecipeByName',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: data,
  //     });

  //     // console.log(JSON.stringify(response.data));
  //     setRecipes(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const setValues = () => {
    console.log(responseArray[0].Title);
  };

  useEffect(() => {
    console.log(responseArray);

    if (responseArray && responseArray.length > 0) {
      setValues();
      // const {title} = responseArray[0].Title;
      // console.log(responseArray[0].Title);
    }
  }, [responseArray]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.boldheading}>Suggested Recipes</Text>
        <Text style={styles.subheading}>Here is what you can make</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          responseArray.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[styles.box3, {backgroundColor: '#EBF2FF'}]}
                onPress={() => {
                  navigation.navigate('ViewRecipe', {title: item.Title});
                }}>
                <Image
                  source={require('../assets/images/recipecover.png')}
                  style={styles.thumbnail}
                />
                <View>
                  <Text style={[styles.name, {width: 250}]}>{item.Title}</Text>
                  <Text>
                    Matched Ingredients: {item.MatchedIngredientsCount}
                  </Text>
                  <Text>
                    Matched Ingredients: {item.MatchedIngredients.toString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (8 / dim.h) * dim.Height,
  },

  box3: {
    height: (80 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 12,
    margin: (10 / dim.w) * dim.Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
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
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: (5 / dim.h) * dim.Height,
  },
});
