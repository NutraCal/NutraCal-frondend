import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const Rating = ({rating, onRatingChange}) => {
  const renderStar = index => {
    const filled = index < rating;
    const iconName = filled ? 'star' : 'star-o';

    return (
      <TouchableOpacity
        key={index}
        onPress={() => onRatingChange(index + 1)}
        style={{marginRight: 4}}>
        <Ionicons name={iconName} size={25} color="#91C788" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Rating;
