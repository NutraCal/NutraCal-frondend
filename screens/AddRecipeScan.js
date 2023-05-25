import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';
import dim from '../util/dim';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import FormData from 'form-data';
import axios from 'axios';
import {endpoint} from '../util/config';
import {ScrollView} from 'react-native-gesture-handler';

export default function AddRecipeScan({route, navigation}) {
  const [step, setStep] = useState(1);
  const [directionsImage, setDirectionsImage] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState('');
  const [ingredientsImage, setIngredientsImage] = useState(null);
  const [ingredientsResponse, setIngredientsResponse] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [allergy, setAllergy] = useState('');

  const handleDirectionsImageSelect = async image => {
    const imagePath = image.path;
    console.log(imagePath.toString());
    setDirectionsImage(imagePath);
    console.log(directionsImage);
  };

  // const handleIngredientsImageSelect = image => {
  //   const imagePath = image.path;
  //   console.log(imagePath.toString());
  //   setIngredientsImage(imagePath);
  //   //make call to ocr
  // };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imagePickerCamera();
      }
    } catch (error) {
      console.warn('Camera permission request failed:', error);
    }
  };

  const imagePickerGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: (300 / dim.w) * dim.Width,
        height: (400 / dim.h) * dim.Height,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      console.log(image);
      setDirectionsImage(null);
      handleDirectionsImageSelect(image);
      // handleIngredientsImageSelect(image);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const imagePickerCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: (300 / dim.w) * dim.Width,
        height: (400 / dim.h) * dim.Height,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      console.log(image);
      setDirectionsImage(null);
      handleDirectionsImageSelect(image);
      // handleIngredientsImageSelect(image);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const ocr = async res => {
    const data = new FormData();
    data.append('photo', {
      uri: directionsImage,
      // uri: ingredientsImage,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    console.log(data);

    try {
      const response = await axios({
        method: 'post',
        maxContentLength: Infinity,
        url: endpoint + '/recipes/detectText',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      });
      console.log(JSON.stringify(response.data));
      setDirectionsResponse(response.data);
      // setIngredientsResponse(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {step === 1 && (
          <View>
            <View style={styles.header}>
              {/* <TouchableOpacity>
              <Ionicons name="chevron-back-sharp" size={25} color="#91C788" />
            </TouchableOpacity> */}
              <Text style={styles.heading}>Select Directions</Text>
              <TouchableOpacity onPress={handleNext}>
                <Text style={styles.nextbtn}>Next</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                getPermission();
              }}
              style={styles.imgc}>
              {directionsImage !== null && (
                <View>
                  <Image
                    source={{
                      uri: directionsImage,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                height: 50,
                alignItems: 'center',
                borderWidth: 1,
              }}
              onPress={ocr}>
              <Text style={styles.heading}>Get Directions</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.txtinput}
              value={directionsResponse}
              onChangeText={setDirectionsResponse}
              multiline={true}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddRecipe', {content: directionsResponse});
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
                Send back
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* {step === 2 && (
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="chevron-back-sharp" size={25} color="#91C788" />
              </TouchableOpacity>
              <Text style={styles.heading}>Select Ingredients</Text>
              <TouchableOpacity onPress={handleNext}>
                <Text style={styles.nextbtn}>Next</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                getPermission();
              }}
              style={styles.imgc}>
              {ingredientsImage !== null && (
                <View>
                  <Image
                    source={{
                      uri: ingredientsImage,
                    }}
                    style={styles.image}
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: 'red', height: 50}}
              onPress={ocr}>
              <Text>heheheheheh</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: (8 / dim.h) * dim.Height,
    paddingBottom: 0,
    // backgroundColor: 'blue',
  },

  header: {
    flexDirection: 'row',
    width: dim.Width,
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: (55 / dim.h) * dim.Height,
  },

  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: (10 / dim.h) * dim.Height,
    marginBottom: (8 / dim.h) * dim.Height,
  },
  nextbtn: {
    color: '#91C788',
    fontSize: 16,
    marginRight: (10 / dim.w) * dim.Width,
    fontWeight: 'bold',
  },
  txtinput: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (200 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
    alignSelf: 'center',
  },
  imgc: {
    // backgroundColor: 'black',
    width: dim.Width,
    height: (650 / dim.h) * dim.Height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#91C788',
  },

  image: {
    width: dim.Width,
    height: (500 / dim.h) * dim.Height,
  },
});
