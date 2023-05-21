import {React, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from '../context/AuthContext';
import dim from '../util/dim';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#91C788'}}>
        <ImageBackground
          style={{
            padding: 20,
            backgroundColor: '#91C788',
            height: (150 / dim.h) * dim.Height,
          }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{
              width: (205 / dim.w) * dim.Width,
              height: (37 / dim.w) * dim.Width,
              alignSelf: 'baseline',
              marginTop: 30,
              // backgroundColor: 'red',
            }}
          />
          {/* <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontFamily: 'Inter-Bold',
              marginBottom: 5,
              alignSelf: 'baseline',
            }}>
            NutraCal
          </Text> */}
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={async () => {
            await logout();
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
