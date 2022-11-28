import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView,TouchableOpacity} from 'react-native';
import { Searchbar,Button,Avatar } from 'react-native-paper';
import Sortic from '../assets/sorticon.svg'
import Arrowdown from '../assets/arrowdownicon.svg'
import Filter from '../assets/filtericon.svg'

export default function SearchRecipe() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
      placeholder="Recipes"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchbar}
    />
    <View style={styles.cont}> 

    <View style={styles.btn}>
    <Sortic width={20} height={20}/>
    <Text style={styles.label}>Sort</Text>
    <Arrowdown width={20} height={20}/>
    </View>

    <View style={styles.btn}>
    <Filter width={20} height={20}/>
    <Text style={styles.label}>Filter</Text>
    <Arrowdown width={20} height={20}/>
    </View>
    </View>
    <Text style={styles.heading}>Category</Text>

    <ScrollView horizontal={true} style={styles.scroll}>
    
    <TouchableOpacity style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
      <Avatar.Image size={50} source={require('../assets/images/pic1.jpg')}/>
      <Text style={styles.name}>Salad</Text>
    </TouchableOpacity>


    <TouchableOpacity style={[styles.box, {backgroundColor:"#F9EBF8"}]}>
    <Avatar.Image size={50} source={require('../assets/images/pic1.jpg')}/>
      <Text style={styles.name}>Cake</Text>
    </TouchableOpacity>


    <TouchableOpacity style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
    <Avatar.Image size={50} source={require('../assets/images/pic1.jpg')}/>
      <Text style={styles.name}>Pie</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.box, {backgroundColor:"#F9EBF8"}]}>
    <Avatar.Image size={50} source={require('../assets/images/pic1.jpg')}/>
      <Text style={styles.name}>Smoothie</Text>
    </TouchableOpacity>

    </ScrollView>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
  },
  searchbar:{
    borderRadius:20,
    margin: 15,
    elevation:0,
  },
  label:{
    fontSize:20,
    color:"black",
    fontFamily:"Inter-Regular"
    
  },
  icon:{
    width:15,
    height:15,
  },
  btn:{
   flexDirection:"row",
   justifyContent:"space-around",
   width:120,
   alignItems:'center',
   borderWidth: 1,
   paddingHorizontal:2,
   paddingVertical:6,
   borderColor:"#C5C6CC",
   borderRadius:9,
   marginVertical:8
  },

  cont:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:13,
    alignItems:'center',
  },

  heading:{
  fontFamily:"Inter-ExtraBold", 
  color:"black", 
  fontSize:20,
  marginTop:20,
  marginLeft:12,
},

box:{
  height:130,
  width:110,
  borderRadius:12,
  backgroundColor:"#D83360",
  margin:10,
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"space-around",


},

scroll:{
   flexDirection:"row",

},

name:{
  fontSize: 20,
  color: 'black',
  fontFamily:"Inter-Regular"
},

});
