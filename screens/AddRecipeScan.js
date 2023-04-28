import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
  Image,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import dim from '../util/dim';

const AddRecipeScan = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      const result1 = await TextRecognition.recognize(result.assets[0].uri);
      setText(result1);
    }
  };

  const selectImage = () => {
    launchImageLibrary({}, setImage);
    (async () => {
      if (image) {
        const result1 = await TextRecognition.recognize(image.assets[0].uri);
        setText(result1);
      }
    })();
  };

  useEffect(() => {});

  const imagePick = () => {
    ImagePicker.openPicker({
      width: (300 / dim.w) * dim.Width,
      height: (400 / dim.h) * dim.Height,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  // const storeData = () => {
  //   fetch('http://10.0.2.2:3000/abc', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: 'yourValue',
  //       regNo: 'yourOtherValue',
  //     }),
  //   });
  // };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 25,
          margin: (10 / dim.h) * dim.Height,
          fontWeight: 'bold',
        }}>
        Optical Character Recognition
      </Text>
      <TouchableOpacity
        style={{
          height: (60 / dim.h) * dim.Height,
          margin: (10 / dim.h) * dim.Height,
          backgroundColor: 'red',
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
        }}
        onPress={openCamera}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            margin: (10 / dim.h) * dim.Height,
            fontWeight: 'bold',
          }}>
          Select from Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: (60 / dim.h) * dim.Height,
          margin: (10 / dim.h) * dim.Height,
          backgroundColor: 'purple',
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
        }}
        onPress={selectImage}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            margin: (10 / dim.h) * dim.Height,
            fontWeight: 'bold',
          }}>
          Select from Gallery
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'yellow',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        Result
      </Text>
      <Text
        style={{
          color: 'yellow',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        ____________________
      </Text>
      <Text
        style={{
          color: 'black',
          margin: (10 / dim.h) * dim.Height,
          fontSize: 18,
          fontWeight: 'bold',
          width: (350 / dim.w) * dim.Width,
          textAlign: 'justify',
        }}>
        {text}
      </Text>
      {/* <TouchableOpacity onPress={()=>{
        imagePick();
      }}>
        <Text style={{color:'black'}}>Open me</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AddRecipeScan;
