import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Cover from '../assets/images/recipecover.svg'
import Ing1 from '../assets/images/ing1.svg'
import Ing2 from '../assets/images/ing2.svg'



export default function AddRecipe({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView >
      
      <View style={styles.container2}>
      <Cover width={90} height={150} />

      <View style={{alignItems:'flex-start',padding:10, justifyContent:'center'}}>
      <Text style={styles.heading}>Recipe Name</Text>
      <TextInput style={styles.txtinput} placeholder="Enter Recipe name" placeholderTextColor="#8F9098"/>
      <Text style={styles.heading}>Author</Text>
      <TextInput style={styles.txtinput} placeholder="Enter your name" placeholderTextColor="#8F9098"/>
      <Text style={styles.heading}>Desciption</Text>
      <TextInput style={[styles.txtinput,{height:142,textAlignVertical : "top",}]} placeholder="Type something here" placeholderTextColor="#8F9098"/>
      <Text style={styles.heading}>Nutrition</Text>
      <TextInput style={[styles.txtinput,{marginBottom:10}]} placeholder="Calories" placeholderTextColor="#8F9098"/>
      <TextInput style={[styles.txtinput,{marginBottom:10}]} placeholder="Fats" placeholderTextColor="#8F9098"/>
      <TextInput style={[styles.txtinput,{marginBottom:10}]} placeholder="Proteins" placeholderTextColor="#8F9098"/>
      <TextInput style={[styles.txtinput,{marginBottom:10}]} placeholder="Carbs" placeholderTextColor="#8F9098"/>
      <Text style={styles.heading}>Ingredients</Text>

      <View style={styles.textinputc}>
      <TextInput style={[styles.txtinput,{width:300}]} placeholder="Type and add your ingredients" placeholderTextColor="#C5C6CC"/>
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

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent: 'center',
    padding: 8,
    paddingTop:20,
  },

  container2:{
    alignItems:"center",
    justifyContent:'center',

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
  },
  heading:{
    fontFamily:"Inter-Bold", 
    color:"black", 
    fontSize:18,
    marginTop:10,
    marginBottom:8,
    
  },

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
    width: 350,
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
