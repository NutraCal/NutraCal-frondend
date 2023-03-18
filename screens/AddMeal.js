import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';

export default function AddMeal() {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [image, setImage] = useState(null);
  const [bimage, setBimage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
});
