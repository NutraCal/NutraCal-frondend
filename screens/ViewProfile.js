import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewProfile = () => {
  const [email, setEmail] = useState('mahrukh@gmail.com');
  const [password, setPassword] = useState('hheheheheh');
  const [hidePassword, setHidePassword] = useState(true);
  const [gender, setGender] = useState('Female');
  const [age, setAge] = useState('23');

  const [editProfile, IsEditableProfile] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [edit, IsEditable] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const [heightUnit, setHeightUnit] = useState([
    {label: 'cm', value: 'cm'},
    {label: 'ft', value: 'ft'},
  ]);
  const [weightUnit, setWeightUnit] = useState([
    {label: 'kg', value: 'kg'},
    {label: 'lbs', value: 'lbs'},
  ]);

  const [fitnessGoal, setFitnessGoal] = useState([
    {label: 'Weight Loss', value: 'Weight Loss'},
    {label: 'Weight Gain', value: 'Weight Gain'},
    {label: 'Maintain Weight', value: 'Maintain Weight'},
  ]);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    setIsDisabled(!editProfile);
    IsEditable(editProfile);
  }, [editProfile]);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#8F9098"
          value={email}
          editable={edit}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password:</Text>
        <View
          style={[
            styles.input,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <TextInput
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={text => setPassword(text)}
            style={[
              styles.input,
              {
                width: 200,
                borderWidth: 0,
                paddingHorizontal: 0,
              },
            ]}
            placeholder="Enter password"
            editable={edit}
          />

          <Icon
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            onPress={togglePasswordVisibility}
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setGender(text)}
          value={gender}
          editable={edit}
        />
      </View>

      <View
        style={[
          styles.fieldContainer,
          {flexDirection: 'row', justifyContent: 'space-between', zIndex: 1},
        ]}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Weight:</Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#E1E3E8',
              borderWidth: 1,
              height: 48,
              width: 170,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TextInput
              style={[
                styles.input,
                {
                  width: 90,
                  borderWidth: 0,
                },
              ]}
              onChangeText={text => setWeight(text)}
              value={weight}
              editable={edit}
            />
            <DropDownPicker
              style={{
                width: 80,
                borderWidth: 0.5,
                height: 20,
              }}
              containerStyle={{
                width: 80,
              }}
              arrowIconStyle={{
                width: 20,
                height: 20,
              }}
              textStyle={{
                fontSize: 16,
              }}
              open={open}
              value={value}
              items={weightUnit}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setWeightUnit}
              placeholder="unit"
              closeAfterSelecting={true}
              disabled={isDisabled}
            />
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Height:</Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#E1E3E8',
              borderWidth: 1,
              height: 48,
              width: 170,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TextInput
              style={[
                styles.input,
                {
                  width: 90,
                  borderWidth: 0,
                },
              ]}
              onChangeText={text => setHeight(text)}
              value={height}
              editable={edit}
            />
            <DropDownPicker
              style={{
                width: 80,
                borderWidth: 0.5,
                height: 20,
              }}
              containerStyle={{
                width: 80,
              }}
              textStyle={{
                fontSize: 16,
              }}
              open={open2}
              value={value2}
              items={heightUnit}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setHeightUnit}
              placeholder="unit"
              disabled={isDisabled}
            />
          </View>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAge(text)}
          value={age}
          editable={edit}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Fitness Goal:</Text>
        <DropDownPicker
          style={{
            width: 350,
            borderWidth: 1,
            height: 20,
            borderColor: '#E1E3E8',
          }}
          containerStyle={{
            width: 350,
          }}
          textStyle={{
            fontSize: 16,
          }}
          open={open3}
          value={value3}
          items={fitnessGoal}
          setOpen={setOpen3}
          setValue={setValue3}
          setItems={setFitnessGoal}
          dropDownDirection="BOTTOM"
          placeholder="Select fitness goal"
          disabled={isDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  label: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },

  input: {
    borderColor: '#E1E3E8',
    borderWidth: 1,
    height: 48,
    width: 350,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
});

export default ViewProfile;
