import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import axios from 'axios';
import {endpoint} from '../util/config';

export default function Shopping({route, navigation}) {
  const {email} = route.params;

  const [loadId, setLoadId] = useState(true);
  const [loadData, setLoadData] = useState(true);
  const [userId, setUserId] = useState('');
  const [json, setJson] = useState('');

  const getUserId = async res => {
    console.log('inside');
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/users/getUserId/' + email,
        headers: {},
      });

      console.log(JSON.stringify(response.data));

      setJson(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getShoppingList = async res => {
    console.log('getting list');
    console.log(userId);
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/shoppingList/viewList/' + userId,
        headers: {},
      });

      console.log(JSON.stringify(response.data[0]));
    } catch (error) {
      console.log('errpr');
      console.log(error.response.data);
    }
  };

  const addItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: ['Sugar', 'Butter', 'Rice', 'Corn'],
    });

    console.log(data);
    try {
      const response = await axios({
        method: 'post',
        url: endpoint + '/shoppingList/addList',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const delItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: ['Sugar', 'Butter', 'Rice', 'Corn', 'Milk'],
    });

    console.log(data);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (loadId) {
      getUserId();
      setLoadId(false);
    }
    if (json) {
      setUserId(json);
      console.log('user id here');
      console.log(userId);
      getShoppingList();
      setLoadData(false);
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textinputc}>
          <TextInput
            style={[styles.txtinput, {width: 300}]}
            placeholder="Type and add your ingredients"
            placeholderTextColor="#C5C6CC"
          />
          <TouchableOpacity style={styles.cbtn} onPress={addItem}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ing1 width={40} height={39} style={{marginRight: 20}} />
            <Text style={styles.name}>Sugar</Text>
          </View>
          <TouchableOpacity
            onPress={delItem}
            style={[
              styles.cbtn,
              {marginLeft: 50, elevation: 2, backgroundColor: 'white'},
            ]}>
            <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
              -
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box3, {backgroundColor: '#F9EBF8'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ing2 width={40} height={39} style={{marginRight: 20}} />
            <Text style={styles.name}>Baking Soda</Text>
          </View>
          <TouchableOpacity
            onPress={delItem}
            style={[
              styles.cbtn,
              {marginLeft: 50, elevation: 2, backgroundColor: 'white'},
            ]}>
            <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
              -
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
    alignItems: 'center',
  },

  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: 48,
    width: 350,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },

  textinputc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    width: 350,
  },

  box3: {
    height: 70,
    width: 350,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  cbtn: {
    width: 30,
    height: 30,
    backgroundColor: '#91C788',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: 5,
    width: 180,
  },
});
