import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Myrec1 from '../assets/images/myrec1.svg';
import Myrec2 from '../assets/images/myrec2.svg';
import Hearticon from '../assets/images/heart.svg';

export default function MyRecipes({route, navigation}) {
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.box3}>
          <Myrec1 width={70} height={50} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>250 Kcal</Text>
            <Text style={styles.name}>Chopped Spring Ramen</Text>
            <Text style={[styles.desc, {marginTop: 0}]}>
              Scallions & tomatoes
            </Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec2 width={70} height={60} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>450 Kcal</Text>
            <Text style={styles.name}>Chicken Tandoori</Text>
            <Text style={styles.desc}>Chicken & Salad</Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec1 width={70} height={50} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>250 Kcal</Text>
            <Text style={styles.name}>Chopped Spring Ramen</Text>
            <Text style={[styles.desc, {marginTop: 0}]}>
              Scallions & tomatoes
            </Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec2 width={70} height={60} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>450 Kcal</Text>
            <Text style={styles.name}>Chicken Tandoori</Text>
            <Text style={styles.desc}>Chicken & Salad</Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec1 width={70} height={50} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>250 Kcal</Text>
            <Text style={styles.name}>Chopped Spring Ramen</Text>
            <Text style={[styles.desc, {marginTop: 0}]}>
              Scallions & tomatoes
            </Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec1 width={70} height={50} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>250 Kcal</Text>
            <Text style={styles.name}>Chopped Spring Ramen</Text>
            <Text style={[styles.desc, {marginTop: 0}]}>
              Scallions & tomatoes
            </Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <Myrec1 width={70} height={50} style={{marginRight: 20}} />
          <View style={{width: 220}}>
            <Text style={styles.caltxt}>250 Kcal</Text>
            <Text style={styles.name}>Chopped Spring Ramen</Text>
            <Text style={[styles.desc, {marginTop: 0}]}>
              Scallions & tomatoes
            </Text>
          </View>
          <Hearticon width={20} height={20} style={styles.hicon} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  box3: {
    height: 120,
    width: 350,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF7EE',
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
  },

  caltxt: {
    fontSize: 14,
    color: '#91C788',
    fontFamily: 'Inter-SemiBold',
  },

  hicon: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 5,
  },
});
