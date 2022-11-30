import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


export default function ApplyFilters() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category</Text>
      <View style={styles.flex1}>
        
      <TouchableOpacity style={[styles.btn1,{backgroundColor:"#91C788",borderColor:"#91C788", borderWidth: 1, } ]}>
      <Text style={[styles.txt,{color:"white"}]}>Breakfast</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Lunch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Dinner</Text>
      </TouchableOpacity>

      </View>
      <Text style={styles.heading}>Cuisine</Text>
      <View style={styles.flex1}>

     
      <TouchableOpacity style={[styles.btn1,{backgroundColor:"#91C788",borderColor:"#91C788", borderWidth: 1, } ]}>
      <Text style={[styles.txt,{color:"white"}]}>Asian</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Western</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Dessert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Salad</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.flex1}>
      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Chinese</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Burgers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn1}>
      <Text style={styles.txt}>Vegetarian</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Calories</Text>

      </View>
     

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
  },
  heading: {
    marginTop: 24,
    marginLeft:10,
    
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',

    color:"black",
  },

  btn1:{
    paddingHorizontal:15,
    paddingVertical:4,
    marginTop:15,
    borderRadius:20,
    backgroundColor:"#EAEAEA",
    borderColor:"#EAEAEA", 
    borderWidth: 1,
    marginLeft:10,

  },

  txt:{
    color:"black",
    fontFamily:"Inter-Medium",
    fontSize:16,

  },
  flex1:{
    flexDirection:"row",
  },
});
