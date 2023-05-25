import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import B1 from '../assets/images/breakfast1.svg';
import L1 from '../assets/images/lunch1.svg';
import D1 from '../assets/images/dinner1.svg';
import S1 from '../assets/images/snack1.svg';
import Forw from '../assets/forwardbtn.svg';
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';

import {useFocusEffect} from '@react-navigation/native';

import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';
import dim from '../util/dim';
import {Searchbar, Checkbox} from 'react-native-paper';

import Ionicon from 'react-native-vector-icons/Ionicons';

export default function DietPlans({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const goal = user?.data?.user?.fitnessGoal;

  const [weekDates, setWeekDates] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const [cDate, setCDate] = useState(moment().format('YYYY-MM-DD'));

  const [date, setDate] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const [day, setDay] = useState(0);

  const [bname, setBname] = useState('');
  const [lname, setLname] = useState('');
  const [dname, setDname] = useState('');

  const [bcal, setBcal] = useState('');
  const [lcal, setLcal] = useState('');
  const [dcal, setDcal] = useState('');

  const [val, setVal] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  // const [srecipes, setSRecipes] = useState([]);
  const [title, setTitle] = useState('');

  const [stitle, setSTitle] = useState('');
  const [scategory, setSCategory] = useState('');

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [checkedItems, setCheckedItems] = useState(
    Array(recipes.length).fill(false),
  );

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const getRecipes = async res => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/recipes/viewRecipes',
        headers: {},
      });

      // console.log(JSON.stringify(response.data));
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchRecipe = async res => {
    console.log(searchQuery);
    if (searchQuery != '') {
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

        console.log(JSON.stringify(response.data));
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      console.log('empty query');
    }
  };

  const generateDietPlan = async res => {
    var data = JSON.stringify({
      email: email,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/diet/dietPlan',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      alert('generated successfully');
    } catch (error) {
      console.log(error.response);
    }
  };

  const editDietPlan = async selectedRecipe => {
    if (selectedRecipe === '') {
      return;
    }
    var data = JSON.stringify({
      email: email,
      date: cDate,
      day: parseInt(day),
      mealType: scategory,
      mealName: selectedRecipe,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/diet/editPlan',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      alert('Diet Plan updated successfully');
      setSearchQuery('');
      setSCategory('');
      setSTitle('');
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCalories = async res => {
    var data = JSON.stringify({
      titles: [bname, lname, dname],
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/recipes/findCalories',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));

      const [b, l, d] = response.data; // Destructure the array values

      // Update the state variables with the values
      setBcal(b.toString());
      setLcal(l.toString());
      setDcal(d.toString());
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDatePress = async date => {
    //COMMENT THIS LINE IF YOU DONT WANNA REFRESH ON FOCUS ALWAYS
    setSelectedDate(date);

    var dayNumber = moment(date).format('d');
    dayNumber = parseInt(dayNumber) + 1;
    console.log(dayNumber);
    setDay(dayNumber.toString());
    console.log(day);

    // Load meal log for the selected date

    var data = JSON.stringify({
      email: email,
      day: dayNumber.toString(),
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/diet/getPlanOfDay',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      setBname(response.data[0]);
      setLname(response.data[1]);
      setDname(response.data[2]);

      setRefresh(prevState => !prevState);

      // getCalories();

      // setSelectedDate(date);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getWeekDates = date => {
    const weekStart = moment(date).startOf('week');
    const weekEnd = moment(date).endOf('week');
    const dates = [];
    for (
      let date = moment(weekStart);
      date <= weekEnd;
      date = date.clone().add(1, 'day')
    ) {
      dates.push(date.format('YYYY-MM-DD'));
    }
    console.log(dates.toString());
    setWeekDates(dates);
  };

  useFocusEffect(
    React.useCallback(() => {
      const currentDate = moment().toDate();
      setDate(currentDate);
      getWeekDates(currentDate);
      const fdate = moment(currentDate).format('YYYY-MM-DD');
      handleDatePress(fdate);
    }, []),
  );

  useEffect(() => {
    // Call getCalories whenever the refresh state changes
    getCalories();
  }, [refresh]);

  useEffect(() => {
    if (val !== '') {
    }
  }, [val]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingLeft: (8 / dim.w) * dim.Width,
            marginBottom: (10 / dim.h) * dim.Height,
            alignSelf: 'flex-start',
            marginTop: (10 / dim.h) * dim.Height,
          }}>
          <View>
            <Text style={styles.desc}>Fitness Goal</Text>
            <Text
              style={[
                styles.name1,
                {fontSize: 18, marginBottom: (5 / dim.h) * dim.Height},
              ]}>
              {goal}
            </Text>
          </View>
          <View>
            <Text style={styles.desc}>Meals per day</Text>
            <Text
              style={[
                styles.name1,
                {fontSize: 18, marginBottom: (5 / dim.h) * dim.Height},
              ]}>
              3 meals
            </Text>
          </View>
          <View>
            <Text style={styles.desc}>Length</Text>
            <Text style={[styles.name1, {fontSize: 18}]}>1 week</Text>
          </View>
        </View>

        <Modal isVisible={isModalVisible} style={{backgroundColor: 'white'}}>
          <View>
            <Searchbar
              placeholder="Recipes"
              onChangeText={onChangeSearch}
              onIconPress={fetchRecipe}
              value={searchQuery}
              style={styles.searchbar}
            />

            {loading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <FlatList
                style={{height: 500}}
                data={recipes}
                scrollEnabled={false}
                renderItem={({index, item}) => (
                  <View key={index} style={{}}>
                    <TouchableOpacity
                      style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
                      <Image
                        // source={{uri: item.thumbnail}}
                        source={require('../assets/images/recipecover.png')}
                        style={styles.thumbnail}
                      />
                      <Text
                        style={[
                          styles.name,
                          {width: (200 / dim.w) * dim.Width},
                        ]}>
                        {item.Title}
                      </Text>
                      <Checkbox
                        // status={checked ? 'checked' : 'unchecked'}
                        // color="#91C788"
                        // onPress={() => {
                        //   setSTitle(item.Title);
                        //   setChecked(!checked);
                        status={checkedItems[index] ? 'checked' : 'unchecked'}
                        color="#91C788"
                        onPress={() => {
                          const updatedCheckedItems = [...checkedItems];
                          updatedCheckedItems[index] =
                            !updatedCheckedItems[index];
                          setCheckedItems(updatedCheckedItems);
                          editDietPlan(item.Title);
                          setTimeout(() => {
                            setModalVisible(false);
                          }, 1000);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}

            {/* {checked && (
              <View>
                <Text>hehe</Text>
              </View>
            )} */}
          </View>
        </Modal>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            marginBottom: (10 / dim.h) * dim.Height,
            height: (110 / dim.h) * dim.Height,
          }}>
          {weekDates.map(date => (
            <View key={date}>
              <TouchableOpacity
                style={[
                  styles.box,
                  {
                    backgroundColor:
                      selectedDate === date ? '#91C788' : '#ffffff',
                  },
                ]}
                onPress={() => handleDatePress(date)}>
                <Text
                  style={[
                    styles.dayname,
                    {
                      margin: (10 / dim.h) * dim.Height,
                      fontWeight: selectedDate === date ? 'bold' : 'normal',
                      color: selectedDate === date ? '#ffffff' : '#7B6F72',
                    },
                  ]}>
                  {moment(date).format('dd')}
                </Text>
                <Text
                  style={[
                    styles.name2,
                    {
                      margin: (10 / dim.h) * dim.Height,
                      fontWeight: selectedDate === date ? 'bold' : 'normal',
                      color: selectedDate === date ? '#ffffff' : '#7B6F72',
                    },
                  ]}>
                  {moment(date).format('D MMM')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{alignSelf: 'center'}}>
          <View style={styles.section}>
            <View style={styles.subsection}>
              <View style={styles.ic}>
                <Text style={styles.heading}>Breakfast</Text>
                <Ionicon
                  name="swap-horizontal"
                  size={22}
                  style={{marginLeft: (10 / dim.w) * dim.Width}}
                  onPress={() => {
                    getRecipes();
                    setSCategory('Breakfast');
                    setModalVisible(true);
                  }}
                />
              </View>

              <Text style={styles.desc}>{bcal} calories</Text>
            </View>
            <View style={styles.subsectiondesc}>
              <B1
                width={(60 / dim.w) * dim.Width}
                height={(60 / dim.w) * dim.Width}
              />

              <Text style={styles.name1}>{bname}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewRecipe', {title: bname});
                }}>
                <Forw
                  width={(24 / dim.w) * dim.Width}
                  height={(24 / dim.w) * dim.Width}
                  style={{marginLeft: (20 / dim.w) * dim.Width}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.subsection}>
              <View style={styles.ic}>
                <Text style={styles.heading}>Lunch</Text>
                <Ionicon
                  name="swap-horizontal"
                  size={22}
                  style={{marginLeft: (10 / dim.w) * dim.Width}}
                  onPress={() => {
                    getRecipes();
                    setSCategory('Lunch');
                    setModalVisible(true);
                  }}
                />
              </View>
              <Text style={styles.desc}>{lcal} calories</Text>
            </View>
            <View style={styles.subsectiondesc}>
              <L1
                width={(60 / dim.w) * dim.Width}
                height={(60 / dim.w) * dim.Width}
              />

              <Text style={styles.name1}>{lname}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewRecipe', {title: lname});
                }}>
                <Forw
                  width={(24 / dim.w) * dim.Width}
                  height={(24 / dim.w) * dim.Width}
                  style={{marginLeft: (20 / dim.w) * dim.Width}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.section, {marginBottom: 20}]}>
            <View style={styles.subsection}>
              <View style={styles.ic}>
                <Text style={styles.heading}>Dinner</Text>
                <Ionicon
                  name="swap-horizontal"
                  size={22}
                  style={{marginLeft: (10 / dim.w) * dim.Width}}
                  onPress={() => {
                    getRecipes();
                    setSCategory('Dinner');
                    setModalVisible(true);
                  }}
                />
              </View>
              <Text style={styles.desc}>{dcal} calories</Text>
            </View>
            <View style={styles.subsectiondesc}>
              <D1
                width={(60 / dim.w) * dim.Width}
                height={(60 / dim.w) * dim.Width}
              />

              <Text style={styles.name1}>{dname}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewRecipe', {title: dname});
                }}>
                <Forw
                  width={(24 / dim.w) * dim.Width}
                  height={(24 / dim.w) * dim.Width}
                  style={{marginLeft: (20 / dim.w) * dim.Width}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btnn} onPress={generateDietPlan}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Generate new plan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (8 / dim.h) * dim.Height,
    // paddingTop: (10 / dim.h) * dim.Height,
    paddingBottom: 0,
  },

  box: {
    height: (100 / dim.h) * dim.Height,
    width: (70 / dim.w) * dim.Width,
    borderRadius: 12,
    marginHorizontal: (5 / dim.w) * dim.Width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#91C788',
  },

  dayname: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    // width: 200,
  },

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    width: (200 / dim.w) * dim.Width,
  },

  name2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    marginTop: (5 / dim.h) * dim.Height,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: (5 / dim.h) * dim.Height,
  },

  section: {
    width: (350 / dim.w) * dim.Width,
    marginBottom: (10 / dim.h) * dim.Height,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  subsectiondesc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: (10 / dim.h) * dim.Height,
  },
  btnn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },

  ic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchbar: {
    borderRadius: 20,
    margin: (15 / dim.w) * dim.Width,
    elevation: 0,
    backgroundColor: '#F8F9FE',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: (5 / dim.h) * dim.Height,
  },

  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },

  box3: {
    // height: (80 / dim.h) * dim.Height,
    width: (330 / dim.w) * dim.Width,
    borderRadius: 12,
    margin: (10 / dim.w) * dim.Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
