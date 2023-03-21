import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import axios from 'axios';
import {endpoint} from '../util/config';

export default function Shopping({route, navigation}) {
  const {email} = route.params;

  const [loadId, setLoadId] = useState(true);
  const [loadData, setLoadData] = useState(false);
  const [userId, setUserId] = useState('');
  const [json, setJson] = useState('');

  const [getlist, setList] = useState([]);

  const [item, setItem] = useState('');
  const [editItem, setEditItem] = useState(0);

  const updateList = () => {
    setList(list =>
      getlist.map(element =>
        element.key === editItem ? {key: element.key, data: item} : element,
      ),
    );
    setItem('');
    setEditItem(0);
  };

  const updateItems = item => {
    setItem(item.data);
    setEditItem(item.key);
  };

  const additems = () => {
    console.log('in add item function');
    // setList([...getlist, {key: Math.random().toString(), data: item}]);
    setList([...getlist, item]);
    // console.log('list' + getlist);

    setItem('');
    console.log(getlist);
    // addItem();
    // setLoadData(!loadData);
  };

  const deleteItem = key => {
    console.log(key);

    // setList(list => getlist.filter(element => element.key != key));
    const list = getlist.filter(ele => key != getlist.indexOf(ele));
    console.log('list', list);
    setList(list);

    console.log(getlist);
  };

  const getUserId = async res => {
    console.log('inside');
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/users/getUserId/' + email,
        headers: {},
      });

      // console.log(JSON.stringify(response.data));
      setUserId(response.data);
      setLoadData(!loadData);
      // return json;
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

      // console.log(JSON.stringify(response.data[0].list));
      console.log('res', response.data);
      const slist = response.data[0].list;
      console.log(...slist);
      setList([...slist]);
    } catch (error) {
      console.log('error');
      console.log(error.response.data);
    }
  };

  const addItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: getlist,
    });

    console.log('data' + data);
    // try {
    //   const response = await axios({
    //     method: 'post',
    //     url: endpoint + '/shoppingList/addList',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     data: data,
    //   });
    //   console.log(JSON.stringify(response.data));
    // } catch (error) {
    //   console.log(error.message);
    // }
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
    getUserId();
  }, []);

  useEffect(() => {
    console.log(userId);
    getShoppingList();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textinputc}>
          <TextInput
            style={[styles.txtinput, {width: 300}]}
            placeholder="Type and add your ingredients"
            placeholderTextColor="#C5C6CC"
            value={item}
            onChangeText={text => setItem(text)}
          />
          <TouchableOpacity style={styles.cbtn} onPress={additems}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{width: 350}}>
          <FlatList
            data={getlist}
            renderItem={({index, item}) => (
              <View key={index}>
                <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ing1 width={40} height={39} style={{marginRight: 20}} />
                    <Text style={styles.name}>{item}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteItem(index)}
                    style={[
                      styles.cbtn,
                      {marginLeft: 50, elevation: 2, backgroundColor: 'white'},
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
