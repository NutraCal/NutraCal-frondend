import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import dim from '../util/dim';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import {endpoint} from '../util/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Reply from '../assets/images/reply.svg';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewThread = ({navigation, route}) => {
  const {title} = route.params;
  const [thread, setThread] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

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
        url: endpoint + '/discussionThreads/likeThread',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchThread();
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
        url: endpoint + '/discussionThreads/addComments',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchThread();
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
        url: endpoint + '/discussionThreads/replyOnComment',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      if (response) {
        fetchThread();
      }
      setReply('');
      setShowReply(!showreply);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchThread = async res => {
    console.log(title);
    var data = JSON.stringify({
      title: title,
    });
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/discussionThreads/viewThreadByTitle',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(response.data[0]);
      setThread(response.data[0]);
      setLikes(response.data[0].LikesCount.length);
      console.log(response.data[0].LikesCount.length);
      console.log(response.data[0].Comments.length);
      setComments(response.data[0].Comments);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteComment = async cId => {
    var data = JSON.stringify({
      title: title,
      commentId: cId,
    });
    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/discussionThreads/deleteComment',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data.message));
      fetchThread();
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
        url: endpoint + '/discussionThreads/deleteReply',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data.message));

      fetchThread();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    fetchThread();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {thread && (
        <View style={styles.threadContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.title, {width: (250 / dim.w) * dim.Width}]}>
              {thread.Title}
            </Text>
            <TouchableOpacity
              onPress={handleLikePress}
              style={{
                marginLeft: 30,
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

          <View style={styles.infoContainer}>
            <Text style={styles.author}>{thread.User}</Text>
            <Text style={styles.comments}>
              {thread.Comments.length} comments
            </Text>
          </View>
          <Text style={[styles.title, {fontWeight: '300', fontSize: 17}]}>
            {thread.Content}
          </Text>
        </View>
      )}

      <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
        Comments:
      </Text>

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
            style={[styles.btn, {width: 100}]}
            onPress={addComment}>
            <Text style={styles.btntxt}>Comment</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {comments && (
        <View style={styles.commentsContainer}>
          {comments.map(comment => (
            <View style={styles.commentContainer} key={comment._id}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 12,
                  backgroundColor: '#EFF7EE',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: (10 / dim.w) * dim.Width,
                  flexDirection: 'row',
                  borderRadius: 12,
                }}>
                <Image
                  source={{uri: endpoint + '/' + comment.user.Image.filename}}
                  style={styles.thumbnail}
                />
                <View
                  style={{
                    width: (230 / dim.w) * dim.Width,
                  }}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>
                      {comment.user.email}
                    </Text>
                    <Text style={styles.commentTime}>2 mins ago</Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.comment}</Text>
                  {role !== 'Admin' ? (
                    <TouchableOpacity
                      style={{flexDirection: 'row', marginTop: 5}}
                      onPress={() => {
                        setCommentId(comment._id);
                        setShowReply(!showreply);
                        console.log(commentId);
                        console.log(comment._id);
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
                {(role === 'Admin' || userId === comment.user._id) && (
                  <TouchableOpacity
                    style={{alignSelf: 'flex-start'}}
                    onPress={() => {
                      deleteComment(comment._id);
                    }}>
                    <Ionicon name="delete" size={22} color="#91C788" />
                  </TouchableOpacity>
                )}
              </View>
              {comment.replies && (
                <View style={styles.repliesContainer}>
                  {comment.replies.map(reply => (
                    <View style={styles.replyContainer} key={reply._id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          borderRadius: 12,
                          backgroundColor: '#EFF7EE',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          padding: (10 / dim.w) * dim.Width,
                          width: (352 / dim.w) * dim.Width,
                        }}>
                        <Image
                          source={{
                            uri: endpoint + '/' + reply.user.Image.filename,
                          }}
                          style={styles.thumbnail}
                        />
                        <View
                          style={{
                            // backgroundColor: 'green',
                            width: (230 / dim.w) * dim.Width,
                          }}>
                          <View style={styles.replyHeader}>
                            <Text style={styles.replyAuthor}>
                              {reply.user.email}
                            </Text>
                            <Text style={styles.replyTime}>10 mins ago</Text>
                          </View>
                          <Text style={styles.replyBody}>{reply.comment}</Text>
                        </View>

                        {(role === 'Admin' || userId === reply.user._id) && (
                          <TouchableOpacity
                            style={{alignSelf: 'flex-start'}}
                            onPress={() => {
                              deleteReply(comment._id, reply._id);
                            }}>
                            <Ionicon name="delete" size={22} color="#91C788" />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}
              {showreply === true && comment._id === commentId && (
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
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  threadContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
    padding: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  author: {
    marginRight: 5,
    color: '#91C788',
  },

  comments: {
    marginRight: 5,
  },
  thumbnail: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 5,
  },

  commentsContainer: {
    marginBottom: 20,
  },
  commentContainer: {
    // marginLeft: 20,
    marginTop: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  commentTime: {
    color: 'gray',
    marginRight: 5,
  },
  commentBody: {
    marginBottom: 10,
    width: 330,
  },
  repliesContainer: {
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  replyContainer: {
    // marginLeft: 20,
    // marginBottom: 20,
    // backgroundColor: 'yellow',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  replyTime: {
    color: 'gray',
    marginRight: 5,
  },
  replyBody: {
    width: 290,
    marginBottom: 10,
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

export default ViewThread;
