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
import {AuthContext} from '../context/AuthContext';
import {endpoint} from '../util/config';
import Rating from './Rating';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewBlog = ({navigation, route}) => {
  const {title} = route.params;
  const [blog, setBlog] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [imageuri, setImageUri] = useState(0);

  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');

  const [reply, setReply] = useState('');
  const [commentId, setCommentId] = useState('');

  const [showreply, setShowReply] = useState(false);

  const {user} = useContext(AuthContext);
  const userId = user?.data?.user?._id;
  const email = user?.data?.user?.email;

  const handleLikePress = () => {
    setLiked(!liked);
    updateLikes();
  };

  const updateLikes = async res => {
    var data = JSON.stringify({
      title: title,
      email: email,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/likeBlog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchBlog();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const addComment = async res => {
    var data = JSON.stringify({
      title: title,
      email: email,
      comment: comment,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/addComments',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchBlog();
      }
      setComment('');
    } catch (error) {
      console.log(error.response);
    }
  };

  const addReplyToComment = async res => {
    var data = JSON.stringify({
      title: title,
      commentId: commentId,
      email: email,
      reply: reply,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/replyOnComment',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchBlog();
      }
      setReply('');
      setShowReply(!showreply);
    } catch (error) {
      console.log(error.response);
    }
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

      // console.log(JSON.stringify(response.data));
      setBlog(response.data[0]);
      setContent(response.data[0].Content);
      // console.log(response.data[0].LikesCount.length);
      setLikes(response.data[0].LikesCount.length);
      // console.log(response.data[0].Comments);
      setComments(response.data[0].Comments);
      const filename = response.data[0].Image.filename;
      const u = endpoint + '/' + filename;
      console.log(u);
      setImageUri(u);
      // console.log(comments);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Image source={{uri: imageuri}} style={styles.coverimg} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: dim.Width * 0.94,
          }}>
          <View>
            <Text
              style={[
                styles.heading2,
                {
                  marginTop: (20 / dim.h) * dim.Height,
                  marginBottom: (10 / dim.h) * dim.Height,
                },
              ]}>
              {title}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleLikePress}
              style={{
                marginRight: 10,
                padding: 10,
                alignItems: 'center',
              }}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={25}
                color={liked ? 'red' : 'black'}
              />
              <Text>{likes} likes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.desc}>{content}</Text>

        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: dim.Width * 0.93,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              color: 'black',
              fontSize: 20,
            }}>
            Rate & Review
          </Text>
          <Rating rating={rating} onRatingChange={handleRatingChange} />
        </View>

        <TextInput
          style={styles.txtInput}
          placeholder="Leave a comment"
          placeholderTextColor="#8F9098"
          value={comment}
          onChangeText={text => setComment(text)}
        />
        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 10}}
          onPress={addComment}>
          <Text>Comment</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: (10 / dim.h) * dim.Height,
            flexDirection: 'row',
          }}>
          <ScrollView>
            {comments.length > 0 &&
              comments.map((item, index) => (
                <View key={index} style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/images/homedp.png')}
                    style={{
                      width: (50 / dim.w) * dim.Width,
                      height: (50 / dim.w) * dim.Width,
                    }}
                  />
                  <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
                    <Text style={styles.name}>{item.email}</Text>
                    <Text
                      style={[styles.tag, {width: (300 / dim.w) * dim.Width}]}>
                      {item.comment}
                    </Text>

                    <Reply
                      width={(20 / dim.w) * dim.Width}
                      height={(20 / dim.w) * dim.Width}
                      onPress={() => {
                        setCommentId(item._id);
                        setShowReply(!showreply);
                        console.log(commentId);
                        console.log(item._id);
                        // console.log(showreply === true);
                      }}
                    />

                    {item.replies.length > 0 &&
                      item.replies.map((replyItem, replyIndex) => (
                        <View
                          key={replyIndex}
                          style={{flexDirection: 'row', marginVertical: 10}}>
                          <Image
                            source={require('../assets/images/homedp.png')}
                            style={{
                              width: (50 / dim.w) * dim.Width,
                              height: (50 / dim.w) * dim.Width,
                            }}
                          />
                          <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
                            <Text style={styles.name}>{replyItem.email}</Text>
                            <Text>{replyItem.comment}</Text>
                          </View>
                        </View>
                      ))}

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: (5 / dim.h) * dim.Height,
                        marginBottom: (10 / dim.h) * dim.Height,
                        backgroundColor: 'blue',
                      }}>
                      {showreply === true && item._id === commentId && (
                        <View>
                          <TextInput
                            style={styles.reply}
                            placeholder="Leave a comment"
                            placeholderTextColor="#8F9098"
                            value={reply}
                            onChangeText={text => setReply(text)}
                          />
                          <TouchableOpacity
                            style={{backgroundColor: 'red', padding: 10}}
                            onPress={addReplyToComment}>
                            <Text>Add Reply</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (12 / dim.h) * dim.Height,
    paddingTop: 0,
  },

  coverimg: {
    width: dim.Width,
    height: (250 / dim.h) * dim.Height,
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    // marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    alignSelf: 'flex-start',
  },

  desc: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Inter-Light',
    width: dim.Width * 0.93,

    // backgroundColor: 'red',
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

  reply: {
    marginVertical: (10 / dim.h) * dim.Height,
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    height: (50 / dim.h) * dim.Height,
    width: (270 / dim.w) * dim.Width,
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
  heading2: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    width: (250 / dim.w) * dim.Width,

    // backgroundColor: 'blue',
  },
});
export default ViewBlog;
