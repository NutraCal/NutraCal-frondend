import React, {useState} from 'react';
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  DefaultTheme,
  Button,
  Menu,
  Divider,
  Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeHeader = ({route, navigation, email}) => {
  console.log(email);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.flex}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Inter-Bold',
            fontSize: 20,
            alignSelf: 'center',
            marginLeft: 50,
          }}>
          Recipe Book
        </Text>
        <TouchableOpacity>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Icon name="menu" size={30} color="black" onPress={openMenu} />
            }>
            <Menu.Item
              onPress={() => {
                navigation.navigate('AddRecipe', {
                  email: email,
                });
                closeMenu();
              }}
              title="Add Recipe"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('MyRecipes', {
                  email: email,
                });
                closeMenu();
              }}
              title="My Recipes"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('SuggestRecipe', {
                  email: email,
                });
                closeMenu();
              }}
              title="Suggest Recipe"
            />
          </Menu>
        </TouchableOpacity>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
});

export default HomeHeader;
