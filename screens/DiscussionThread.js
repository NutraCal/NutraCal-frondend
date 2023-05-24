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
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {endpoint} from '../util/config';
import {ScrollView} from 'react-native-gesture-handler';

const DiscussionThread = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [forums, setForums] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  const getForums = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/discussionThreads/viewThreads',
        headers: {},
      });

      console.log(JSON.stringify(response.data));
      setForums(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const searchThread = async res => {
    var data = JSON.stringify({
      title: searchQuery,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/discussionThreads/viewThreadByTitle',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data));
      setForums(response.data);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
      getForums();
    }
  };

  useEffect(() => {
    getForums();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          placeholder="Search a forum"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          onIconPress={() => {
            if (searchQuery === '') {
              alert('Enter search query');
            } else {
              searchThread();
            }
          }}
        />

        {forums.map((item, index) => (
          <View key={index} style={styles.postContainer}>
            <Image
              source={require('../assets/images/thread-square.png')}
              style={styles.thumbnail}
            />
            <View style={styles.postContent}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.author}>Posted by {item.User}</Text>
              <Text style={styles.comments}>
                {item.Comments.length} comments
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewThread', {title: item.Title})
                }>
                <Text style={styles.viewButton}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    padding: 18,
    width: 360,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E3E8',
    alignSelf: 'center',
  },
  thumbnail: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 20,
    borderRadius: 10,
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
  },
  searchbar: {
    borderRadius: 20,
    margin: 15,
    elevation: 0,
    backgroundColor: '#F8F9FE',
    width: 350,
  },
});

export default DiscussionThread;
