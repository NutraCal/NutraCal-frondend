import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import {Searchbar, Avatar} from 'react-native-paper';
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
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import Modal from 'react-native-modal';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const initialMin = 0;
const initialMax = 2500;

export default function SearchRecipe({route, navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [visible, setVisible] = useState(false);

  // const MIN_DEFAULT = 0;
  // const MAX_DEFAULT = 2500;
  // const [minValue, setMinValue] = useState(MIN_DEFAULT);
  // const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const [textInputValue, setTextInputValue] = useState('');

  const minRef = useRef(0);
  const maxRef = useRef(2500);

  const handleSliderValuesChange = values => {
    // Update the min and max values
    minRef.current = values[0];
    maxRef.current = values[1];
  };

  const [idata, setIData] = useState([]); // Separate state for the data array

  const [ing, setIng] = useState('');

  const inputRef = useRef();

  const addIngredient = () => {
    let ing = inputRef.text;
    console.log(ing);

    //Add a new ingredient to the data array
    if (ing.trim() === '') {
      return; // Skip if the ingredient is empty or whitespace
    }
    const newIngredient = {id: idata.length + 1, name: ing};
    setIData(prevData => [...prevData, newIngredient]);
    // setIng(''); // Clear the input after adding the ingredient
  };

  const removeIngredient = id => {
    // Remove an ingredient from the data array
    setIData(prevData => prevData.filter(item => item.id !== id));
  };

  const searchCategory = async res => {
    console.log('insearchcategory');
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
      // setCategory('');
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const filterRecipe = async res => {
    // setLoading(true);
    console.log(minRef.current);
    console.log(maxRef.current);
    console.log(idata);
    const ingredientNames = idata.map(item => item.name);

    console.log(ingredientNames);

    var data = JSON.stringify({
      ingredients: ingredientNames,
      calories_min: minRef.current,
      calories_max: maxRef.current,
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
      console.log('in fetch recipe');
      setLoading(true);
      var data = JSON.stringify({
        title: searchQuery,
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

  const CustomMarker = ({currentValue}) => (
    <View style={styles.markerStyle}></View>
  );

  const renderCustomLabel = ({value}) => (
    <View>
      <Text style={styles.lbl}>{value}</Text>
    </View>
  );

  const sliderLineStyles = {
    trackStyle: {
      height: 5, // Adjust the height to make the line wider
      backgroundColor: '#EBEBEB',
      // alignSelf: 'center',
    },
    selectedStyle: {
      backgroundColor: '#91C788', // Change the foreground color here
    },
  };

  useEffect(() => {
    if (category !== '') {
      searchCategory();
    }
  }, [category]);

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
      <Searchbar
        placeholder="Recipes"
        onChangeText={onChangeSearch}
        onIconPress={fetchRecipe}
        value={searchQuery}
        style={styles.searchbar}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
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
          animationInTiming={500}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              alignItems: 'center',
              padding: (20 / dim.h) * dim.Height,
              justifyContent: 'center',
              backgroundColor: 'white',
              height: 480,
            }}>
            <Text style={styles.heading1}>Calories</Text>
            <View style={styles.containerStyle}>
              <MultiSlider
                values={[minRef.current, maxRef.current]}
                min={0}
                max={2500}
                onValuesChangeFinish={handleSliderValuesChange}
                allowOverlap={false}
                sliderLength={300}
                enableLabel={true}
                minMarkerOverlapDistance={20}
                customMarker={CustomMarker}
                showSteps={true}
                showStepLabels={true}
                {...sliderLineStyles}
              />
            </View>

            <Text style={styles.heading1}>Ingredients</Text>
            <View style={styles.textinputc}>
              <TextInput
                style={[styles.txtinput, {width: (270 / dim.w) * dim.Width}]}
                placeholder="Type and add your ingredients"
                placeholderTextColor="#C5C6CC"
                // value={ing}
                // onChangeText={text => setIng(text)}
                ref={inputRef}
                onChangeText={text => (inputRef.text = text)}
              />
              <TouchableOpacity style={styles.cbtn} onPress={addIngredient}>
                <Text style={{fontSize: 20, color: 'white'}}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={idata}
                keyExtractor={item => item.id.toString()}
                // renderItem={({item}) => <Text>{item.name}</Text>}
                renderItem={({item}) => (
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
                      <Text style={styles.name2}>{item.name}</Text>
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

            {/* <View style={[styles.box4, {backgroundColor: '#F9EBF8'}]}>
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
            </View> */}

            <TouchableOpacity
              style={{
                width: (300 / dim.w) * dim.Width,
                height: (48 / dim.h) * dim.Height,
                backgroundColor: '#91C788',
                alignSelf: 'center',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: (20 / dim.h) * dim.Height,
                marginBottom: (10 / dim.h) * dim.Height,
              }}
              onPress={() => {
                setModalVisible(false);
                filterRecipe();
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
              description: '180kCal',
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
              description: '180kCal',
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
    marginBottom: (20 / dim.h) * dim.Height,
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
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 25,
  },

  heading1: {
    marginTop: (10 / dim.h) * dim.Height,
    marginLeft: (10 / dim.w) * dim.Width,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
    // backgroundColor: 'red',
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
    width: (280 / dim.w) * dim.Width,
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
  markerStyle: {
    width: 25,
    height: 25,
    position: 'absolute',
    backgroundColor: '#91C788',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 15,
    elevation: 5,
  },
  containerStyle: {
    alignItems: 'center', // Center align the entire component
    justifyContent: 'center', // Center align the entire component

    // marginTop: 20,
  },
  lbl: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalContent: {
    padding: 16,
    backgroundColor: 'red',
    height: 100,
    // Add any other styles for your modal content
  },
});
