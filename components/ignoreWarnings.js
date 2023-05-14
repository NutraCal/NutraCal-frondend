import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'Require cycle:',
    'Found screens with the same name nested inside one another',
    ' VirtualizedLists should never be nested',
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
