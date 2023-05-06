import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import dim from '../util/dim';

const REDDIT_API_URL = 'https://www.reddit.com/r/popular.json';

const DiscussionThread = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(REDDIT_API_URL);
        const data = await response.json();
        setPosts(data.data.children.map(child => child.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.postContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.postContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Posted by {item.author}</Text>
        <Text style={styles.comments}>{item.num_comments} comments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ViewThread')}>
          <Text style={styles.viewButton}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredPosts = posts.filter(post => post.title.includes(searchText));

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 10,
    width: 360,
  },
  searchInput: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
  },
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    width: 360,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  postContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    color: '#666',
    marginBottom: 5,
  },
  comments: {
    color: '#666',
  },
  viewButton: {
    color: '#91C788',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-start',

    // fontSize: 16,
    // fontWeight: 'bold',
    // backgroundColor: '#91C788',
    // color: '#fff',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // borderRadius: 10,
  },
});

export default DiscussionThread;
