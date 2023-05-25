import React, {useEffect} from 'react';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dim from '../util/dim';

export default function CallHome(props) {
  const navigation = useNavigation();

  const onJoinPress = (userID, userName) => {
    navigation.navigate('Call', {
      userID: userID,
      userName: userName,
    });
  };
  return (
    <View style={styles.container}>
      <View style={{height: 100}}>
        <TouchableOpacity
          onPress={() => {
            onJoinPress('oliver', 'Oliver');
          }}
          style={{
            width: (250 / dim.w) * dim.Width,
            height: (48 / dim.h) * dim.Height,
            backgroundColor: '#91C788',
            alignSelf: 'center',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: (20 / dim.h) * dim.Height,
            marginBottom: (20 / dim.h) * dim.Height,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Inter-SemiBold',
            }}>
            Join As Nutritionist
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Button
        title="Join As Oliver"
        onPress={() => {
          onJoinPress('oliver', 'Oliver');
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          onJoinPress('jack', 'Jack');
        }}
        style={{
          width: (250 / dim.w) * dim.Width,
          height: (48 / dim.h) * dim.Height,
          backgroundColor: '#91C788',
          alignSelf: 'center',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: (20 / dim.h) * dim.Height,
          marginBottom: (20 / dim.h) * dim.Height,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Inter-SemiBold',
          }}>
          Join As User
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
