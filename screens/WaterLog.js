import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WaterLog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGoalVisible, setIsGoalVisible] = useState(false);
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(0);

  const handleSave = () => {
    // Call Node server to save data to MongoDB
    setIsVisible(false);
  };

  const handleGoalSave = () => {
    setIsGoalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.waterContainer}>
        {/* <Ionicons name="water" size={100} color="#3c96f5" /> */}
        <Image
          style={{width: 300, height: 200, marginBottom: 30}}
          source={require('../assets/images/water.png')}
        />
        <ImageBackground
          source={require('../assets/images/waterbg.png')}
          style={{
            width: 310,
            height: 160,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.goalCount}>Daily Intake Goal</Text>
          <Text style={styles.goalCount}>{goal} glasses</Text>
        </ImageBackground>
      </View>

      <TouchableOpacity
        style={[
          styles.btn1,
          {
            backgroundColor: '#91C788',
            borderColor: '#91C788',
            borderWidth: 1,
          },
        ]}
        onPress={() => setIsGoalVisible(true)}>
        <Text style={styles.label1}>Set Goal</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <View style={styles.subsection}>
          <Text style={styles.heading}>Water Log</Text>
          <Text style={styles.waterCount}>{glasses} glasses</Text>
        </View>
        <View style={[styles.subsection, {marginTop: 10, marginBottom: 10}]}>
          <Ionicons name="water" size={50} color="#3c96f5" />
          <View
            style={{
              width: 280,
              height: 50,
              flexDirection: 'row',
              backgroundColor: '#EBF2FF',
              padding: 8,
              borderRadius: 10,
              marginRight: 40,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={styles.name1}>2 glasses</Text>
            <Text style={styles.desc}>5:00 pm</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        overlayStyle={styles.overlay}>
        <Text style={styles.overlayTitle}>How many glasses did you drink?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Number of glasses"
            onChangeText={value => setGlasses(value)}
            value={glasses}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            onPress={handleSave}
            buttonStyle={styles.button}
          />
        </View>
      </Overlay>

      <Overlay
        isVisible={isGoalVisible}
        onBackdropPress={() => setIsGoalVisible(false)}
        overlayStyle={styles.overlay}>
        <Text style={styles.overlayTitle}>
          What's your daily water intake goal?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Number of glasses"
            onChangeText={value => setGoal(value)}
            value={goal}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Save"
            onPress={handleGoalSave}
            buttonStyle={styles.button}
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    padding: 20,
    height: '100%',
  },
  waterContainer: {
    flexDirection: 'column',
  },
  waterCount: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  goalCount: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#91C788',
    borderRadius: 50,

    width: 50,
    height: 50,
    position: 'absolute',

    marginTop: 40,
    bottom: 30,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlay: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '100%',
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
  },

  btn1: {
    paddingHorizontal: 30,
    paddingVertical: 4,
    marginTop: 15,
    borderRadius: 20,
  },
  label1: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-Regular',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },

  desc: {
    fontSize: 14,
    color: '#7B6F72',
    fontFamily: 'Inter-Light',
    marginTop: 5,
  },

  name1: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    marginTop: 5,
  },

  section: {
    width: 350,
    marginBottom: 20,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default WaterLog;
