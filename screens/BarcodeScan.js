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
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
//import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import dim from '../util/dim';

function BarcodeScan(): JSX.Element {
  const [val, setVal] = useState('');
  const [data, setData] = useState('');
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');
  const [path, setPath] = useState('');
  const [loading, setLoading] = useState(true);

  const onSuccessScan = e => {
    console.log(e.data);
    setVal(e.data);
    getData(e.data);
  };

  const getData = async res => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://www.foodrepo.org/api/v3/products?barcodes=20641627',
        headers: {
          Authorization: 'Token token=6a98f4d52076fe23e7510cb28ee01932',
          secret_key: '6a98f4d52076fe23e7510cb28ee01932',
          Cookie:
            '_food_repo_session=Q21Dx6F8zq3OKbLxR1nSSfX04kyLZ2qBOxuzu32dOymS6jqAsmDehjXt62ZlxN%2Fsshtd2l%2FJFFVMB%2Bt3iJcEG0KGdC0bA74aMr1XvWK3fuS%2FpD2oly0I71fInvIYm9DbRPV6ImYFNA7e2epRN%2BXi0MaMAnpZLbDQh9q3okSoI8Vh%2FnxoDBWftDyfpslfPdjSjb%2FUVB6YQoSWu5ya%2FeCZ9VC4tt5umm03yuYBZyZI5Kf%2Fxo9ZmD9wX8ltByZdm2Lofeg8VJCVtERr3IMx9cuHGNXChTnEkymB9TPU3re%2FljEOgw%3D%3D--PWS4KXXFoF1HoXVo--qSw6JIASjIrjjErXF88tMQ%3D%3D',
        },
      });

      console.log(JSON.stringify(response.data));

      const cal = JSON.stringify(
        response.data.data[0].nutrients.energy.per_portion,
      );
      const f = JSON.stringify(response.data.data[0].nutrients.fat.per_portion);
      const p = JSON.stringify(
        response.data.data[0].nutrients.protein.per_portion,
      );
      const carb = JSON.stringify(
        response.data.data[0].nutrients.carbohydrates.per_portion,
      );

      const u = response.data.data[0].images[1].large;
      console.log('printibg----------------------');
      console.log(response.data.data[0].images[1].large);
      console.log('printibg----------------------');
      console.log(u);

      setCalories(cal);
      setFats(f);
      setProteins(p);
      setCarbs(carb);
      setPath(u);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.sectionContainer}>
      <QRCodeScanner onRead={onSuccessScan} reactivate={true} />
      <Text
        style={{
          color: 'black',
          marginBottom: (20 / dim.h) * dim.Height,
          fontWeight: 'bold',
        }}>
        {val}
      </Text>
      <View style={{marginBottom: (20 / dim.h) * dim.Height}}>
        <Button title="Show Details" onPress={toggleModal} />
      </View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        // animationIn="bounceInUp"
        // animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />

            {loading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Image
                style={{
                  width: (300 / dim.w) * dim.Width,
                  height: (200 / dim.h) * dim.Height,
                  marginBottom: (30 / dim.h) * dim.Height,
                  marginTop: (10 / dim.h) * dim.Height,
                }}
                source={{uri: path}}
              />
            )}

            <Text style={styles.resultText}>Calories: {calories}</Text>
            <Text style={styles.resultText}>Fats: {fats}</Text>
            <Text style={styles.resultText}>Proteins: {proteins}</Text>
            <Text style={styles.resultText}>Carbs: {carbs}</Text>
          </View>
        </View>
      </Modal>
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
    marginTop: (8 / dim.h) * dim.Height,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    paddingTop: (12 / dim.h) * dim.Height,
    paddingHorizontal: (12 / dim.w) * dim.Width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: (400 / dim.h) * dim.Height,
    paddingBottom: (20 / dim.h) * dim.Height,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barIcon: {
    width: (60 / dim.w) * dim.Width,
    height: (5 / dim.h) * dim.Height,
    backgroundColor: '#bbb',
    borderRadius: 3,
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: (100 / dim.h) * dim.Height,
  },
  resultText: {
    fontSize: 16,
    marginTop: (10 / dim.h) * dim.Height,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
});

export default BarcodeScan;
