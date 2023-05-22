import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Intro from './Intro';
import dim from '../util/dim';
import Star from '../assets/images/star.svg';
import Reply from '../assets/images/reply.svg';
import Like from '../assets/images/like.svg';
import axios from 'axios';
import {endpoint} from '../util/config';
import Rating from './Rating';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewBlog = ({navigation, route}) => {
  const {title} = route.params;
  const [blog, setBlog] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleRatingChange = newRating => {
    setRating(newRating);
  };

  const fetchBlog = async res => {
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

      console.log(JSON.stringify(response.data));
      setBlog(response.data[0]);
      setContent(response.data[0].Content);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Image
        // source={{uri: item.thumbnail}}
        source={require('../assets/images/recipefood.png')}
        style={styles.coverimg}
      />
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.desc}>{content}</Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text>Selected Rating: {rating}</Text>
        <Rating rating={rating} onRatingChange={handleRatingChange} />
      </View>

      <TouchableOpacity onPress={handleLikePress} style={styles.container}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={25}
          color={liked ? 'red' : 'black'}
        />
        <Text style={styles.text}>{liked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.txtInput}
        placeholder="Leave a comment"
        placeholderTextColor="#8F9098"
      />
      <View
        style={{
          marginTop: (10 / dim.h) * dim.Height,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../assets/images/homedp.png')}
          style={{
            width: (50 / dim.w) * dim.Width,
            height: (50 / dim.w) * dim.Width,
          }}
        />
        <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
          <Text style={styles.name}>Bessie Cooper</Text>
          <Text style={[styles.tag, {width: (300 / dim.w) * dim.Width}]}>
            I think you can tell a lot about a person by whether they use a
            shape
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: (5 / dim.h) * dim.Height,
              marginBottom: (10 / dim.h) * dim.Height,
            }}>
            <Reply
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
            />
            <Like
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
              style={{marginLeft: (10 / dim.w) * dim.Width}}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    padding: (15 / dim.h) * dim.Height,
    // paddingTop: (20 / dim.h) * dim.Height,
  },

  coverimg: {
    width: dim.Width,
    height: 250,
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    alignSelf: 'flex-start',
  },

  desc: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Inter-Light',
  },

  txtInput: {
    marginVertical: (10 / dim.h) * dim.Height,
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    height: (50 / dim.h) * dim.Height,
    width: (370 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 20,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    alignSelf: 'flex-start',
  },

  tag: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
export default ViewBlog;
