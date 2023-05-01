import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import dim from '../util/dim';
import Admin from '../assets/images/admin.svg';
import Nutritionist from '../assets/images/nutritionist.svg';
import User from '../assets/images/user.svg';

const SelectRole = ({navigation, route}) => {
  return (
    <View style={styles.MainDiv}>
      <Text style={styles.heading}>Select User Type</Text>
      <TouchableOpacity style={styles.borderBox}>
        <Admin
          width={(120 / dim.w) * dim.Width}
          height={(120 / dim.w) * dim.Width}
          style={{
            marginBottom: (10 / dim.w) * dim.Width,
          }}
        />
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.borderBox}
        onPress={() => navigation.navigate('NutritionistRegister')}>
        <Nutritionist
          width={(120 / dim.w) * dim.Width}
          height={(120 / dim.w) * dim.Width}
          style={{
            marginBottom: (10 / dim.w) * dim.Width,
          }}
        />
        <Text>Nutritionist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.borderBox}
        onPress={() => navigation.navigate('UserFitnessGoal')}>
        <User
          width={(120 / dim.w) * dim.Width}
          height={(120 / dim.w) * dim.Width}
          style={{
            marginBottom: (10 / dim.w) * dim.Width,
          }}
        />
        <Text>User</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  MainDiv: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  borderBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (20 / dim.h) * dim.Height,
    width: (224 / dim.w) * dim.Width,
    height: (168 / dim.h) * dim.Height,
    marginBottom: 26,
    borderWidth: 0.5,
    borderColor: '#C5C6CC',
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Inter-SemiBold',
    marginBottom: (35 / dim.h) * dim.Height,
    color: '#1F2024',
  },
});
export default SelectRole;
