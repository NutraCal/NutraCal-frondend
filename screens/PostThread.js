import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';

import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';
import {endpoint} from '../util/config';
import dim from '../util/dim';

import {AuthContext} from '../context/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import FormData from 'form-data';

export default function PostThread({route, navigation}) {
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loadData, setLoadData] = useState(true);

  const saveThread = async res => {
    var data = JSON.stringify({
      userId: userId,
      title: name,
      content: desc,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/discussionThreads/postThread',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      alert('Thread Added Successfuly');
      setName('');
      setDesc('');
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <Image
          source={require('../assets/images/thread-circular.png')}
          style={styles.thumbnail}
        />

        <View
          style={{
            alignItems: 'flex-start',
            padding: (10 / dim.h) * dim.Height,
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>Thread Title</Text>
          <TextInput
            style={styles.txtinput}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter discussion thread title"
            placeholderTextColor="#8F9098"
            multiline={true}
          />
          <Text style={styles.heading}>Content</Text>
          <TextInput
            value={desc}
            onChangeText={text => setDesc(text)}
            style={[
              styles.txtinput,
              {
                height: (310 / dim.h) * dim.Height,
                textAlignVertical: 'top',
              },
            ]}
            placeholder="Type something here"
            placeholderTextColor="#8F9098"
            multiline={true}
          />

          <TouchableOpacity onPress={saveThread} style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Post Thread
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    flex: 1,
    marginTop: 20,
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (8 / dim.h) * dim.Height,
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (70 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
  },

  thumbnail: {
    width: (100 / dim.w) * dim.Width,
    height: (100 / dim.w) * dim.Width,
    borderRadius: 10,
  },

  btn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },
});
