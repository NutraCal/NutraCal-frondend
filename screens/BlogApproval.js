import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import dim from '../util/dim';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import axios from 'axios';
import {endpoint} from '../util/config';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BlogApproval({route, navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [activeView, setActiveView] = useState('approved');
  const [approvedblogs, setApprovedBlogs] = useState([]);
  const [unapprovedblogs, setUnapprovedBlogs] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const handleToggle = value => {
    setActiveView(value);
  };

  const searchBlog = async res => {
    var data = JSON.stringify({
      title: searchQuery,
    });
    console.log(data);
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
      if (response.data.length.toString() === '0') {
        alert('Blog not found');
        setSearchQuery('');
      } else if (
        response.data[0].Approved.toString() === '1' &&
        activeView === 'approved'
      ) {
        console.log('found in approved');
        setApprovedBlogs(response.data);
        alert('Found in approved blogs');
        setSearchQuery('');
      } else if (
        response.data[0].Approved.toString() !== '1' &&
        activeView === 'unapproved'
      ) {
        setUnapprovedBlogs(response.data);
        alert('Found in unapproved blogs');
        setSearchQuery('');
      } else {
        alert('Blog not found');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteBlog = async title => {
    var data = JSON.stringify({
      title: title,
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'delete',
        url: endpoint + '/blogs/deleteBlog',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      console.log(JSON.stringify(response.data.message));
      alert(response.data.message);
      getApprovedRecipes();
      getUnapprovedRecipes();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const getApprovedBlogs = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/blogs/viewBlogs',
        headers: {},
      });

      // console.log(JSON.stringify(response.data));
      setApprovedBlogs(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUnapprovedBlogs = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/blogs/viewAllUnapproved',
        headers: {},
      });

      // console.log(JSON.stringify(response.data));
      setUnapprovedBlogs(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const ApprovedBlogView = () => (
    <View>
      {approvedblogs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box3}
          onPress={() => {
            console.log(item.Title);
            navigation.navigate('ViewBlog', {title: item.Title});
          }}>
          {item.Image !== undefined && (
            <Image
              source={{
                uri: endpoint + '/' + item.Image.filename,
              }}
              style={[styles.thumbnail, {marginRight: 20}]}
            />
          )}
          <View style={{width: 200}}>
            <Text style={styles.name}>{item.Title}</Text>
            <Text style={styles.desc}>Blog</Text>
          </View>
          <TouchableOpacity
            style={{alignSelf: 'flex-start', marginLeft: 10}}
            onPress={() => deleteBlog(item.Title)}>
            <Ionicon name="delete" size={25} color="#91C788" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  const UnapprovedBlogView = () => (
    <View>
      {unapprovedblogs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box3}
          onPress={() => {
            console.log(item.Title);
            navigation.navigate('ViewBlog', {title: item.Title});
          }}>
          {item.Image !== undefined && (
            <Image
              source={{
                uri: endpoint + '/' + item.Image.filename,
              }}
              style={[styles.thumbnail, {marginRight: 20}]}
            />
          )}
          <View style={{width: 200}}>
            <Text style={styles.name}>{item.Title}</Text>
            <Text style={styles.desc}>Blog</Text>
          </View>
          <TouchableOpacity
            style={{alignSelf: 'flex-start', marginLeft: 10}}
            onPress={() => deleteBlog(item.Title)}>
            <Ionicon name="delete" size={25} color="#91C788" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  useEffect(() => {
    getApprovedBlogs();
    getUnapprovedBlogs();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Searchbar
            placeholder="Search here"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
            multiline={true}
            onIconPress={() => {
              if (searchQuery === '') {
                alert('Enter search query');
              } else {
                searchBlog();
              }
            }}

            // onClearIconPress={() => {
            //   if (activeView === 'nutritionist') {
            //     console.log('-----------------------ugh');
            //     // getNutritionists();
            //   } else {
            //     getBlogs();
            //   }
            // }}
          />
          <DuoToggleSwitch
            primaryText="Approved"
            secondaryText="Unapproved"
            onPrimaryPress={() => {
              setSearchQuery('');
              handleToggle('approved');
              getApprovedBlogs();
            }}
            onSecondaryPress={() => {
              setSearchQuery('');
              handleToggle('unapproved');
              getUnapprovedBlogs();
            }}
            activeColor="#91C788"
            inactiveColor="#DCEDDA"
            activeTextColor="white"
            inactiveTextColor="#91C788"
            primaryTextStyle={{fontSize: 16}}
            secondaryTextStyle={{fontSize: 16}}
            primaryButtonStyle={{width: 180, height: 50}}
            secondaryButtonStyle={{width: 180, height: 50}}
            style={{width: 300, borderRadius: 0}}
          />

          {activeView === 'approved' ? (
            <ApprovedBlogView />
          ) : (
            <UnapprovedBlogView />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 0,
  },

  searchbar: {
    borderRadius: 20,
    margin: 15,
    elevation: 0,
    backgroundColor: '#F8F9FE',
    width: 350,
  },

  box3: {
    // height: 100,
    width: 350,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF7EE',
    paddingVertical: 10,
  },

  name: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 0,
  },

  caltxt: {
    fontSize: 14,
    color: '#91C788',
    fontFamily: 'Inter-SemiBold',
  },

  rating: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginRight: 15,
    color: 'grey',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  thumbnail: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#91C788',
    borderColor: '#91C788',
    borderWidth: 1,
  },
});
