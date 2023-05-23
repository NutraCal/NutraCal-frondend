import {useContext, useEffect} from 'react';
import './components/ignoreWarnings';
import {StyleSheet} from 'react-native';
import deviceStorage from './util/deviceStorage';
import {AuthProvider} from './context/AuthContext';
import MainNavigator from './MainNavigator';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const registerDeviceForMessaging = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('Token', token);
  await deviceStorage.saveItem('FCMToken', token);
  console.log('FCM Token: ', token);
};
const onBackgroundMessage = () => {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    await notifee.cancelNotification(notification.id);
  });
};
export default function App() {
  useEffect(() => {
    registerDeviceForMessaging();
    onBackgroundMessage();
  }, []);
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
