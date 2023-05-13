import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../context/AuthContext';
import dim from '../util/dim';

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
  const [item, setItem] = useState('');
  const [editItem, setEditItem] = useState(0);

  const getShoppingList = async res => {
    console.log('getting list');
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/shoppingList/viewList/' + userId,
        headers: {},
      });
      setList(response.data);
      setLoadData(false);
    } catch (error) {
      console.log('error hehehehheheh');
      console.log(error.response.data);
    }
  };

  const addItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: ['Butter'],
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const delItem = async res => {
    var data = JSON.stringify({
      userId: userId,
      list: ['Butter'],
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
    } catch (error) {
      console.log(error.message);
    }
    setLoadData(true);
  };

  useEffect(() => {
    console.log(userId);
    console.log(email);
    getShoppingList();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textinputc}>
          <TextInput
            style={[styles.txtinput, {width: (300 / dim.w) * dim.Width}]}
            placeholder="Type and add your ingredients"
            placeholderTextColor="#C5C6CC"
            value={item}
            onChangeText={text => setItem(text)}
          />
          <TouchableOpacity style={styles.cbtn} onPress={() => addItem()}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{width: (350 / dim.w) * dim.Width}}>
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
                    <Ing1
                      width={(40 / dim.w) * dim.Width}
                      height={(39 / dim.w) * dim.Width}
                      style={{marginRight: (20 / dim.w) * dim.Width}}
                    />
                    <Text style={styles.name}>{item}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => delItem()}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    alignItems: 'center',
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
    marginBottom: (5 / dim.h) * dim.Height,
  },

  textinputc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
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
});
