import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../components/RangeSlider';
import Ing1 from '../assets/images/ing1.svg';
import Ing2 from '../assets/images/ing2.svg';
import dim from '../util/dim';

export default function ApplyFilters() {
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 2500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const [textInputValue, setTextInputValue] = useState('');
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          padding: (20 / dim.h) * dim.Height,
          justifyContent: 'center',
        }}>
        <Text style={styles.heading1}>Calories</Text>
        <GestureHandlerRootView style={{marginTop: (20 / dim.h) * dim.Height}}>
          <RangeSlider
            sliderWidth={(340 / dim.w) * dim.Width}
            min={MIN_DEFAULT}
            max={MAX_DEFAULT}
            step={20}
            onValueChange={range => {
              setMinValue(range.min);
              setMaxValue(range.max);
            }}
          />
        </GestureHandlerRootView>
        <View style={styles.labelc}>
          <Text style={styles.label}>0</Text>
          <Text style={styles.label}>500</Text>
          <Text style={styles.label}>1000</Text>
          <Text style={styles.label}>1500</Text>
          <Text style={styles.label}>2000</Text>
          <Text style={styles.label}>2500</Text>
        </View>

        <Text style={styles.heading1}>Ingredients</Text>

        <View style={styles.textinputc}>
          <TextInput
            style={[styles.txtinput, {width: (320 / dim.w) * dim.Width}]}
            placeholder="Type and add your ingredients"
            placeholderTextColor="#C5C6CC"
          />
          <TouchableOpacity style={styles.cbtn}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box4, {backgroundColor: '#EBF2FF'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ing1
              width={(40 / dim.w) * dim.Width}
              height={(39 / dim.h) * dim.Height}
              style={{marginRight: (20 / dim.w) * dim.Width}}
            />
            <Text style={styles.name2}>Sugar</Text>
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

        <View style={[styles.box4, {backgroundColor: '#F9EBF8'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ing2
              width={40}
              height={39}
              style={{marginRight: (20 / dim.w) * dim.Width}}
            />
            <Text style={styles.name2}>Baking Soda</Text>
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
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Inter-SemiBold',
            }}>
            Find Recipe
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: (5 / dim.h) * dim.Height,
    flex: 1,
  },
  heading1: {
    marginTop: (24 / dim.h) * dim.Height,
    marginLeft: (10 / dim.w) * dim.Width,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
  },

  text: {
    color: 'black',
    fontSize: 20,
  },

  label: {
    color: '#999999',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },

  labelc: {
    flexDirection: 'row',
    width: (350 / dim.w) * dim.Width,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (10 / dim.h) * dim.Height,
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
    justifyContent: 'center',
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (10 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
  },

  box4: {
    height: (55 / dim.h) * dim.Height,
    width: (360 / dim.w) * dim.Width,
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

  name2: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
    width: (180 / dim.w) * dim.Width,
  },
});
