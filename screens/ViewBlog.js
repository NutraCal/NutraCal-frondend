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
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [showremarks, setShowRemarks] = useState(false);

  const [remarks, setRemarks] = useState('');

  const [cId, setCId] = useState('');
  const [rId, setRId] = useState('');

  const {user} = useContext(AuthContext);
  const userId = user?.data?.user?._id;
  const email = user?.data?.user?.email;
  const role = user?.data?.user?.role;

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
      setLikes(response.data.likesCount);
    } catch (error) {
      console.log(error.response);
    }
  };

  const approveBlog = async res => {
    var data = JSON.stringify({
      title: title,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/approveBlog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      alert('Blog has been approved');
    } catch (error) {
      console.log(error.response);
    }
  };

  const rejectBlog = async res => {
    var data = JSON.stringify({
      title: title,
      remarks: remarks,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/rejectBlog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      alert('Blog has been rejected');
      setRemarks('');
      setShowRemarks(!showremarks);
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
    console.log(role);
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

  const deleteComment = async cId => {
    var data = JSON.stringify({
      commentId: cId,
      title: title,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/deleteComment',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data.message));
      fetchBlog();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const deleteReply = async (cId, rId) => {
    var data = JSON.stringify({
      title: title,
      commentId: cId,
      replyId: rId,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/blogs/deleteReply',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data.message));

      fetchBlog();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
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
          {/* <Rating rating={rating} onRatingChange={handleRatingChange} /> */}
        </View>

        {role !== 'Admin' ? (
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
              style={[styles.btn, {width: (120 / dim.w) * dim.Width}]}
              onPress={addComment}>
              <Text style={styles.btntxt}>Comment</Text>
            </TouchableOpacity>
          </View>
        ) : null}

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
                    <View
                      style={{
                        width: (230 / dim.w) * dim.Width,
                      }}>
                      <Text style={styles.name}>{item.user.email}</Text>
                      <Text style={[styles.tag]}>{item.comment}</Text>

                      {role !== 'Admin' ? (
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
                      ) : null}
                    </View>
                    {(role === 'Admin' || userId === item.user._id) && (
                      <TouchableOpacity
                        style={{alignSelf: 'flex-start'}}
                        onPress={() => {
                          deleteComment(item._id);
                        }}>
                        <Ionicon name="delete" size={22} color="#91C788" />
                      </TouchableOpacity>
                    )}
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
                        <View
                          style={{
                            width: (190 / dim.w) * dim.Width,
                          }}>
                          <Text style={styles.name}>
                            {replyItem.user.email}
                          </Text>
                          <Text style={[styles.tag2]}>{replyItem.comment}</Text>
                        </View>

                        {(role === 'Admin' ||
                          userId === replyItem.user._id) && (
                          <TouchableOpacity
                            style={{alignSelf: 'flex-start'}}
                            onPress={() => {
                              deleteReply(item._id, replyItem._id);
                            }}>
                            <Ionicon name="delete" size={22} color="#91C788" />
                          </TouchableOpacity>
                        )}
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
            {role === 'Admin' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'yellow',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: dim.Width * 0.8,
                    justifyContent: 'space-around',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity style={styles.btn1} onPress={approveBlog}>
                    <Text style={styles.btntxt}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn1}
                    onPress={() => {
                      setShowRemarks(!showremarks);
                    }}>
                    <Text style={styles.btntxt}>Unapprove</Text>
                  </TouchableOpacity>
                </View>
                {showremarks === true && (
                  <View
                    style={{
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                      width: dim.Width * 0.8,
                    }}>
                    <TextInput
                      style={styles.remarks}
                      placeholder="Leave remarks"
                      placeholderTextColor="#8F9098"
                      value={remarks}
                      onChangeText={text => setRemarks(text)}
                      multiline={true}
                    />
                    <TouchableOpacity
                      onPress={rejectBlog}
                      style={[
                        styles.btn1,
                        {alignSelf: 'flex-end', marginRight: 10},
                      ]}>
                      <Text style={styles.btntxt}>Add Remarks</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : null}
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
  },

  tag2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
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
    backgroundColor: '#91C788',
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
    // width: (80 / dim.w) * dim.Width,
    height: (38 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
    paddingHorizontal: 20,
  },

  btntxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },

  btn1: {
    paddingHorizontal: (30 / dim.w) * dim.Width,
    paddingVertical: (8 / dim.h) * dim.Height,
    marginTop: (15 / dim.h) * dim.Height,
    borderRadius: 20,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },

  remarks: {
    // borderColor: '#E1E3E8',
    backgroundColor: '#EFF7EE',
    // borderWidth: 1,
    height: (80 / dim.h) * dim.Height,
    width: dim.Width * 0.93,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
export default ViewBlog;
