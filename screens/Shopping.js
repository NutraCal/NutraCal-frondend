import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import Ing1 from '../assets/images/ing1.svg'
import Ing2 from '../assets/images/ing2.svg'




export default function Shopping() {
  return (
    <View style={styles.container}>
      
      <ScrollView>
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


      </ScrollView>
 



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
    alignItems:'center',
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
    justifyContent:"space-between", 
    marginTop:10,
    marginBottom:10,
    width:350,
  },

  box3:{
    height:70, 
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
