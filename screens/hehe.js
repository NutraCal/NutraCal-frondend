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

const ViewThread = ({navigation, route}) => {
  const {title} = route.params;
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);

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
      // setContent(response.data[0].Content);
      // setLikes(response.data[0].LikesCount.length);
      console.log(response.data[0].LikesCount.length);
      // console.log(response.data[0].LikesCount.length);
      console.log(response.data[0].Comments.length);
      setComments(response.data[0].Comments);
      // console.log(comments);
      // console.log(response.data[0].Content);
    } catch (error) {
      // console.log(error.response);
    }
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  useEffect(() => {
    fetchThread();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {thread && (
        <View style={styles.threadContainer}>
          <Text style={styles.title}>{thread.Title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.author}>{thread.User}</Text>
            <Text style={styles.comments}>
              {thread.LikesCount.length} comments
            </Text>
          </View>
          <Text style={[styles.title, {fontWeight: '300', fontSize: 17}]}>
            {thread.Content}
          </Text>
        </View>
      )}

      {/* <View
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
                        <Text style={styles.name}>{replyItem.user.email}</Text>
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
      </View> */}

      {comments && (
        <View style={styles.commentsContainer}>
          <Text style={styles.subtitle}>Comments:</Text>

          {comments.map((item, index) => (
            <View style={styles.commentContainer} key={comment._id}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/images/menu-bg.jpeg')}
                  style={styles.thumbnail}
                />
                <View>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{item.user.name}</Text>
                    <Text style={styles.commentTime}>{comment.time} ago</Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.comment}</Text>
                </View>
              </View>
              {/* {comment.data.replies && (
                <View style={styles.repliesContainer}>
                  {comment.data.replies.data.children.map(reply => (
                    <View style={styles.replyContainer} key={reply.data.id}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('../assets/images/menu-bg.jpeg')}
                          style={styles.thumbnail}
                        />
                        <View>
                          <View style={styles.replyHeader}>
                            <Text style={styles.replyAuthor}>
                              {reply.data.author}
                            </Text>
                            <Text style={styles.replyTime}>
                              {reply.data.created_utc} ago
                            </Text>
                          </View>
                          <Text style={styles.replyBody}>
                            {reply.data.body}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )} */}
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
    marginBottom: 20,
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
});

export default ViewThread;
