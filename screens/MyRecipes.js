import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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

export default function MyRecipes({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const viewMyRecipes = async res => {
    setLoading(true);
    var data = JSON.stringify({
      email: email,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/userRecipes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    viewMyRecipes();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          data={recipes}
          renderItem={({index, item}) => (
            <View key={index}>
              <TouchableOpacity
                style={[styles.box3, {backgroundColor: '#EBF2FF'}]}
                onPress={() => {
                  navigation.navigate('ViewRecipe', {title: item.Title});
                }}>
                <Image
                  source={{
                    uri: endpoint + '/' + item.Image.filename,
                  }}
                  style={styles.thumbnail}
                />
                <Text style={[styles.name, {width: 250}]}>{item.Title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: (5 / dim.h) * dim.Height,
  },
  thumbnail: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});
