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

      setBlog(response.data[0]);
      setContent(response.data[0].Content);
      setLikes(response.data[0].LikesCount.length);
      console.log(response.data[0].LikesCount.length);
      // console.log(response.data[0].Comments);
      setComments(response.data[0].Comments);
      const filename = response.data[0].Image.filename;
      const u = endpoint + '/' + filename;
      // console.log(u);
      setImageUri(u);
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
            width: dim.Width * 0.93,
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
            Comments:
          </Text>
          <Rating rating={rating} onRatingChange={handleRatingChange} />
        </View>
        <View style={[styles.box3, {flexDirection: 'column'}]}>
          <TextInput
            style={styles.txtInput}
            placeholder="Leave a comment"
            placeholderTextColor="#8F9098"
            value={comment}
            onChangeText={text => setComment(text)}
            multiline={true}
          />

          <TouchableOpacity
            style={[styles.btn, {width: 100}]}
            onPress={addComment}>
            <Text style={styles.btntxt}>Comment</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ScrollView>
            {comments.length > 0 &&
              comments.map((item, index) => (
                <View key={index}>
                  <View style={styles.box3}>
                    <Image
                      source={{uri: endpoint + '/' + item.user.Image.filename}}
                      style={styles.thumbnail}
                    />
                    <View>
                      <Text style={styles.name}>{item.user.email}</Text>
                      <Text style={[styles.tag]}>{item.comment}</Text>

                      <TouchableOpacity
                        style={{flexDirection: 'row', marginTop: 5}}
                        onPress={() => {
                          setCommentId(item._id);
                          setShowReply(!showreply);
                          console.log(commentId);
                          console.log(item._id);
                        }}>
                        <Text style={{marginRight: 5, color: '#91C788'}}>
                          Reply
                        </Text>
                        <Reply
                          width={(20 / dim.w) * dim.Width}
                          height={(20 / dim.w) * dim.Width}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {item.replies.length > 0 &&
                    item.replies.map((replyItem, replyIndex) => (
                      <View
                        key={replyIndex}
                        style={[
                          styles.box3,
                          {marginLeft: 40, width: dim.Width * 0.83},
                        ]}>
                        <Image
                          source={{
                            uri: endpoint + '/' + replyItem.user.Image.filename,
                          }}
                          style={styles.thumbnail}
                        />
                        <View>
                          <Text style={styles.name}>
                            {replyItem.user.email}
                          </Text>
                          <Text style={[styles.tag2]}>{replyItem.comment}</Text>
                        </View>
                      </View>
                    ))}

                  {showreply === true && item._id === commentId && (
                    <View
                      style={[
                        styles.box3,
                        {
                          marginLeft: 40,
                          width: dim.Width * 0.83,
                          flexDirection: 'column',
                        },
                      ]}>
                      <TextInput
                        style={styles.reply}
                        placeholder="Leave a reply"
                        placeholderTextColor="#8F9098"
                        value={reply}
                        onChangeText={text => setReply(text)}
                        multiline={true}
                      />

                      <TouchableOpacity
                        style={styles.btn}
                        onPress={addReplyToComment}>
                        <Text style={styles.btntxt}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  )}
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
    marginBottom: (10 / dim.h) * dim.Height,
    alignSelf: 'flex-start',
  },

  desc: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Inter-Light',
    width: dim.Width * 0.93,
  },

  txtInput: {
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (25 / dim.w) * dim.Width,
    borderRadius: 20,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  reply: {
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 20,
    width: (300 / dim.w) * dim.Width,
    borderRadius: 12,
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
    width: 250,
  },

  tag2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    width: 210,
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    width: (250 / dim.w) * dim.Width,
  },
  thumbnail: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 25,
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  box3: {
    width: dim.Width * 0.93,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFF7EE',
    paddingVertical: 10,
  },

  btn: {
    width: (80 / dim.w) * dim.Width,
    height: (38 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
  },

  btntxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
export default ViewBlog;
