import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';
import Rating from './Rating';

import {AuthContext} from '../context/AuthContext';

export default function ViewNutritionist({route, navigation}) {
  const {name} = route.params;
  const {nId} = route.params;
  const [nutritionist, setNutritionist] = useState('');
  const [imageuri, setImageUri] = useState(0);
  const [nEmail, setNEmail] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [qualification, setQualification] = useState('');
  const [expertise, setExpertise] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [rating, setRating] = useState(0);

  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const userName = user?.data?.user?.name;

  const handleRatingChange = async newRating => {
    setRating(newRating);
    var data = JSON.stringify({
      email: nEmail,
      userId: userId,
      rating: rating,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/nutritionist/rateNutritionist',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      console.log('rating updated');
      alert('rating updated');
    } catch (error) {
      console.log(error.response.data);
      // alert(error.response.data);
    }
  };

  const showNutritionist = async res => {
    var data = JSON.stringify({
      name: name,
    });

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/nutritionist/searchNutritionist',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      if (response && response.data && response.data.length > 0) {
        console.log(response.data[0].Image.filename);
        setNutritionist(response.data);
        setNEmail(response.data[0].email);
        console.log(response.data[0].email);
        const filename = response.data[0].Image.filename;
        const u = endpoint + '/' + filename;
        setImageUri(u);
        setStartTime(response.data[0].startTime);
        setEndTime(response.data[0].endTime);
        setStartDay(response.data[0].startDay);
        setEndDay(response.data[0].endDay);
        setQualification(response.data[0].qualification);
        setExpertise(response.data[0].areaOfExpertise);
        setRating(response.data[0].ratingAverage);
      }
      // setNutritionist(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const getBlogs = async res => {
    var data = JSON.stringify({
      userId: nId,
    });

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/blogs/viewApproved',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      if (response && response.data && response.data.length > 0) {
        setBlogs(response.data);
      }
      // setNutritionist(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    showNutritionist();
    getBlogs();
  }, []);

  return (
    <View style={styles.MainDiv}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{uri: imageuri}} style={styles.thumbnail} />
        <View style={styles.field}>
          <Text style={styles.heading}>Start Time</Text>
          <Text style={styles.heading2}>{startTime}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.heading}>End Time</Text>
          <Text style={styles.heading2}>{endTime}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.heading}>Start Day</Text>
          <Text style={styles.heading2}>{startDay}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.heading}>End Day</Text>
          <Text style={styles.heading2}>{endDay}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.heading}>End Day</Text>
          <Text style={styles.heading2}>{endDay}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.heading}>Qualification</Text>
          <Text style={styles.heading2}>{qualification}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.heading}>Expertise</Text>
          <Text style={styles.heading2}>{expertise}</Text>
        </View>

        <Rating rating={rating} onRatingChange={handleRatingChange} />

        <Text style={styles.heading}>Blogs:</Text>

        {blogs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box3}
            onPress={() => {
              console.log(item.Title);
              navigation.navigate('ViewBlog', {title: item.Title});
            }}>
            <Image
              source={{
                uri: endpoint + '/' + item.Image.filename,
              }}
              style={[styles.thumbnail2, {marginRight: 20}]}
            />
            <View style={{width: 220}}>
              <Text style={styles.name}>{item.Title}</Text>
              <Text style={styles.desc}>Blog</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BookAppointment', {nEmail: nEmail})
          }
          style={{
            width: (330 / dim.w) * dim.Width,
            height: (48 / dim.h) * dim.Height,
            backgroundColor: '#91C788',
            alignSelf: 'center',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: (20 / dim.h) * dim.Height,
            marginBottom: (20 / dim.h) * dim.Height,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Inter-SemiBold',
            }}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (15 / dim.h) * dim.Height,
  },

  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 25,
    alignSelf: 'center',
  },
  box3: {
    height: 100,
    width: 350,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF7EE',
    alignSelf: 'center',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFF7EE',
    alignSelf: 'flex-start',
    marginVertical: 10,
    width: dim.Width * 0.93,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 0,
  },
  thumbnail2: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,

    marginRight: 20,
    marginLeft: 20,
  },
  heading2: {
    fontFamily: 'Inter-Medium',
    color: 'black',
    fontSize: 16,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (8 / dim.h) * dim.Height,
    marginRight: 20,
  },
});
