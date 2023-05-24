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

  useEffect(() => {
    fetchThread();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {thread && (
        <View style={styles.threadContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.title, {width: 250}]}>{thread.Title}</Text>
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
      <View style={[styles.box3, {flexDirection: 'column'}]}>
        <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
          Comments:
        </Text>
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
      {comments && (
        <View style={styles.commentsContainer}>
          {comments.map(comment => (
            <View style={styles.commentContainer} key={comment._id}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: endpoint + '/' + comment.user.Image.filename}}
                  style={styles.thumbnail}
                />
                <View>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>
                      {comment.user.email}
                    </Text>
                    <Text style={styles.commentTime}>{comment.date} ago</Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.comment}</Text>
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
                </View>
              </View>
              {comment.replies && (
                <View style={styles.repliesContainer}>
                  {comment.replies.map(reply => (
                    <View style={styles.replyContainer} key={reply._id}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{
                            uri: endpoint + '/' + reply.user.Image.filename,
                          }}
                          style={styles.thumbnail}
                        />
                        <View>
                          <View style={styles.replyHeader}>
                            <Text style={styles.replyAuthor}>
                              {reply.user.email}
                            </Text>
                            <Text style={styles.replyTime}>
                              {reply.date} ago
                            </Text>
                          </View>
                          <Text style={styles.replyBody}>{reply.comment}</Text>
                        </View>
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
  },

  commentsContainer: {
    marginBottom: 20,
  },
  commentContainer: {
    // marginLeft: 20,
    marginTop: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  },
  replyContainer: {
    marginLeft: 20,
    marginBottom: 20,
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
    // backgroundColor: '#EFF7EE',
    // paddingVertical: 10,
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
