import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
//import {RNCamera} from 'react-native-camera';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string,
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
}

function BarcodeScan(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [val, setVal] = useState('');
  const [data, setData] = useState('');

  const onSuccessScan = e => {
    console.log(e.data);
    setVal(e.data);
    getData(e.data);
  };

  const getData = data => {
    
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Token token=6a98f4d52076fe23e7510cb28ee01932',
    );
    myHeaders.append('secret_key', '6a98f4d52076fe23e7510cb28ee01932');
    myHeaders.append(
      'Cookie',
      '_food_repo_session=79i0zINH02hRCIlYLkjg4a9HXraKCKBg%2BSt5zZBUF7wQ4WbURM1F8jLOewSWg2RdIpoT5COaOwPbbmQBWA0XMv%2FHUePe%2BbNa2bosYjEiHHTOkKz13efUZPRMCx%2BDxw%2FYgn6Dbgoy7Hoqe%2BuzIf4gS7aECUmysXso%2FaAM4r01IqD6oG15gKZblaBGW2dR7C5Yvf5nSS78EDn0iDjVdyM%2FFTRd1%2BIfh5ZCm6dcS%2Fta58C6pnmrCl9lv3lVJ%2FM%2FqDjteasKd2NmSo%2FjDiXmN5eYVdL%2BgH%2Bam0FVdxqI4Ta0oIZLif7Qstu%2F%2FBsy--zKO4z3I7LZYe%2F78h--tfYaKH%2FuDnmyJThRWMjGAA%3D%3D',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://www.foodrepo.org/api/v3/products?barcodes=' + data,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.sectionContainer}>
      <QRCodeScanner onRead={onSuccessScan} reactivate={true} />
      <Text style={{color:"black", marginBottom:20, fontWeight:'bold'}}>{val}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default BarcodeScan;
