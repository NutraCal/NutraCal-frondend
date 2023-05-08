import * as React from 'react';
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
import dim from '../util/dim';

export default function SuggestRecipe({route, navigation}) {
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-start',
          width: (350 / dim.w) * dim.Width,
          marginTop: (20 / dim.h) * dim.Height,
          marginBottom: (10 / dim.h) * dim.Height,
        }}>
        <Text style={styles.boldheading}>What's in your kitchen?</Text>
        <Text style={styles.subheading}>Enter up to 5 ingredients</Text>
      </View>

      <View style={styles.textinputc}>
        <TextInput
          style={[styles.txtinput, {width: (300 / dim.w) * dim.Width}]}
          placeholder="Type and add your ingredients"
          placeholderTextColor="#C5C6CC"
        />
        <TouchableOpacity style={styles.cbtn}>
          <Text style={{fontSize: 20, color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box3, {backgroundColor: '#EFF7EE'}]}>
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
          <Text style={styles.name}>Sugar</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cbtn,
            {
              marginLeft: (50 / dim.w) * dim.Width,
              elevation: 2,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box3, {backgroundColor: '#EFF7EE'}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ing2
            width={(40 / dim.w) * dim.Width}
            height={(39 / dim.w) * dim.Width}
            style={{marginRight: (20 / dim.w) * dim.Width}}
          />
          <Text style={styles.name}>Baking Soda</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cbtn,
            {
              marginLeft: (50 / dim.w) * dim.Width,
              elevation: 2,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box3, {backgroundColor: '#EFF7EE'}]}>
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
          <Text style={styles.name}>Sugar</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cbtn,
            {
              marginLeft: (50 / dim.w) * dim.Width,
              elevation: 2,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box3, {backgroundColor: '#EFF7EE'}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ing2
            width={(40 / dim.w) * dim.Width}
            height={(39 / dim.w) * dim.Width}
            style={{marginRight: (20 / dim.w) * dim.Width}}
          />
          <Text style={styles.name}>Baking Soda</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cbtn,
            {
              marginLeft: (50 / dim.w) * dim.Width,
              elevation: 2,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box3, {backgroundColor: '#EFF7EE'}]}>
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
          <Text style={styles.name}>Sugar</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cbtn,
            {
              marginLeft: (50 / dim.w) * dim.Width,
              elevation: 2,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={{fontSize: 20, color: '#91C788', alignSelf: 'center'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          width: (330 / dim.w) * dim.Width,
          height: (48 / dim.h) * dim.Height,
          backgroundColor: '#91C788',
          alignSelf: 'center',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: (40 / dim.h) * dim.Height,
          marginBottom: (20 / dim.h) * dim.Height,
        }}>
        <Text
          style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold'}}>
          Find Recipes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
    alignItems: 'center',
  },
  boldheading: {
    fontSize: 22,
    fontFamily: 'Inter-Black',
    color: 'black',
  },
  subheading: {
    fontSize: 16,
    color: '#71727A',
    fontFamily: 'Inter-Regular',
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
