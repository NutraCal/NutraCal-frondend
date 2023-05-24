import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import dim from '../util/dim';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import axios from 'axios';
import {endpoint} from '../util/config';

export default function RecipeApproval({route, navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('approved');
  const [approvedrecipes, setApprovedRecipes] = useState([]);
  const [unapprovedrecipes, setUnapprovedRecipes] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  const handleToggle = value => {
    setActiveView(value);
  };

  const getApprovedRecipes = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/recipes/viewRecipes',
        headers: {},
      });

      console.log(JSON.stringify(response.data));
      setApprovedRecipes(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUnapprovedRecipes = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: endpoint + '/recipes/viewAllUnapproved',
        headers: {},
      });

      console.log(JSON.stringify(response.data));
      setUnapprovedRecipes(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const ApprovedRecipeView = () => (
    <View>
      {approvedrecipes.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box3}
          onPress={() => {
            console.log(item.Title);
            navigation.navigate('ViewRecipe', {title: item.Title});
          }}>
          <Image
            source={{
              uri: endpoint + '/' + item.Image.filename,
            }}
            style={[styles.thumbnail, {marginRight: 20}]}
          />
          <View style={{width: 220}}>
            <Text style={styles.name}>{item.Title}</Text>
            <Text style={styles.desc}>Recipe</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const UnapprovedRecipeView = () => (
    <View>
      {unapprovedrecipes.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box3}
          onPress={() => {
            console.log(item.Title);
            navigation.navigate('ViewBlog', {title: item.Title});
          }}>
          <Image
            source={{
              uri: endpoint + '/' + item.Image.filename,
            }}
            style={[styles.thumbnail, {marginRight: 20}]}
          />
          <View style={{width: 220}}>
            <Text style={styles.name}>{item.Title}</Text>
            <Text style={styles.desc}>Blog</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  useEffect(() => {
    getApprovedRecipes();
    getUnapprovedRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Searchbar
            placeholder="Search here"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}

            // onClearIconPress={() => {
            //   if (activeView === 'nutritionist') {
            //     console.log('-----------------------ugh');
            //     // getNutritionists();
            //   } else {
            //     getBlogs();
            //   }
            // }}
          />
          <DuoToggleSwitch
            primaryText="Approved"
            secondaryText="Unapproved"
            onPrimaryPress={() => {
              setSearchQuery('');
              handleToggle('approved');
            }}
            onSecondaryPress={() => {
              setSearchQuery('');
              handleToggle('unapproved');
            }}
            activeColor="#91C788"
            inactiveColor="#DCEDDA"
            activeTextColor="white"
            inactiveTextColor="#91C788"
            primaryTextStyle={{fontSize: 16}}
            secondaryTextStyle={{fontSize: 16}}
            primaryButtonStyle={{width: 180, height: 50}}
            secondaryButtonStyle={{width: 180, height: 50}}
            style={{width: 300, borderRadius: 0}}
          />

          {activeView === 'approved' ? (
            <ApprovedRecipeView />
          ) : (
            <UnapprovedRecipeView />
          )}
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
  thumbnail: {
    width: (50 / dim.w) * dim.Width,
    height: (50 / dim.w) * dim.Width,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    borderColor: '#91C788',
    borderWidth: 1,
  },
});
