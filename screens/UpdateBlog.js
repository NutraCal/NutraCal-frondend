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

export default function UpdateBlog({route, navigation}) {
  const {title} = route.params;
  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loadData, setLoadData] = useState(true);
  const [image, setImage] = useState(null);
  const [imageuri, setImageUri] = useState(0);

  const handleChoosePhoto = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const saveBlog = async res => {
    var data = JSON.stringify({
      blogId: id,
      title: name,
      content: desc,
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/editBlog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response.status == 200) {
        alert('blog updated successfully');
        // navigation.goBack();
        setName('');
        setDesc('');
        setImageUri('');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchBlog = async res => {
    // console.log(role);
    console.log(title);
    var data = JSON.stringify({
      title: title,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/blogs/viewBlogByTitle',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(response.data);
      //   setBlog(response.data[0]);
      setId(response.data[0]._id);
      setName(title);
      setDesc(response.data[0].Content);

      const filename = response.data[0].Image.filename;
      const u = endpoint + '/' + filename;
      // console.log(u);
      setImageUri(u);
      // setImage(response.data[0].Image);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    // <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity>
          {imageuri ? (
            <Image source={{uri: imageuri}} style={styles.img} />
          ) : (
            <View style={styles.imgView}>
              <Text style={{color: '#FFFFFF', fontSize: 40}}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'flex-start',
            padding: (10 / dim.h) * dim.Height,
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>Blog Title</Text>
          <TextInput
            style={styles.txtinput}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter blog title"
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

          <TouchableOpacity onPress={saveBlog} style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Update Blog
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
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

  img: {
    borderRadius: 10,
    width: (90 / dim.w) * dim.Width,
    height: (150 / dim.w) * dim.Width,
  },
  imgView: {
    width: (90 / dim.w) * dim.Width,
    height: (150 / dim.w) * dim.Width,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
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
