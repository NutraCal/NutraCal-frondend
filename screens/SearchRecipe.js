import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
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

import {useFocusEffect} from '@react-navigation/native';

import {LogBox} from 'react-native';

import {ScrollView} from 'react-native-virtualized-view';
import Modal from 'react-native-modal';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import RangeSlider from '../components/RangeSlider';
import RangeSlider from 'rn-range-slider';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';

export default function SearchRecipe({route, navigation}) {
  const {email} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [visible, setVisible] = useState(false);

  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 2500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const [textInputValue, setTextInputValue] = useState('');
  const containerStyle = {backgroundColor: 'white', padding: 20};

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

      // console.log(JSON.stringify(response.data));
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchRecipe = async res => {
    console.log(searchQuery);
    if (searchQuery != '') {
      setLoading(true);
      var data = JSON.stringify({
        title: 'Broccoli Salad',
      });
      try {
        const response = await axios({
          method: 'post',
          url: endpoint + '/recipes/viewRecipeByName',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        });

        // console.log(JSON.stringify(response.data));
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      console.log('empty query');
    }
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
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
    LogBox.ignoreLogs([' VirtualizedLists should never be nested']);
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  //   }, []),
  // );

  const data = [
    {
      id: '1',
      backgroundColor: '#EBF2FF',
      name: 'Pastas and Salad',
      onPress: () => {
        setCategory('Pasta and Salads');
      },
      PicComponent: Pic1, // Add the corresponding SVG component here
    },
    {
      id: '2',
      backgroundColor: '#F9EBF8',
      name: 'Eggs and Meat',
      onPress: () => {
        setCategory('Eggs and Meat');
      },
      PicComponent: Pic2, // Add the corresponding SVG component here
    },
    {
      id: '3',
      backgroundColor: '#EBF2FF',
      name: 'Veg, Rice and Tacos',
      onPress: () => {
        setCategory('Vegetables, Rice and Tacos');
      },
      PicComponent: Pic3, // Add the corresponding SVG component here
    },
    {
      id: '4',
      backgroundColor: '#F9EBF8',
      name: 'Cakes and Pies',
      onPress: () => {
        setCategory('Cakes and Pies');
      },
      PicComponent: Pic4, // Add the corresponding SVG component here
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.backgroundColor}]}
      onPress={item.onPress}>
      {item.PicComponent && (
        <item.PicComponent
          width={(60 / dim.w) * dim.Width}
          height={(61 / dim.w) * dim.Width}
          style={{marginBottom: (10 / dim.h) * dim.Height}}
        />
      )}
      <Text style={styles.name1}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <Searchbar
          placeholder="Recipes"
          onChangeText={onChangeSearch}
          onIconPress={fetchRecipe}
          value={searchQuery}
          style={styles.searchbar}
        />
        <View style={styles.cont}>
          <TouchableOpacity style={styles.btn} onPress={sortByTitle}>
            <Icon name="sort" size={20} />
            <Text style={styles.label0}>Sort</Text>
            {/* <Button title="Sort by Title" onPress={sortByTitle} /> */}
          </TouchableOpacity>

          <View style={styles.btn}>
            <Ionicons name="filter" size={20} />
            <Text
              style={styles.label0}
              // onPress={() => navigation.navigate('ApplyFilters')}
              onPress={() => setModalVisible(true)}>
              Filter
            </Text>
          </View>
        </View>
        <Text style={styles.heading}>Category</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        />
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
                    // console.log(item.Title);
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

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              alignItems: 'center',
              padding: (20 / dim.h) * dim.Height,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text style={styles.heading1}>Calories</Text>
            <RangeSlider
              style={{width: 160, height: 80}}
              gravity={'center'}
              min={200}
              max={1000}
              step={20}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(low, high, fromUser) => {
                this.setState({rangeLow: low, rangeHigh: high});
              }}
            />
            />
            {/* <GestureHandlerRootView
              style={{marginTop: (20 / dim.h) * dim.Height}}>
              <RangeSlider
                sliderWidth={(300 / dim.w) * dim.Width}
                min={MIN_DEFAULT}
                max={MAX_DEFAULT}
                step={20}
                onValueChange={range => {
                  setMinValue(range.min);
                  setMaxValue(range.max);
                }}
              />
            </GestureHandlerRootView> 
            <View style={styles.labelc}>
              <Text style={styles.label}>0</Text>
              <Text style={styles.label}>500</Text>
              <Text style={styles.label}>1000</Text>
              <Text style={styles.label}>1500</Text>
              <Text style={styles.label}>2000</Text>
              <Text style={styles.label}>2500</Text>
            </View> */}
            <Text style={styles.heading1}>Ingredients</Text>
            <View style={styles.textinputc}>
              <TextInput
                style={[styles.txtinput, {width: (270 / dim.w) * dim.Width}]}
                placeholder="Type and add your ingredients"
                placeholderTextColor="#C5C6CC"
              />
              <TouchableOpacity style={styles.cbtn}>
                <Text style={{fontSize: 20, color: 'white'}}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.box4, {backgroundColor: '#EBF2FF'}]}>
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
                <Text style={styles.name2}>Sugar</Text>
              </View>
              <TouchableOpacity
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
            <View style={[styles.box4, {backgroundColor: '#F9EBF8'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ing2
                  width={40}
                  height={39}
                  style={{marginRight: (20 / dim.w) * dim.Width}}
                />
                <Text style={styles.name2}>Baking Soda</Text>
              </View>
              <TouchableOpacity
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
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                width: (300 / dim.w) * dim.Width,
                height: (48 / dim.h) * dim.Height,
                backgroundColor: '#91C788',
                alignSelf: 'center',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: (40 / dim.h) * dim.Height,
                marginBottom: (20 / dim.h) * dim.Height,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Inter-SemiBold',
                }}>
                Find Recipe
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={styles.heading}>Diet Recommendations</Text>
        <FlatList
          data={[
            {
              id: '1',
              backgroundColor: '#EBF2FF',
              name: 'Egg Soup',
              description: 'Easy | 30mins | 180kCal',
              svgComponent: (
                <Diet1
                  width={(96 / dim.w) * dim.Width}
                  height={(60 / dim.w) * dim.Width}
                  style={{marginBottom: (10 / dim.h) * dim.Height}}
                />
              ),
            },
            {
              id: '2',
              backgroundColor: '#F9EBF8',
              name: 'Baked Falafel',
              description: 'Easy | 30mins | 180kCal',
              svgComponent: (
                <Diet2
                  width={(110 / dim.w) * dim.Width}
                  height={(57 / dim.w) * dim.Width}
                  style={{marginBottom: (10 / dim.h) * dim.Height}}
                />
              ),
            },
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.box2,
                {backgroundColor: item.backgroundColor, marginBottom: 30},
              ]}>
              {item.svgComponent}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewRecipe', {title: item.name})
                }
                style={[
                  styles.btn1,
                  {
                    backgroundColor: '#91C788',
                    borderColor: '#91C788',
                    borderWidth: 1,
                  },
                ]}>
                <Text style={[styles.label1, {color: 'white'}]}>View</Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        />
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
  label0: {
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

  heading1: {
    marginTop: (24 / dim.h) * dim.Height,
    marginLeft: (10 / dim.w) * dim.Width,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
  },

  text: {
    color: 'black',
    fontSize: 20,
  },

  label: {
    color: '#999999',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },

  labelc: {
    flexDirection: 'row',
    width: (320 / dim.w) * dim.Width,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (10 / dim.h) * dim.Height,
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    // width: (290 / dim.w) * dim.Width,
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
    // width: (320 / dim.w) * dim.Width,
  },

  box4: {
    height: (55 / dim.h) * dim.Height,
    width: (300 / dim.w) * dim.Width,
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

  name2: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (120 / dim.w) * dim.Width,
  },
});
