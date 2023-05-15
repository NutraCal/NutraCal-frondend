import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import N1 from '../assets/images/nutritionist1.svg';
import N2 from '../assets/images/nutritionist2.svg';
import N3 from '../assets/images/nutritionist3.svg';
import dim from '../util/dim';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';

export default function SearchBlog({route, navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeView, setActiveView] = useState('nutritionist');
  const onChangeSearch = query => setSearchQuery(query);

  const handleToggle = value => {
    setActiveView(value);
  };

  const NutritionistView = () => (
    <View>
      <TouchableOpacity style={styles.box3}>
        <N1 width={70} height={50} style={{marginRight: 20}} />
        <View style={{width: 220}}>
          <Text style={styles.name}>Anamwp</Text>
          <Text style={styles.desc}>Nutritionist</Text>
        </View>
        <Text style={styles.rating}>4.8</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box3}>
        <N2 width={70} height={50} style={{marginRight: 20}} />
        <View style={{width: 220}}>
          <Text style={styles.name}>Guy Hawkins</Text>
          <Text style={styles.desc}>Nutritionist</Text>
        </View>
        <Text style={styles.rating}>4.8</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box3}>
        <N3 width={70} height={50} style={{marginRight: 20}} />
        <View style={{width: 220}}>
          <Text style={styles.name}>Lexie Alexandar</Text>
          <Text style={styles.desc}>Nutritionist</Text>
        </View>
        <Text style={styles.rating}>4.8</Text>
      </TouchableOpacity>
    </View>
  );

  const BlogView = () => (
    <View>
      <Text>Heheheeeeeeeeeee blogs</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Searchbar
            placeholder="Nutritionists"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
          />
          <DuoToggleSwitch
            primaryText="Nutritionist"
            secondaryText="Blogs"
            onPrimaryPress={() => {
              handleToggle('nutritionist');
            }}
            onSecondaryPress={() => {
              handleToggle('blog');
            }}
            activeColor="green"
            inactiveColor="blue"
            activeTextColor="yellow"
            inactiveTextColor="white"
            primaryButtonStyle={{width: 150}}
            secondaryButtonStyle={{width: 150}}
            style={{width: 300}}
          />

          {activeView === 'nutritionist' ? <NutritionistView /> : <BlogView />}
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
    height: 100,
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
});
