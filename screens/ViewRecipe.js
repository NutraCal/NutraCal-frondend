import * as React from 'react';
import { Text, View, StyleSheet, ScrollView,TouchableOpacity,TextInput } from 'react-native';
import Recipe1 from '../assets/images/recipe1.svg'
import Macro1 from '../assets/images/macro1.svg'
import Macro2 from '../assets/images/macro2.svg'
import Macro3 from '../assets/images/macro3.svg'
import Macro4 from '../assets/images/macro4.svg'
import Icon1 from '../assets/images/icon1.svg'
import Icon2 from '../assets/images/icon2.svg'
import Icon3 from '../assets/images/icon3.svg'
import Icon4 from '../assets/images/icon4.svg'
import Star from '../assets/images/star.svg'
import Dp1 from '../assets/images/dp1.svg'
import Dp2 from '../assets/images/dp2.svg'
import Dp3 from '../assets/images/dp3.svg'
import Reply from '../assets/images/reply.svg'
import Like from '../assets/images/like.svg'

export default function ViewRecipe({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Recipe1 width={200} height={200} style={{borderRadius:20}}/>
      <View >
      <Text style={styles.heading}>Blueberry Pancake</Text>
      <Text style={styles.name}>by James Ruth</Text>
      </View>

      <Text style={styles.heading}>Nutrition</Text>

      <ScrollView horizontal={true}>

      <View>
        <View>
        <View style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
        <View style={{marginRight:10}}>
        <Text style={styles.name}>180</Text>
        <Text style={styles.tag}>kCal</Text>
        </View>
        <Macro1 width={20} height={21}/>
        </View>
        </View>
      </View>

      <View>
        <View>
        <View style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
        <View style={{marginRight:10}}>
        <Text style={styles.name}>24</Text>
        <Text style={styles.tag}>fats</Text>
        </View>
        <Macro2 width={20} height={21}/>
        </View>
        </View>
      </View>

      <View>
        <View>
        <View style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
        <View style={{marginRight:10}}>
        <Text style={styles.name}>30</Text>
        <Text style={styles.tag}>proteins</Text>
        </View>
        <Macro3 width={20} height={21}/>
        </View>
        </View>
      </View>

      <View>
        <View>
        <View style={[styles.box, {backgroundColor:"#EBF2FF"}]}>
        <View style={{marginRight:10}}>
        <Text style={styles.name}>56</Text>
        <Text style={styles.tag}>carbs</Text>
        </View>
        <Macro4 width={20} height={21}/>
        </View>
        </View>
      </View>
      </ScrollView>

      <Text style={styles.heading}>Desciption</Text>
      <Text style={styles.desc}>Pancakes are some people's favorite breakfast, who doesn't like pancakes? Especially with the real honey splash on 
        top of the pancakes, of course everyone loves that! besides being lorem ipsum. </Text>

      <Text style={[styles.heading,{width:250}]}>Ingredients That You Will Need</Text>

      <ScrollView horizontal={true}>
    
        <View>
        <View style={styles.box1}>
        <Icon1 width={50} height={50}/>
        </View>
        <View style={{}}>
        <Text style={styles.name}>Wheat Flour</Text>
        <Text style={styles.tag}>100gr</Text>
        </View>
        </View>

        <View>
        <View style={styles.box1}>
        <Icon2 width={50} height={50}/>
        </View>
        <View style={{}}>
        <Text style={styles.name}>Sugar</Text>
        <Text style={styles.tag}>3 tbsp</Text>
        </View>
        </View>

        <View>
        <View style={styles.box1}>
        <Icon3 width={50} height={50}/>
        </View>
        <View style={{}}>
        <Text style={styles.name}>Baking Soda</Text>
        <Text style={styles.tag}>2 tsp</Text>
        </View>
        </View>

        <View>
        <View style={styles.box1}>
        <Icon4 width={50} height={50}/>
        </View>
        <View>
        <Text style={styles.name}>Eggs</Text>
        <Text style={styles.tag}>2 items</Text>
        </View>
        </View>
      </ScrollView>

    <TouchableOpacity style={{width:330, height:48, backgroundColor:"#91C788",alignSelf:"center", borderRadius:12, alignItems:"center", justifyContent:"center",marginTop:30, marginBottom:10}}>
    <Text style={{color:"white", fontSize:16, fontFamily:"Inter-SemiBold"}}>+ Add Ingredients</Text>
    </TouchableOpacity>

    <Text style={styles.heading}>Steps</Text>
     
    <Text style={styles.tag}>Prepare all of the ingredients that needed.</Text>
    <Text style={styles.tag}>Mix flour, sugar, salt, and baking powder.</Text>
    <Text style={styles.tag}>In a seperate place, mix the eggs and liquid milk until blended.</Text>
    <Text style={styles.tag}>Put the egg and milk mixture into the dry ingredients, Stir untul smooth and smooth.</Text>
    <Text style={styles.tag}>Prepare all of the ingredients that needed.</Text>


    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
    <Text style={styles.heading}>Rate & Review</Text>
    <View style={{flexDirection:"row",marginTop:10}}>
    <Star width={20} height={20} style={{marginLeft:5}}/>
    <Star width={20} height={20} style={{marginLeft:5}}/>
    <Star width={20} height={20} style={{marginLeft:5}}/>
    <Star width={20} height={20} style={{marginLeft:5}}/>
    <Star width={20} height={20} style={{marginLeft:5,marginRight:10}}/>
    </View>
    </View>

    <TextInput
      style={{ 
      marginTop:10,
    	borderColor: '#F8F9FE', 
      backgroundColor:"#F8F9FE",
    	borderWidth: 1,
      height:50,
      width:370,
      paddingHorizontal:15,
      borderRadius:20,
      fontFamily:"Inter-Regular",
      color:"black",
      fontSize:16,
    
    }}
	    placeholder="Leave a comment"
      placeholderTextColor="#8F9098"
    />
    

      <View style={{marginTop:10, flexDirection:"row"}}>
      <Dp1 width={50} height={50}/>
      <View style={{marginLeft:10}}>
      <Text style={styles.name}>Bessie Cooper</Text>
      <Text style={[styles.tag,{width:300}]}>I think you can tell a lot about a person by whether they use a shape</Text>
      <View style={{flexDirection:"row",marginTop:5, marginBottom:10}}>
      <Reply width={20} height={20}/>
      <Like width={20} height={20} style={{marginLeft:10}}/>
      </View>
      </View>
      </View>

      
      <View style={{marginTop:10, flexDirection:"row"}}>
      <Dp1 width={50} height={50}/>
      <View style={{marginLeft:10}}>
      <Text style={styles.name}>Bessie Cooper</Text>
      <Text style={[styles.tag,{width:300}]}>I think you can tell a lot about a person by whether they use a shape</Text>
      <View style={{flexDirection:"row",marginTop:5, marginBottom:10}}>
      <Reply width={20} height={20}/>
      <Like width={20} height={20} style={{marginLeft:10}}/>
      </View>
      </View>
      </View>

      
      <View style={{marginTop:10, flexDirection:"row"}}>
      <Dp1 width={50} height={50}/>
      <View style={{marginLeft:10}}>
      <Text style={styles.name}>Bessie Cooper</Text>
      <Text style={[styles.tag,{width:300}]}>I think you can tell a lot about a person by whether they use a shape</Text>
      <View style={{flexDirection:"row",marginTop:5, marginBottom:10}}>
      <Reply width={20} height={20}/>
      <Like width={20} height={20} style={{marginLeft:10}}/>
      </View>
      </View>
      </View>

      

      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding:8,
    justifyContent: 'center',
    marginBottom:10,
  },
  heading:{
    fontFamily:"Inter-Bold", 
    color:"black", 
    fontSize:20,
    marginTop:10,
    
  },
  box:{
    height:73,
    width:90,
    borderRadius:15,
    marginVertical:10,
    marginRight:10,
    flexDirection:"row",
    alignItems:"center",
    padding:10,
    justifyContent:"space-around",
  },

  box1:{
    height:100,
    width:100,
    backgroundColor:"#F7F8F8",
    borderRadius:15,
    marginVertical:10,
    marginRight:10,
    alignItems:"center",
    padding:10,
    justifyContent:"space-around",
  },


  name:{
    fontSize: 16,
    color: 'black',
    fontFamily:"Inter-Medium",
  },

  tag:{
    fontSize: 14,
    color: 'black',
    fontFamily:"Inter-Regular",
  },
  
  desc:{
    fontSize: 14,
    width:350,
    textAlign: 'justify',
    color: 'black',
    fontFamily:"Inter-Light",
  },
  
  

});
