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
    setCalories('');
    setFats('');
    setProteins('');
    setCarbs('');
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/nutracal-food-detection/1?api_key=UseQF6hQTjckzORCc7BI',
        data: res,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data);
      if (response.data.predictions.length > 0) {
        setResult(response.data.predictions[0].class);
        console.log(result);
      } else {
        setResult('Meal not recognized');
      }
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

      let cal, f, p, carb; // Declare variables outside if-else blocks

      if (response.data.parsed.length > 0) {
        cal = response.data.parsed[0].food.nutrients.ENERC_KCAL;
        f = response.data.parsed[0].food.nutrients.FAT;
        p = response.data.parsed[0].food.nutrients.PROCNT;
        carb = response.data.parsed[0].food.nutrients.CHOCDF;
      } else if (response.data.hints.length > 0) {
        cal = response.data.hints[0].food.nutrients.ENERC_KCAL;
        f = response.data.hints[0].food.nutrients.FAT;
        p = response.data.hints[0].food.nutrients.PROCNT;
        carb = response.data.hints[0].food.nutrients.CHOCDF;
        console.log(cal, f, p, carb);
      }
      if (
        cal !== undefined &&
        f !== undefined &&
        p !== undefined &&
        carb !== undefined
      ) {
        setCalories(cal.toFixed(2));
        setFats(f.toFixed(2));
        setProteins(p.toFixed(2));
        setCarbs(carb.toFixed(2));
      } else {
        alert('meal not recognized, retry or try manual logging instead');
      }
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
        <View style={styles.nutrients}>
          <Text style={styles.result}>{result}</Text>
          {result != 'Meal not recognized' && result.length > 0 && (
            <View style={styles.nutrients}>
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

              {/* 
              const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState('');
  const [fats, setFats] = useState('');
  const [proteins, setProteins] = useState('');
  const [carbs, setCarbs] = useState(''); */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddMeal', {
                    na: result,
                    ca: calories,
                    fa: fats,
                    car: carbs,
                    pro: proteins,
                  });
                }}
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
                  Go back
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
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
  nutrients: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
