import React, {useEffect, useState} from 'react';
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

const ViewThread = ({navigation, route}) => {
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    // const { threadId } = route.params;
    fetch(
      `https://www.reddit.com/r/karachi/comments/136b9tm/breaking_daniyal_sheikh_finally_lets_his_guest/.json`,
    )
      .then(response => response.json())
      .then(json => {
        const [threadData, commentsData] = json;
        setThread(threadData.data.children[0].data);
        setComments(commentsData.data.children);
      })
      .catch(error => {
        // handle error
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {thread && (
        <View style={styles.threadContainer}>
          <Text style={styles.title}>{thread.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.author}>{thread.author}</Text>
            <Text style={styles.comments}>{thread.num_comments} comments</Text>
          </View>
          <Text style={[styles.title, {fontWeight: '300', fontSize: 17}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            lacus odio, consectetur eu ante sed, bibendum faucibus diam. Nam
            ante magna, aliquet vel pretium in, suscipit a sem. Suspendisse
            potenti. Nullam ex lorem, vulputate venenatis vestibulum sed,
            molestie vel nisl. Etiam venenatis ipsum sed tellus posuere, ac
            hendrerit sapien rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas.
          </Text>
        </View>
      )}
      {comments && (
        <View style={styles.commentsContainer}>
          <Text style={styles.subtitle}>Comments:</Text>
          {comments.map(comment => (
            <View style={styles.commentContainer} key={comment.data.id}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/images/menu-bg.jpeg')}
                  style={styles.thumbnail}
                />
                <View>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>
                      {comment.data.author}
                    </Text>
                    <Text style={styles.commentTime}>
                      {comment.data.created_utc} ago
                    </Text>
                  </View>
                  <Text style={styles.commentBody}>{comment.data.body}</Text>
                </View>
              </View>
              {comment.data.replies && (
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

// const ViewThread = ({route, navigation}) => {
//   const [post, setPost] = useState({
//     title: 'Sample Post',
//     author: 'JohnDoe',
//     likes: 0,
//     comments: [],
//   });
//   const [likes, setLikes] = useState(post.likes);
//   const [comments, setComments] = useState(post.comments);
//   const [commentText, setCommentText] = useState('');
//   const [replyText, setReplyText] = useState('');

//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   const handleComment = () => {
//     const newComment = {
//       id: comments.length + 1,
//       text: commentText,
//       replies: [],
//       likes: 0,
//     };
//     setComments([...comments, newComment]);
//     setCommentText('');
//   };

//   const handleReply = commentId => {
//     const updatedComments = [...comments];
//     const commentIndex = updatedComments.findIndex(
//       comment => comment.id === commentId,
//     );
//     const newReply = {
//       id: updatedComments[commentIndex].replies.length + 1,
//       text: replyText,
//       likes: 0,
//     };
//     updatedComments[commentIndex].replies.push(newReply);
//     setComments(updatedComments);
//     setReplyText('');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.post}>
//         <Text style={styles.title}>{post.title}</Text>
//         <Text style={styles.author}>Posted by u/{post.author}</Text>
//         <View style={styles.postFooter}>
//           <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
//             <Text style={styles.likeButtonText}>{likes} Likes</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.commentSection}>
//         <Text style={styles.commentTitle}>Comments</Text>
//         {comments.map(comment => (
//           <View key={comment.id} style={styles.comment}>
//             <Text style={styles.commentText}>{comment.text}</Text>
//             <View style={styles.commentFooter}>
//               <TouchableOpacity style={styles.commentLikeButton}>
//                 <Text style={styles.commentLikeButtonText}>
//                   {comment.likes} Likes
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.commentReplyButton}>
//                 <Text style={styles.commentReplyButtonText}>Reply</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.replySection}>
//               {comment.replies.map(reply => (
//                 <View key={reply.id} style={styles.reply}>
//                   <Text style={styles.replyText}>{reply.text}</Text>
//                   <TouchableOpacity style={styles.replyLikeButton}>
//                     <Text style={styles.replyLikeButtonText}>
//                       {reply.likes} Likes
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//               <View style={styles.addReply}>
//                 <TextInput
//                   style={styles.addReplyInput}
//                   placeholder="Add a reply"
//                   onChangeText={text => setReplyText(text)}
//                   value={replyText}
//                 />
//                 <TouchableOpacity
//                   style={styles.addReplyButton}
//                   onPress={() => handleReply(comment.id, replyText)}>
//                   <Text style={styles.addReplyButtonText}>Reply</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//         <View style={styles.addComment}>
//           <TextInput
//             style={styles.addCommentInput}
//             placeholder="Add a comment"
//             onChangeText={text => setCommentText(text)}
//             value={commentText}
//           />
//           <TouchableOpacity
//             style={styles.addCommentButton}
//             onPress={handleComment}>
//             <Text style={styles.addCommentButtonText}>Comment</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//   },
//   post: {
//     marginTop: 20,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   author: {
//     color: '#999',
//     marginBottom: 10,
//   },
//   postFooter: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   likeButton: {
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   likeButtonText: {
//     color: '#666',
//   },
//   commentSection: {
//     marginTop: 20,
//   },
//   commentTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   comment: {
//     marginBottom: 10,
//     paddingLeft: 10,
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   commentText: {
//     marginBottom: 5,
//   },
//   commentFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   commentLikeButton: {
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   commentLikeButtonText: {
//     color: '#666',
//   },
//   commentReplyButton: {
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   commentReplyButtonText: {
//     color: '#666',
//   },
//   replySection: {
//     marginLeft: 20,
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   reply: {
//     marginTop: 10,
//     marginBottom: 5,
//     paddingLeft: 10,
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   replyText: {
//     marginBottom: 5,
//   },
//   replyLikeButton: {
//     backgroundColor: '#f2f2f2',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   replyLikeButtonText: {
//     color: '#666',
//   },
//   addComment: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addCommentInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginRight: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 16,
//   },
//   addCommentButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   addCommentButtonText: {
//     color: '#fff',
//   },
//   addReply: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addReplyInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginRight: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 16,
//   },
//   addReplyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   addReplyButtonText: {
//     color: '#fff',
//   },
// });

// export default ViewThread;
