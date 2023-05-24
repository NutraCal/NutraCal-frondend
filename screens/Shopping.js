import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';
import dim from '../util/dim';

import {useFocusEffect} from '@react-navigation/native';

import {ScrollView} from 'react-native-virtualized-view';

export default function Shopping({route, navigation}) {
  // const {email} = route.params;

  const {user} = useContext(AuthContext);

  const email = user?.data?.user?.email;
  const userId = user?.data?.user?._id;

  // const [loadId, setLoadId] = useState(true);
  const [loadData, setLoadData] = useState(false);
  // const [userId, setUserId] = useState('');
  const [json, setJson] = useState('');
  const [getlist, setList] = useState([]);

  const [ditem, setDitem] = useState('');
  const [item, setItem] = useState('');
  const [aitem, setAitem] = useState('');
  const [editItem, setEditItem] = useState(0);

  const [loading, setLoading] = useState(false);

  const convertToSentenceCase = array => {
    const newArray = array.map(item => {
      const firstLetter = item.charAt(0).toUpperCase();
      const restOfString = item.slice(1).toLowerCase();
      return firstLetter + restOfString;
    });
    return newArray;
  };

  const getShoppingList = async res => {
    setLoading(true);
    // console.log('getting list');
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/shoppingList/viewList/' + userId,
        headers: {},
      });
      const convertedArray = convertToSentenceCase(response.data.list);
      setList(convertedArray);
      setLoadData(false);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: [aitem],
    });

    console.log('data' + data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/shoppingList/updateList',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      setLoadData(true);
      // setLoading(false);
      setAitem('');
      setItem('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const delItem = async res => {
    // setLoading(true);
    var data = JSON.stringify({
      userId: userId,
      list: [ditem],
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'put',
        url: endpoint + '/shoppingList/removeItem',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      setLoadData(true);
      // setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   console.log(userId);
  //   console.log(email);
  //   getShoppingList();
  // }, [loadData]);

  useFocusEffect(
    React.useCallback(() => {
      getShoppingList();
    }, [loadData]),
  );

  useEffect(() => {
    if (ditem !== '') {
      // Call delItem() or perform any other action here with the updated value of sitem
      console.log(ditem);
      delItem();
    }
  }, [ditem]);

  useEffect(() => {
    if (aitem !== '') {
      // Call delItem() or perform any other action here with the updated value of sitem
      console.log(aitem);
      addItem();
    }
  }, [aitem]);

  return (
    <View style={styles.container}>
      <View style={styles.textinputc}>
        <TextInput
          style={[styles.txtinput, {width: (300 / dim.w) * dim.Width}]}
          placeholder="Type and add your ingredients"
          placeholderTextColor="#C5C6CC"
          value={item}
          onChangeText={text => setItem(text)}
        />
        <TouchableOpacity
          style={styles.cbtn}
          onPress={() => {
            setAitem(item);
            // console.log(aitem);
            // addItem();
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>

      {/* //remove scrollview */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}> */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#91C788"
          style={{marginTop: (250 / dim.h) * dim.Height}}></ActivityIndicator>
      ) : (
        <View style={{width: (350 / dim.w) * dim.Width, marginBottom: 70}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getlist}
            renderItem={({index, item}) => (
              <View key={index}>
                <View style={styles.box3}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ing1
                      width={(40 / dim.w) * dim.Width}
                      height={(39 / dim.w) * dim.Width}
                      style={{marginRight: (20 / dim.w) * dim.Width}}
                    />
                    <Text style={styles.name}>{item}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setDitem(item);
                    }}
                    style={[
                      styles.cbtn,
                      {
                        marginLeft: (50 / dim.w) * dim.Width,
                        elevation: 2,
                        backgroundColor: 'white',
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#91C788',
                        alignSelf: 'center',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: (8 / dim.h) * dim.Height,
    alignItems: 'center',
    paddingBottom: 0,
    // height: '100%',
    // backgroundColor: 'red',
    height: dim.Height,
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginVertical: (5 / dim.h) * dim.Height,
  },

  textinputc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: (10 / dim.h) * dim.Height,

    width: (350 / dim.w) * dim.Width,
  },

  box3: {
    height: (70 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: (10 / dim.h) * dim.Height,
    backgroundColor: '#EFF7EE',
  },

  cbtn: {
    width: (30 / dim.w) * dim.Width,
    height: (30 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: (10 / dim.w) * dim.Width,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
  },

  ac: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // activityIndicator: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
