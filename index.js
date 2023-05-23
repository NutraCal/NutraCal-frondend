/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {EventEmitter} from 'eventemitter3';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidImportance,
  TriggerType,
  Trigger,
} from '@notifee/react-native';

export const eventEmitter = new EventEmitter();

const onMessageReceived = async message => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification(JSON.parse(message.data.notifee));
};

messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().onMessage(onMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
