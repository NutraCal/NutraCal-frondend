import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../components/RangeSlider';
import Ing1 from '../assets/images/ing1.svg'
import Ing2 from '../assets/images/ing2.svg'



export default function ApplyFilters() {
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 2500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const [textInputValue, setTextInputValue] = useState('');
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',padding:20, justifyContent:'center'}}>
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
      <GestureHandlerRootView style={{marginTop:20}}>
      <RangeSlider
              sliderWidth={340}
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

      <Text style={styles.heading}>Ingredients</Text>

      <View style={styles.textinputc}>
      <TextInput style={[styles.txtinput,{width:320}]} placeholder="Type and add your ingredients" placeholderTextColor="#C5C6CC"/>
      <TouchableOpacity style={styles.cbtn}>
      <Text style={{fontSize:20, color:"white"}}>+</Text>
      </TouchableOpacity>
      </View>

      
      <View style={[styles.box3, {backgroundColor:"#EBF2FF"}]}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <Ing1 width={40} height={39} style={{marginRight: 20}}/>
      <Text style={styles.name}>Sugar</Text>
      </View>
      <TouchableOpacity style={[styles.cbtn,{marginLeft:50, elevation:2,backgroundColor:"white"}]}>
      <Text style={{fontSize:20, color:"#91C788",alignSelf:"center"}}>-</Text>
      </TouchableOpacity>
      </View>


      <View style={[styles.box3, {backgroundColor:"#F9EBF8"}]}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <Ing2 width={40} height={39} style={{marginRight: 20}}/>
      <Text style={styles.name}>Baking Soda</Text>
      </View>
      <TouchableOpacity style={[styles.cbtn,{marginLeft:50, elevation:2,backgroundColor:"white"}]}>
      <Text style={{fontSize:20, color:"#91C788",alignSelf:"center"}}>-</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={{width:330, height:48, backgroundColor:"#91C788",alignSelf:"center", borderRadius:12, alignItems:"center", justifyContent:"center",marginTop:40, marginBottom:20}}>
      <Text style={{color:"white", fontSize:16, fontFamily:"Inter-SemiBold"}}>Save Recipe</Text>
      </TouchableOpacity>
   

  
 
      </View>
      </View>
     

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical:5,
    flex:1,
  },
  heading: {
    marginTop: 24,
    marginLeft:10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color:"black",
    alignSelf:'flex-start'
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
    alignSelf:'flex-start',
  },

  contentContainer: {
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
  },


  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  tableContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  
  },
  table: {
    borderColor: '#EBECF2',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  
  box:{flexDirection:"column",
},

  label:{
  color:"#999999",
  fontFamily:"Inter-Medium",
  fontSize:12,
},


labelc:
{
 flexDirection:"row", 
 width:350, 
 justifyContent:"space-between",
 alignItems:"center",

 marginTop: 10},



txtinput:{ 
  borderColor: '#E1E3E8', 
  borderWidth: 1,
  height: 48,
  width:350,
  paddingHorizontal:15,
  borderRadius:10,
  fontFamily:"Inter-Regular",
  color:"black",
  fontSize:16,
  marginBottom:5,
  

},

textinputc:
{
  flexDirection:"row",
  alignItems:"center", 
  justifyContent:"center", 
  marginTop:10,
  marginBottom:10,
  width:350,
},

box3:{
  height:55, 
  width: 360,
  borderRadius:12,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",   
  marginVertical:10,


},

cbtn:{
  width:30,
  height:30, 
  backgroundColor:"#91C788",
  borderRadius:20, 
  alignItems:"center", 
  justifyContent:"center",
  marginLeft:10,
},

name:{
  fontSize: 16,
  color: 'black',
  fontFamily:"Inter-Medium",
  marginTop:5,
  width:180,
},


});
