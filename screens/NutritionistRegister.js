import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import dim from '../util/dim';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';
import {width} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const NutritionistRegister = () => {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [mod, setMod] = useState('');
  const [qua, setQua] = useState('');
  const [exp, setExp] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const [name, setName] = useState('');

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [qualification, setQualification] = useState([
    {label: 'Registered Dietitian (RD)', value: 'Registered Dietitian (RD)'},
    {
      label: 'Certified Nutritionist (CN)',
      value: 'Certified Nutritionist (CN)',
    },
    {
      label: 'Certified Health Coach (CHC)',
      value: 'Certified Health Coach (CHC)',
    },
    {
      label: 'Certified Sports Nutritionist (CSN)',
      value: 'Certified Sports Nutritionist (CSN)',
    },
    {
      label: 'Certified Nutritional Therapist (CNT)',
      value: 'Certified Nutritional Therapist (CNT)',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]);

  const [expertise, setExpertise] = useState([
    {label: 'Clinical Nutrition', value: 'Clinical Nutrition'},
    {
      label: 'Sports Nutrition',
      value: 'Sports Nutrition',
    },
    {
      label: 'Weight Management',
      value: 'Weight Management',
    },
    {
      label: 'Pediatric Nutrition',
      value: 'Pediatric Nutrition',
    },
    {
      label: 'Eating Disorders',
      value: 'Eating Disorders',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]);

  const [startDay, setStartDay] = useState([
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
    {label: 'Sunday', value: 'Sunday'},
  ]);

  const [endDay, setEndDay] = useState([
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
    {label: 'Sunday', value: 'Sunday'},
  ]);

  const handleChoosePhoto = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleTimeChange = time => {
    if (mod == 'start') {
      setStartTime(time);
    } else if (mod == 'end') {
      setEndTime(time);
    }
    setModalVisible(false);
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.MainDiv}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            {image ? (
              <Image source={{uri: image.assets[0].uri}} style={styles.img} />
            ) : (
              <View style={styles.imgView}>
                <Text style={{color: '#FFFFFF', fontSize: 40}}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#8F9098"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>

          <View style={[styles.fieldContainer, {}]}>
            <Text style={styles.label}>Qualification:</Text>
            <DropDownPicker
              style={[styles.ddlong, {}]}
              containerStyle={{
                width: (350 / dim.w) * dim.Width,
              }}
              textStyle={{
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                height: 120,
              }}
              zIndex={3000}
              zIndexInverse={1000}
              open={open3}
              value={value3}
              items={qualification}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setQualification}
              dropDownDirection="BOTTOM"
              placeholder="Select Qualification"
            />
          </View>

          {value3 == 'Other' && (
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#8F9098"
                value={qua}
                onChangeText={text => setQua(text)}
              />
            </View>
          )}

          <View style={[styles.fieldContainer, {}]}>
            <Text style={styles.label}>Area of Expertise:</Text>
            <DropDownPicker
              style={[styles.ddlong, {}]}
              containerStyle={{
                width: (350 / dim.w) * dim.Width,
              }}
              textStyle={{
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                height: 120,
              }}
              zIndex={2000}
              zIndexInverse={2000}
              open={open4}
              value={value4}
              items={expertise}
              setOpen={setOpen4}
              setValue={setValue4}
              setItems={setExpertise}
              dropDownDirection="BOTTOM"
              placeholder="Select Area of Expertise"
            />
          </View>

          {value4 == 'Other' && (
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#8F9098"
                value={exp}
                onChangeText={text => setExp(text)}
              />
            </View>
          )}

          <Text
            style={[
              styles.label,
              {
                marginTop: 10,
                width: (350 / dim.w) * dim.Width,
                marginBottom: 20,
              },
            ]}>
            Set your Availability
          </Text>

          <View
            style={[
              styles.fieldContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (350 / dim.w) * dim.Width,
                marginBottom: 30,
              },
            ]}>
            <View style={[styles.fieldContainer, {}]}>
              <Text style={styles.label}>Start Day:</Text>
              <DropDownPicker
                style={styles.ddpicker}
                containerStyle={{
                  width: (170 / dim.w) * dim.Width,
                }}
                textStyle={{
                  fontSize: 16,
                }}
                dropDownContainerStyle={{
                  height: 120,
                }}
                zIndex={1000}
                zIndexInverse={3000}
                open={open}
                value={value}
                items={startDay}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setStartDay}
                dropDownDirection="BOTTOM"
                placeholder="Select day"
              />
            </View>
            <View style={[styles.fieldContainer, {}]}>
              <Text style={styles.label}>End Day:</Text>

              <DropDownPicker
                style={styles.ddpicker}
                containerStyle={{
                  width: (170 / dim.w) * dim.Width,
                }}
                textStyle={{
                  fontSize: 16,
                }}
                dropDownContainerStyle={{
                  height: 120,
                }}
                zIndex={1000}
                zIndexInverse={3000}
                open={open2}
                value={value2}
                items={endDay}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setEndDay}
                dropDownDirection="BOTTOM"
                placeholder="Select day"
              />
            </View>
          </View>
          <View
            style={[
              styles.fieldContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (350 / dim.w) * dim.Width,
              },
            ]}>
            <View style={[styles.fieldContainer, {}]}>
              <Text style={styles.label}>Start Time:</Text>
              <TouchableOpacity
                onPress={() => {
                  setMod('start');
                  setModalVisible(true);
                }}
                style={styles.to}>
                {startTime !== '' && (
                  <Text style={styles.input2}>{startTime}</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={[styles.fieldContainer, {}]}>
              <Text style={styles.label}>End Time:</Text>
              <TouchableOpacity
                onPress={() => {
                  setMod('end');
                  setModalVisible(true);
                }}
                style={styles.to}>
                {endTime !== '' && <Text style={styles.input2}>{endTime}</Text>}
              </TouchableOpacity>
            </View>
          </View>

          <Modal isVisible={isModalVisible}>
            <View>
              <DatePicker
                mode="time"
                onTimeChange={handleTimeChange}
                options={{
                  textHeaderColor: '#333333',
                  textDefaultColor: '#333333',
                  mainColor: '#91C788',
                  textSecondaryColor: '#D6C7A1',
                }}
                style={{borderRadius: 10}}
              />
            </View>
          </Modal>
          <TouchableOpacity style={styles.nextbtn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainDiv: {
    marginTop: (20 / dim.h) * dim.Height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: (120 / dim.w) * dim.Width,
    height: (120 / dim.h) * dim.Height,
    borderRadius: 100,
  },
  imgView: {
    width: (120 / dim.w) * dim.Width,
    height: (120 / dim.h) * dim.Height,
    borderRadius: 100,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
    marginBottom: (5 / dim.h) * dim.Height,
  },

  input: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    width: (350 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: (10 / dim.h) * dim.Height,
  },
  ddlong: {
    width: (350 / dim.w) * dim.Width,
    borderWidth: 1,
    height: (20 / dim.h) * dim.Height,
    borderColor: '#E1E3E8',
    marginBottom: (30 / dim.h) * dim.Height,
  },

  ddpicker: {
    width: (170 / dim.w) * dim.Width,
    borderWidth: 1,
    height: (20 / dim.h) * dim.Height,
    borderColor: '#E1E3E8',
  },
  input2: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: (15 / dim.w) * dim.Width,
  },

  to: {
    width: (170 / dim.w) * dim.Width,
    borderWidth: 1,
    height: (48 / dim.h) * dim.Height,
    borderColor: '#E1E3E8',
    borderRadius: 10,
    justifyContent: 'center',
  },
  nextbtn: {
    width: (330 / dim.w) * dim.Width,
    height: (48 / dim.h) * dim.Height,
    backgroundColor: '#91C788',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (20 / dim.h) * dim.Height,
    marginBottom: (20 / dim.h) * dim.Height,
  },
});

export default NutritionistRegister;
