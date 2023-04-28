import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import dim from '../util/dim';

export default function AddMealScan({route, navigation}) {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [image, setImage] = useState(null);
  const [bimage, setBimage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState('');

  const sendImage = async res => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/food-images-2lpjg/1?api_key=UseQF6hQTjckzORCc7BI',
        data: res,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data);
      setResult(response.data.predictions[0].class);
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log('hehe');
    }
  };

  const getNutrition = async res => {
    try {
      const response = await axios({
        method: 'get',
        url:
          'https://api.edamam.com/api/food-database/v2/parser?app_id=8490cf74&app_key=11244cd3578f50387d9cfc0579c84d42&ingr=' +
          result +
          '&nutrition-type=logging',
        headers: {
          Cookie: 'route=7c8acdbf037ebcb8c809cab94d5a241c',
        },
      });

      console.log(JSON.stringify(response.data));

      const cal = response.data.parsed[0].food.nutrients.ENERC_KCAL;
      const f = response.data.parsed[0].food.nutrients.FAT;
      const p = response.data.parsed[0].food.nutrients.PROCNT;
      const carb = response.data.parsed[0].food.nutrients.CHOCDF;

      setCalories(cal.toFixed(2));
      setFats(f.toFixed(2));
      setProteins(p.toFixed(2));
      setCarbs(carb.toFixed(2));
    } catch (error) {
      console.log(error.response);
    }
  };

  const convertBinary = async response => {
    console.log('img', image);
    const res = await RNFS.readFile(response.assets[0].uri, 'base64');
    setBimage(res);
    console.log('bimage', bimage);
    sendImage(res);
  };

  const selectImage = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
        convertBinary(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={() => selectImage()} />
      {image && (
        <Image source={{uri: image.assets[0].uri}} style={styles.image} />
      )}
      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <Text style={styles.result}>{result}</Text>
      )}

      <TouchableOpacity
        onPress={getNutrition}
        style={{
          width: (330 / dim.w) * dim.Width,
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
          Get Info
        </Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Calories: {calories}</Text>
      <Text style={styles.resultText}>Fats: {fats}</Text>
      <Text style={styles.resultText}>Proteins: {proteins}</Text>
      <Text style={styles.resultText}>Carbs: {carbs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: (300 / dim.w) * dim.Width,
    height: (300 / dim.h) * dim.Height,
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: (20 / dim.h) * dim.Height,
    color: 'black',
  },
  resultText: {
    fontSize: 16,
    marginTop: (10 / dim.h) * dim.Height,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
});
