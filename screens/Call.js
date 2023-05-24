import React, {useEffect, useState, useContext} from 'react';
import {useId} from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import dim from '../util/dim';
import axios from 'axios';
import {endpoint} from '../util/config';
import {AuthContext} from '../context/AuthContext';

export default function Call({route, navigation}) {
  // const {route} = props;
  // const {params} = route;
  // const {userID, userName} = params;

  const {user} = useContext(AuthContext);
  const email = user?.data?.user?.email;
  const userID = user?.data?.user?._id;
  const userName = user?.data?.user?.name;

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={1202820215}
        appSign="fdf547846cc2b378236f6f5b644cc2a19da0c2aa8f98f347e55bb344c3f87e3d"
        userID={userID}
        userName={userName}
        callID="rn12345678"
        config={{
          // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onHangUp: () => {
            props.navigation.navigate('HomePage');
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});
