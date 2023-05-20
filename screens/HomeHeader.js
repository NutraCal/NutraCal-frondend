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
import dim from '../util/dim';

const HomeHeader = ({route, navigation}) => {
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
            marginLeft: (50 / dim.w) * dim.Width,
          }}>
          Recipe Book
        </Text>
        <TouchableOpacity>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Icon
                name="menu"
                size={(30 / dim.w) * dim.Width}
                color="black"
                onPress={openMenu}
              />
            }>
            <Menu.Item
              onPress={() => {
                navigation.navigate('AddRecipe');
                closeMenu();
              }}
              title="Add Recipe"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('MyRecipes');
                closeMenu();
              }}
              title="My Recipes"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('SuggestRecipe');
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
