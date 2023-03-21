import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Button, Avatar} from 'react-native-paper';
import Sortic from '../assets/sorticon.svg';
import Arrowdown from '../assets/arrowdownicon.svg';
import Filter from '../assets/filtericon.svg';
import Pic1 from '../assets/images/pic1.svg';
import Pic2 from '../assets/images/pic2.svg';
import Pic3 from '../assets/images/pic3.svg';
import Pic4 from '../assets/images/pic4.svg';
import Diet1 from '../assets/images/dietpic1.svg';
import Diet2 from '../assets/images/dietpic2.svg';
import Pop1 from '../assets/images/pop1.svg';
import Forw from '../assets/forwardbtn.svg';
import HomeHeader from './HomeHeader';

export default function SearchRecipe({route, navigation}) {
  const {email} = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          placeholder="Recipes"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <View style={styles.cont}>
          <View style={styles.btn}>
            <Sortic width={20} height={20} />
            <Text style={styles.label}>Sort</Text>
            <Arrowdown width={20} height={20} />
          </View>

          <View style={styles.btn}>
            <Filter width={20} height={20} />
            <Text
              style={styles.label}
              onPress={() => navigation.navigate('ApplyFilters')}>
              Filter
            </Text>
            <Arrowdown width={20} height={20} />
          </View>
        </View>
        <Text style={styles.heading}>Category</Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scroll}>
          <TouchableOpacity style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
            <Pic1 width={60} height={61} style={{marginBottom: 8}} />
            <Text style={styles.name1}>Salad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, {backgroundColor: '#F9EBF8'}]}>
            <Pic2 width={60} height={61} style={{marginBottom: 10}} />
            <Text style={styles.name1}>Cake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, {backgroundColor: '#EBF2FF'}]}>
            <Pic3 width={60} height={61} style={{marginBottom: 10}} />
            <Text style={styles.name1}>Pie</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, {backgroundColor: '#F9EBF8'}]}>
            <Pic4 width={60} height={61} style={{marginBottom: 10}} />
            <Text style={styles.name1}>Smoothie</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.heading}>Diet Recommendations</Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scroll}>
          <View style={[styles.box2, {backgroundColor: '#EBF2FF'}]}>
            <Diet1 width={96} height={60} style={{marginBottom: 10}} />
            <Text style={styles.name}>Honey Pancake</Text>
            <Text style={styles.desc}>Easy | 30mins | 180kCal</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewRecipe')}>
              <View
                style={[
                  styles.btn1,
                  {
                    backgroundColor: '#91C788',
                    borderColor: '#91C788',
                    borderWidth: 1,
                  },
                ]}>
                <Text style={[styles.label1, {color: 'white'}]}>View</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.box2, {backgroundColor: '#F9EBF8'}]}>
            <Diet2 width={110} height={57} style={{marginBottom: 10}} />
            <Text style={styles.name}>Canai Bread</Text>
            <Text style={styles.desc}>Easy | 30mins | 180kCal</Text>
            <TouchableOpacity>
              <View style={styles.btn1}>
                <Text
                  style={[
                    styles.label1,
                    {color: '#91C788', fontFamily: 'Inter-Bold'},
                  ]}>
                  View
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Text style={styles.heading}>Popular</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.box3, {backgroundColor: '#EBF2FF'}]}>
            <Pop1 width={48} height={47} style={{marginRight: 20}} />
            <View>
              <Text style={styles.name}>Blueberry Pancake</Text>
              <Text style={[styles.desc, {marginTop: 0, marginRight: 50}]}>
                Medium | 230kCal
              </Text>
            </View>
            <TouchableOpacity>
              <Forw width={24} height={24} style={{marginLeft: 20}} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  searchbar: {
    borderRadius: 20,
    margin: 15,
    elevation: 0,
    backgroundColor: '#F8F9FE',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Regular',
  },

  label1: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-Regular',
  },

  icon: {
    width: 15,
    height: 15,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderColor: '#C5C6CC',
    borderRadius: 12,
    marginVertical: 8,
  },

  btn1: {
    paddingHorizontal: 30,
    paddingVertical: 4,
    marginTop: 15,
    borderRadius: 20,
  },

  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    alignItems: 'center',
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 12,
  },

  box: {
    height: 120,
    width: 100,
    borderRadius: 12,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box2: {
    height: 220,
    width: 180,
    borderRadius: 12,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box3: {
    height: 80,
    width: 350,
    borderRadius: 12,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: {
    marginTop: 10,
    flexDirection: 'row',
  },

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: 5,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: 5,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 5,
  },
});
