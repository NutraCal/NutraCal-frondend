import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import B1 from '../assets/images/breakfast1.svg';
import L1 from '../assets/images/lunch1.svg';
import D1 from '../assets/images/dinner1.svg';
import S1 from '../assets/images/snack1.svg';
import Forw from '../assets/forwardbtn.svg';
import dim from '../util/dim';

export default function DietPlans({route, navigation}) {
  const {email} = route.params;
  const [open, setOpen] = useState(false); //open and closes model

  function handleOnPress() {
    setOpen(!open);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{marginBottom: (20 / dim.h) * dim.Height}}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>MO</Text>
          <Text style={styles.name2}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, {backgroundColor: '#91C788'}]}>
          <Text style={[styles.name1, {color: 'white'}]}>TU</Text>
          <Text style={[styles.name2, {color: 'white'}]}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>WE</Text>
          <Text style={styles.name2}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>TH</Text>
          <Text style={styles.name2}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>FR</Text>
          <Text style={styles.name2}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>SA</Text>
          <Text style={styles.name2}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>SU</Text>
          <Text style={styles.name2}>11</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.name1}>MO</Text>
          <Text style={styles.name2}>12</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Breakfast</Text>
            <Text style={styles.desc}>230 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <B1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Honey Pancake</Text>
              <Text style={styles.desc}>7:00 am</Text>
            </View>
            <TouchableOpacity>
              <Forw
                width={(24 / dim.w) * dim.Width}
                height={(24 / dim.w) * dim.Width}
                style={{marginLeft: (20 / dim.w) * dim.Width}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Lunch</Text>
            <Text style={styles.desc}>500 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <L1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Chicken Steak</Text>
              <Text style={styles.desc}>1:00 pm</Text>
            </View>
            <TouchableOpacity>
              <Forw
                width={(24 / dim.w) * dim.Width}
                height={(24 / dim.w) * dim.Width}
                style={{marginLeft: (20 / dim.w) * dim.Width}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Snacks</Text>
            <Text style={styles.desc}>50 calories</Text>
          </View>
          <View style={[styles.subsection, {marginTop: 10}]}>
            <S1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Orange</Text>
              <Text style={styles.desc}>5:00 pm</Text>
            </View>
            <TouchableOpacity>
              <Forw
                width={(24 / dim.w) * dim.Width}
                height={(24 / dim.w) * dim.Width}
                style={{marginLeft: (20 / dim.w) * dim.Width}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.subsection}>
            <Text style={styles.heading}>Dinner</Text>
            <Text style={styles.desc}>120 calories</Text>
          </View>
          <View
            style={[styles.subsection, {marginTop: (10 / dim.h) * dim.Height}]}>
            <D1
              width={(60 / dim.w) * dim.Width}
              height={(60 / dim.w) * dim.Width}
            />
            <View style={{width: (150 / dim.w) * dim.Width}}>
              <Text style={styles.name1}>Salad</Text>
              <Text style={styles.desc}>7:10 pm</Text>
            </View>
            <TouchableOpacity>
              <Forw
                width={(24 / dim.w) * dim.Width}
                height={(24 / dim.w) * dim.Width}
                style={{marginLeft: (20 / dim.w) * dim.Width}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddMeal', {
              email: email,
            })
          }>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (8 / dim.h) * dim.Height,
  },

  box: {
    height: (71 / dim.h) * dim.Height,
    width: (45 / dim.w) * dim.Width,
    borderRadius: 12,
    marginHorizontal: (5 / dim.w) * dim.Width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: (5 / dim.h) * dim.Height,
  },

  name2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    marginTop: (5 / dim.h) * dim.Height,
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: (5 / dim.h) * dim.Height,
  },

  section: {
    width: (350 / dim.w) * dim.Width,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#91C788',
    borderRadius: 50,
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    position: 'absolute',
    marginTop: (40 / dim.h) * dim.Height,
    bottom: (10 / dim.h) * dim.Height,
    right: (20 / dim.w) * dim.Width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
