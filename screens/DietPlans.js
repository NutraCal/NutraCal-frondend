import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import B1 from '../assets/images/breakfast1.svg'
import L1 from '../assets/images/lunch1.svg'
import D1 from '../assets/images/dinner1.svg'
import S1 from '../assets/images/snack1.svg'
import Forw from '../assets/forwardbtn.svg'



export default function AddRecipe() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is Diet Plans Screen
      </Text>
      <ScrollView horizontal={true} style={{marginBottom:20}}>
    
      <TouchableOpacity style={styles.box}>
        <Text style={styles.name1}>MO</Text>
        <Text style={styles.name2}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, {backgroundColor:"#91C788"}]}>
        <Text style={[styles.name1,{color:"white"}]}>TU</Text>
        <Text style={[styles.name2,{color:"white"}]}>6</Text>
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

      <View style={styles.section}>
        <View style={styles.subsection}>
        <Text style={styles.heading}>Breakfast</Text>
        <Text style={styles.desc}>230 calories</Text>
        </View>
        <View style={[styles.subsection,{ marginTop:10}]}>
        <B1 width={60} height={60}/>
        <View style={{width:150}}>
            <Text style={styles.name1}>Honey Pancake</Text>
            <Text style={styles.desc}>7:00 am</Text>
        </View>
        <TouchableOpacity>
        <Forw width={24} height={24} style={{marginLeft: 20}}/>
        </TouchableOpacity>
        </View>
      </View>

        <View style={styles.section}>
        <View style={styles.subsection}>
        <Text style={styles.heading}>Lunch</Text>
        <Text style={styles.desc}>500 calories</Text>
        </View>
        <View style={[styles.subsection,{ marginTop:10}]}>
        <L1 width={60} height={60}/>
        <View style={{width:150}}>
            <Text style={styles.name1}>Chicken Steak</Text>
            <Text style={styles.desc}>1:00 pm</Text>
        </View>
        <TouchableOpacity>
        <Forw width={24} height={24} style={{marginLeft: 20}}/>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.subsection}>
        <Text style={styles.heading}>Snacks</Text>
        <Text style={styles.desc}>50 calories</Text>
        </View>
        <View style={[styles.subsection,{ marginTop:10}]}>
        <S1 width={60} height={60}/>
        <View style={{width:150}}>
            <Text style={styles.name1}>Orange</Text>
            <Text style={styles.desc}>5:00 pm</Text>
        </View>
        <TouchableOpacity>
        <Forw width={24} height={24} style={{marginLeft: 20}}/>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.subsection}>
        <Text style={styles.heading}>Dinner</Text>
        <Text style={styles.desc}>120 calories</Text>
        </View>
        <View style={[styles.subsection,{ marginTop:10}]}>
        <D1 width={60} height={60}/>
        <View style={{width:150}}>
            <Text style={styles.name1}>Salad</Text>
            <Text style={styles.desc}>7:10 pm</Text>
        </View>
        <TouchableOpacity>
        <Forw width={24} height={24} style={{marginLeft: 20}}/>
        </TouchableOpacity>
        </View>
      </View>

     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent: 'center',
    padding: 8,
  },

  box:{
    height:71,
    width:45,
    borderRadius:12,
    marginHorizontal:5,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  },

  name1:{
    fontSize: 16,
    color: 'black',
    fontFamily:"Inter-Medium",
    marginTop:5,
  },

  name2:{
    fontSize: 14,
    color: 'black',
    fontFamily:"Inter-Regular",
    marginTop:5,
  },
  heading:{
    fontFamily:"Inter-Bold", 
    color:"black", 
    fontSize:18,
    marginTop:10,
    marginBottom:5,
    
  },

  desc:{
    fontSize: 14,
    color: '#7B6F72',
    fontFamily:"Inter-Light",
    marginTop:5,
  },

  section:{
    width:350, 
    marginBottom:20

  },
  subsection:{
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"space-between",

  },
});
