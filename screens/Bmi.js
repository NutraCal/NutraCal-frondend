import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import dim from '../util/dim';

export default function Bmi() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [condition, setCondition] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [hide, setHide] = useState(true);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [heightUnit, setHeightUnit] = useState([
    {label: 'cm', value: 'cm'},
    {label: 'ft', value: 'ft'},
  ]);
  const [weightUnit, setWeightUnit] = useState([
    {label: 'kg', value: 'kg'},
    {label: 'lbs', value: 'lbs'},
  ]);

  const calculateBmi = () => {
    if (height === 0 || weight === 0) {
      alert('Please fill in both height and weight.');
      return;
    }
    console.log('here');
    let heightMeters, weightKg;
    if (value2 == 'cm') {
      heightMeters = height / 100;
      console.log('calculating height in cm');
    } else {
      heightMeters = height * 0.3048;
      console.log('calculating height in ft');
    }
    if (value == 'kg') {
      weightKg = weight;
    } else {
      weightKg = weight * 0.45359237;
      console.log('calculating height in kg');
    }

    console.log(weightKg);
    console.log('height');
    console.log(heightMeters);

    console.log('hehe');
    const bmiValue = weightKg / (heightMeters * heightMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      console.log(bmiValue);
      setCondition('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCondition('Normal');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCondition('Overweight');
    } else {
      setCondition('Obese');
    }
    setHide(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: (300 / dim.w) * dim.Width,
          height: (200 / dim.w) * dim.Width,
          marginBottom: (30 / dim.h) * dim.Height,
        }}
        source={require('../assets/images/bmi.png')}
      />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Weight:</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#E1E3E8',
            borderWidth: 1,
            height: (48 / dim.h) * dim.Height,
            width: (350 / dim.w) * dim.Width,
            borderRadius: 10,
            alignItems: 'center',
            zIndex: 2,
          }}>
          <TextInput
            style={[
              styles.input,
              {
                width: (270 / dim.w) * dim.Width,
                borderWidth: 0,
              },
            ]}
            onChangeText={text => setWeight(text)}
            value={weight}
          />
          <DropDownPicker
            style={{
              width: (80 / dim.w) * dim.Width,
              borderWidth: 0.5,
              height: (20 / dim.h) * dim.Height,
            }}
            containerStyle={{
              width: (80 / dim.w) * dim.Width,
            }}
            arrowIconStyle={{
              width: (20 / dim.w) * dim.Width,
              height: (20 / dim.w) * dim.Width,
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
            dropDownDirection="BOTTOM"
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
            height: (48 / dim.h) * dim.Height,
            width: (350 / dim.w) * dim.Width,
            borderRadius: 10,
            alignItems: 'center',
            zIndex: 1,
          }}>
          <TextInput
            style={[
              styles.input,
              {
                width: (270 / dim.w) * dim.Width,
                borderWidth: 0,
              },
            ]}
            onChangeText={text => setHeight(text)}
            value={height}
          />
          <DropDownPicker
            style={{
              width: (80 / dim.w) * dim.Width,
              borderWidth: 0.5,
              height: (20 / dim.h) * dim.Height,
            }}
            containerStyle={{
              width: (80 / dim.w) * dim.Width,
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
          />
        </View>
      </View>
      <TouchableOpacity
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
          zIndex: 0,
        }}
        onPress={calculateBmi}>
        <Text
          style={{color: 'white', fontSize: 16, fontFamily: 'Inter-SemiBold'}}>
          Calculate
        </Text>
      </TouchableOpacity>

      {bmi !== '' && height !== 0 && weight !== 0 && !hide && (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.resultText}>BMI: {bmi}</Text>
          <Text style={styles.resultText}>Condition: {condition}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: (8 / dim.h) * dim.Height,
    paddingTop: (50 / dim.h) * dim.Height,
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
    marginBottom: (15 / dim.h) * dim.Height,
  },

  resultText: {
    fontSize: 16,
    marginTop: (10 / dim.h) * dim.Height,
    color: 'black',
    fontFamily: 'Inter-Medium',
  },
});
