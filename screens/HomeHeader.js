import React,{useState} from 'react';
import {BackHandler,View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DefaultTheme, Button, Menu, Divider, Provider } from 'react-native-paper';

const HomeHeader = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <Provider theme={DefaultTheme} style={styles.prov}>
    <View style={styles.flex}>
      <View style={[styles.flex]}>
        <Text style={{color:'black'}}>
          Recipe Book
        </Text>
      </View>
      <TouchableOpacity>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {
            
            navigation.navigate("AddRecipe");
            closeMenu();
            
          }} title="Add Recipe" />
          <Divider />
          <Menu.Item onPress={() => {
            
            navigation.navigate("MyRecipes");
            closeMenu();
            
          }} title="My Recipes" />

        </Menu>
   
      </TouchableOpacity>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeHeader;