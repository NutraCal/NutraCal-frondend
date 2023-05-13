import {useContext} from 'react';

// import {LogBox} from 'react-native';
// // Ignore log notification by message:
// LogBox.ignoreLogs(['Warning: ...']);
// // Ignore all log notifications:
// LogBox.ignoreAllLogs();

import './components/ignoreWarnings';
import {StyleSheet} from 'react-native';

import {AuthProvider} from './context/AuthContext';

import MainNavigator from './MainNavigator';

export default function App() {
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
