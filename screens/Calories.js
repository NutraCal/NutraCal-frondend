import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
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

import Ionicon from 'react-native-vector-icons/AntDesign';

export default function Calories({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [cDate, setCDate] = useState(moment().format('D MMMM YYYY'));
  const [weekDates, setWeekDates] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(null);

  const [bmeals, setBmeals] = useState([]);
  const [lmeals, setLmeals] = useState([]);
  const [smeals, setSmeals] = useState([]);
  const [dmeals, setDmeals] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchMeal = async date => {
    console.log('in fetch meal');
    console.log(typeof date);
    setLoading(true);
    setBmeals([]);
    setLmeals([]);
    setSmeals([]);
    setDmeals([]);
    var data = JSON.stringify({
      email: email,
      date: date,
    });
    try {
      const res = await axios({
        method: 'post',
        url: endpoint + '/meals/dailyLog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(res.data));

      const response = res.data; // Assuming response.data is your response object

      // Separate the arrays based on category
      const categoryArrays = {};
      response.forEach(item => {
        const category = item.category;
        if (!categoryArrays[category]) {
          categoryArrays[category] = [];
        }
        categoryArrays[category].push(item);
      });

      if (categoryArrays['Breakfast']) {
        setBmeals(categoryArrays['Breakfast']);
      }
      if (categoryArrays['Lunch']) {
        setLmeals(categoryArrays['Lunch']);
      }
      if (categoryArrays['Snacks']) {
        setSmeals(categoryArrays['Snacks']);
      }
      if (categoryArrays['Dinner']) {
        setDmeals(categoryArrays['Dinner']);
      }
      console.log(bmeals);
      console.log(lmeals);
      console.log(smeals);
      console.log(dmeals);

      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // useEffect(() => {
  //   // Assuming your response object is obtained and stored in a variable called "response"
  //   const categoryArrays = {};
  //   response.forEach(item => {
  //     const category = item.category;
  //     if (!categoryArrays[category]) {
  //       categoryArrays[category] = [];
  //     }
  //     categoryArrays[category].push(item);
  //   });

  //   // Clear the existing hook values
  //   setDinnerRecipes([]);
  //   setBreakfastRecipes([]);
  //   setLunchRecipes([]);
  //   setSnacksRecipes([]);

  //   // Set new values if the category arrays exist in the response data
  //   if (categoryArrays['Dinner']) {
  //     setDinnerRecipes(categoryArrays['Dinner']);
  //   }
  //   if (categoryArrays['Breakfast']) {
  //     setBreakfastRecipes(categoryArrays['Breakfast']);
  //   }
  //   if (categoryArrays['Lunch']) {
  //     setLunchRecipes(categoryArrays['Lunch']);
  //   }
  //   if (categoryArrays['Snacks']) {
  //     setSnacksRecipes(categoryArrays['Snacks']);
  //   }
  // }, [response]);

  const handleDatePress = date => {
    setSelectedDate(date);
    console.log(date);
    fetchMeal(date);

    // Load meal log for the selected date
    // ...
  };

  const getWeekDates = date => {
    // Generate an array of dates for the current week
    // console.log(date);

    console.log('here in function');
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
    // console.log(dates.toString());
    setWeekDates(dates);
  };

  const handleDateChange = date => {
    const formattedDate = moment(date, 'YYYY/MM/DD').format('D MMMM YYYY');
    setCDate(formattedDate);

    const fDate = moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD');
    // console.log(fDate);
    const currentDate = moment(fDate).toDate(); // set the current date to user selected date
    // console.log(currentDate);
    setDate(currentDate);

    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  // useEffect(() => {
  //   // Fetch the latest data or update the state here
  //   const currentDate = moment().toDate();
  //   const formattedDate = moment(currentDate, 'YYYY/MM/DD').format(
  //     'D MMMM YYYY',
  //   );
  //   setCDate(formattedDate);
  //   getWeekDates(currentDate);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch the latest data or update the state here
      const currentDate = moment().toDate();
      const formattedDate = moment(currentDate, 'YYYY/MM/DD').format(
        'D MMMM YYYY',
      );
      setCDate(formattedDate);
      getWeekDates(currentDate);

      // Return a cleanup function if needed
      return () => {
        // Clean up any subscriptions or resources if necessary
      };
    }, []),
  );

  useEffect(() => {
    if (date !== null) {
      console.log('hhehhhhhhhh');
      getWeekDates(date);
      console.log(date);
      // handleDateChange(date);
    }
  }, [date]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: 140,
          marginBottom: 10,
          marginTop: 5,
        }}>
        <Ionicon
          name="calendar"
          size={20}
          style={{marginRight: (5 / dim.w) * dim.Width}}
        />
        <Text style={[styles.heading]}>{cDate}</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View>
          <DatePicker
            mode="calendar"
            onDateChange={date => {
              handleDateChange(date);
            }}
            options={{
              textHeaderColor: '#333333',
              textDefaultColor: '#333333',
              mainColor: '#91C788',
              textSecondaryColor: '#91C788',
            }}
            style={{borderRadius: 0}}
          />
        </View>
      </Modal>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{marginBottom: (10 / dim.h) * dim.Height}}>
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
                  styles.name1,
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

      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <View>
          {bmeals.length > 0 && (
            <View style={styles.section}>
              <View style={styles.subsection}>
                <Text style={styles.heading}>Breakfast</Text>
                <Text style={styles.desc}>230 calories</Text>
              </View>
              {bmeals.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.subsection,
                    {marginTop: (10 / dim.h) * dim.Height},
                  ]}>
                  <B1
                    width={(60 / dim.w) * dim.Width}
                    height={(60 / dim.w) * dim.Width}
                  />
                  <View style={{width: (150 / dim.w) * dim.Width}}>
                    <Text style={styles.name1}>{item.name}</Text>
                    <Text style={styles.desc}>7:00 am</Text>
                  </View>
                  <TouchableOpacity>
                    <Forw
                      width={(24 / dim.w) * dim.Width}
                      height={(24 / dim.w) * dim.Width}
                      style={{marginLeft: (20 / dim.w) * dim.Width}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          {lmeals.length > 0 && (
            <View style={styles.section}>
              <View style={styles.subsection}>
                <Text style={styles.heading}>Lunch</Text>
                <Text style={styles.desc}>500 calories</Text>
              </View>

              {lmeals.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.subsection,
                    {marginTop: (10 / dim.h) * dim.Height},
                  ]}>
                  <L1
                    width={(60 / dim.w) * dim.Width}
                    height={(60 / dim.w) * dim.Width}
                  />
                  <View style={{width: (150 / dim.w) * dim.Width}}>
                    <Text style={styles.name1}>{item.name}</Text>
                    <Text style={styles.desc}>1:00 pm</Text>
                  </View>
                  <TouchableOpacity>
                    <Forw
                      width={(24 / dim.w) * dim.Width}
                      height={(24 / dim.w) * dim.Width}
                      style={{marginLeft: (20 / dim.w) * dim.Width}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {smeals.length > 0 && (
            <View style={styles.section}>
              <View style={styles.subsection}>
                <Text style={styles.heading}>Snacks</Text>
                <Text style={styles.desc}>50 calories</Text>
              </View>
              {smeals.map((item, index) => (
                <View key={index} style={[styles.subsection, {marginTop: 10}]}>
                  <S1
                    width={(60 / dim.w) * dim.Width}
                    height={(60 / dim.w) * dim.Width}
                  />
                  <View style={{width: (150 / dim.w) * dim.Width}}>
                    <Text style={styles.name1}>{item.name}</Text>
                    <Text style={styles.desc}>5:00 pm</Text>
                  </View>
                  <TouchableOpacity>
                    <Forw
                      width={(24 / dim.w) * dim.Width}
                      height={(24 / dim.w) * dim.Width}
                      style={{marginLeft: (20 / dim.w) * dim.Width}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {dmeals.length > 0 && (
            <View style={styles.section}>
              <View style={styles.subsection}>
                <Text style={styles.heading}>Dinner</Text>
                <Text style={styles.desc}>120 calories</Text>
              </View>
              {dmeals.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.subsection,
                    {marginTop: (10 / dim.h) * dim.Height},
                  ]}>
                  <D1
                    width={(60 / dim.w) * dim.Width}
                    height={(60 / dim.w) * dim.Width}
                  />
                  <View style={{width: (150 / dim.w) * dim.Width}}>
                    <Text style={styles.name1}>{item.name}</Text>
                    <Text style={styles.desc}>7:10 pm</Text>
                  </View>
                  <TouchableOpacity>
                    <Forw
                      width={(24 / dim.w) * dim.Width}
                      height={(24 / dim.w) * dim.Width}
                      style={{marginLeft: (20 / dim.w) * dim.Width}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
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

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
  },

  name2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    marginTop: (5 / dim.h) * dim.Height,
  },
  heading: {
    fontFamily: 'Inter-Medium',
    color: '#7B6F72',
    fontSize: 16,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: (5 / dim.h) * dim.Height,
  },

  section: {
    width: (350 / dim.w) * dim.Width,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // addButton: {
  //   backgroundColor: '#91C788',
  //   borderRadius: 50,
  //   width: (50 / dim.w) * dim.Width,
  //   height: (50 / dim.w) * dim.Width,
  //   position: 'absolute',
  //   marginTop: (40 / dim.h) * dim.Height,
  //   bottom: (10 / dim.h) * dim.Height,
  //   right: (20 / dim.w) * dim.Width,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  // buttonText: {
  //   color: '#fff',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
});
