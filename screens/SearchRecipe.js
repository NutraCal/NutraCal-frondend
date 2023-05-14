import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Searchbar, Button, Avatar} from 'react-native-paper';
import Sortic from '../assets/sorticon.svg';
import Arrowdown from '../assets/arrowdownicon.svg';
import Filter from '../assets/filtericon.svg';
import Pic1 from '../assets/images/pic1.svg';
import Pic2 from '../assets/images/pic2.svg';
import Pic3 from '../assets/images/pic3.svg';
import Pic4 from '../assets/images/pic4.svg';
import Diet1 from '../assets/images/dietpic1.svg';
import Diet2 from '../assets/images/dietpic2.svg';
import Pop1 from '../assets/images/pop1.svg';
import Forw from '../assets/forwardbtn.svg';
import HomeHeader from './HomeHeader';
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {LogBox} from 'react-native';

export default function SearchRecipe({route, navigation}) {
  const {email} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const onChangeSearch = query => setSearchQuery(query);

  const searchCategory = async res => {
    setLoading(true);
    var data = JSON.stringify({
      category: category,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/filterRecipe',
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

  const sortByTitle = () => {
    const sortedData = [...recipes].sort((a, b) =>
      a.Title.localeCompare(b.Title),
    );
    setRecipes(sortedData);
  };

  useEffect(() => {
    if (category !== '') {
      searchCategory();
    }
  }, [category]);

  useEffect(() => {
    console.log('here in useeee');
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <Searchbar
          placeholder="Recipes"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <View style={styles.cont}>
          <TouchableOpacity style={styles.btn} onPress={sortByTitle}>
            <Icon name="sort" size={20} />
            <Text style={styles.label}>Sort</Text>
            {/* <Button title="Sort by Title" onPress={sortByTitle} /> */}
          </TouchableOpacity>

          <View style={styles.btn}>
            <Ionicons name="filter" size={20} />
            <Text
              style={styles.label}
              onPress={() => navigation.navigate('ApplyFilters')}>
              Filter
            </Text>
          </View>
        </View>
        <Text style={styles.heading}>Category</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scroll}>
          <TouchableOpacity
            style={[styles.box, {backgroundColor: '#EBF2FF'}]}
            onPress={() => {
              setCategory('Pasta and Salads');
            }}>
            <Pic1
              width={(60 / dim.w) * dim.Width}
              height={(61 / dim.w) * dim.Width}
              style={{marginBottom: (8 / dim.h) * dim.Height}}
            />
            <Text style={styles.name1}>Pastas and Salad</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, {backgroundColor: '#F9EBF8'}]}
            onPress={() => {
              setCategory('Eggs and Meat');
            }}>
            <Pic2
              width={(60 / dim.w) * dim.Width}
              height={(61 / dim.w) * dim.Width}
              style={{marginBottom: (10 / dim.h) * dim.Height}}
            />
            <Text style={styles.name1}>Eggs and Meat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, {backgroundColor: '#EBF2FF'}]}
            onPress={() => {
              setCategory('Vegetables, Rice and Tacos');
            }}>
            <Pic3
              width={(60 / dim.w) * dim.Width}
              height={(61 / dim.w) * dim.Width}
              style={{marginBottom: (10 / dim.h) * dim.Height}}
            />
            <Text style={styles.name1}>Veg, Rice and Tacos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, {backgroundColor: '#F9EBF8'}]}
            onPress={() => {
              setCategory('Cakes and Pies');
            }}>
            <Pic4
              width={(60 / dim.w) * dim.Width}
              height={(61 / dim.w) * dim.Width}
              style={{marginBottom: (10 / dim.h) * dim.Height}}
            />
            <Text style={styles.name1}>Cakes and Pies</Text>
          </TouchableOpacity>
        </ScrollView>
        {/* ----------------------------------------------------------------------------------- */}

        {loading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <FlatList
            data={recipes}
            scrollEnabled={false}
            renderItem={({index, item}) => (
              <View key={index}>
                <TouchableOpacity
                  style={[styles.box3, {backgroundColor: '#EBF2FF'}]}
                  onPress={() => {
                    console.log(item.Title);
                    //setTitle(item.title);
                    navigation.navigate('ViewRecipe', {title: item.Title});
                  }}>
                  <Image
                    // source={{uri: item.thumbnail}}
                    source={require('../assets/images/recipecover.png')}
                    style={styles.thumbnail}
                  />
                  <Text style={[styles.name, {width: 250}]}>{item.Title}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* ----------------------------------------------------------------------------------- */}

        <Text style={styles.heading}>Diet Recommendations</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scroll}>
          <View style={[styles.box2, {backgroundColor: '#EBF2FF'}]}>
            <Diet1
              width={(96 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
              style={{marginBottom: (10 / dim.h) * dim.Height}}
            />
            <Text style={styles.name}>Honey Pancake</Text>
            <Text style={styles.desc}>Easy | 30mins | 180kCal</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewRecipe')}>
              <View
                style={[
                  styles.btn1,
                  {
                    backgroundColor: '#91C788',
                    borderColor: '#91C788',
                    borderWidth: 1,
                  },
                ]}>
                <Text style={[styles.label1, {color: 'white'}]}>View</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.box2, {backgroundColor: '#F9EBF8'}]}>
            <Diet2
              width={(110 / dim.w) * dim.Width}
              height={(57 / dim.w) * dim.Width}
              style={{marginBottom: (10 / dim.h) * dim.Height}}
            />
            <Text style={styles.name}>Canai Bread</Text>
            <Text style={styles.desc}>Easy | 30mins | 180kCal</Text>
            <TouchableOpacity>
              <View style={styles.btn1}>
                <Text
                  style={[
                    styles.label1,
                    {color: '#91C788', fontFamily: 'Inter-Bold'},
                  ]}>
                  View
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Text style={styles.heading}>Popular</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
            <Pop1
              width={(48 / dim.w) * dim.Width}
              height={(47 / dim.w) * dim.Width}
              style={{marginRight: (20 / dim.w) * dim.Width}}
            />
            <View>
              <Text style={styles.name}>Blueberry Pancake</Text>
              <Text
                style={[
                  styles.desc,
                  {marginTop: 0, marginRight: (50 / dim.w) * dim.Width},
                ]}>
                Medium | 230kCal
              </Text>
            </View>
            <TouchableOpacity>
              <Forw
                width={(24 / dim.w) * dim.Width}
                height={(24 / dim.w) * dim.Width}
                style={{marginLeft: (20 / dim.w) * dim.Width}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    paddingBottom: 0,
  },
  searchbar: {
    borderRadius: 20,
    margin: (15 / dim.w) * dim.Width,
    elevation: 0,
    backgroundColor: '#F8F9FE',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Regular',
  },

  label1: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-Regular',
  },

  icon: {
    width: (15 / dim.w) * dim.Width,
    height: (15 / dim.h) * dim.Height,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: (80 / dim.w) * dim.Width,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: (2 / dim.w) * dim.Width,
    paddingVertical: (8 / dim.h) * dim.Height,
    borderColor: '#C5C6CC',
    borderRadius: 12,
    marginVertical: (8 / dim.h) * dim.Height,
  },

  btn1: {
    paddingHorizontal: (30 / dim.w) * dim.Width,
    paddingVertical: (4 / dim.h) * dim.Height,
    marginTop: (15 / dim.h) * dim.Height,
    borderRadius: 20,
  },

  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (13 / dim.w) * dim.Width,
    alignItems: 'center',
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: (10 / dim.h) * dim.Height,
    marginLeft: (12 / dim.w) * dim.Width,
  },

  box: {
    height: (130 / dim.h) * dim.Height,
    width: (100 / dim.w) * dim.Width,
    borderRadius: 12,
    margin: (8 / dim.w) * dim.Width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box2: {
    height: (220 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
    borderRadius: 12,
    margin: (10 / dim.w) * dim.Width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

  scroll: {
    marginTop: (10 / dim.h) * dim.Height,
    flexDirection: 'row',
  },

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: (5 / dim.h) * dim.Height,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: (5 / dim.h) * dim.Height,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
});
