import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
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

  const handleDatePress = date => {
    setSelectedDate(date);
    console.log(date);

    // Load meal log for the selected date
    // ...
  };

  const getWeekDates = date => {
    // Generate an array of dates for the current week
    console.log(date);
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
    console.log(dates.toString());
    setWeekDates(dates);
  };

  const handleDateChange = date => {
    const formattedDate = moment(date, 'YYYY/MM/DD').format('D MMMM YYYY');
    setCDate(formattedDate);
    const fDate = moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD');
    console.log(fDate);
    const currentDate = moment(fDate).toDate(); // set the current date to user selected date
    console.log(currentDate);
    setDate(currentDate);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  // useEffect(() => {
  //   const currentDate = moment().toDate();
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
      getWeekDates(date);
    }
  }, [date]);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading]} onPress={() => setModalVisible(true)}>
        {cDate}
      </Text>

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

      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Breakfast</Text>
            <Text style={styles.desc}>230 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <B1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Honey Pancake</Text>
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
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Lunch</Text>
            <Text style={styles.desc}>500 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <L1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Chicken Steak</Text>
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
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Snacks</Text>
            <Text style={styles.desc}>50 calories</Text>
          </View>
          <View style={[styles.subsection, {marginTop: 10}]}>
            <S1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Orange</Text>
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
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Dinner</Text>
            <Text style={styles.desc}>120 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <D1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Salad</Text>
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
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddMeal', {
              email: email,
            })
          }>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
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
    marginBottom: (20 / dim.h) * dim.Height,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#91C788',
    borderRadius: 50,
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    position: 'absolute',
    marginTop: (40 / dim.h) * dim.Height,
    bottom: (10 / dim.h) * dim.Height,
    right: (20 / dim.w) * dim.Width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
