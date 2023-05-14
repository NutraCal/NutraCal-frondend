import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import Intro from './Intro';
import dim from '../util/dim';
import Star from '../assets/images/star.svg';
import Reply from '../assets/images/reply.svg';
import Like from '../assets/images/like.svg';

const ViewBlog = ({navigation, route}) => {
  return (
    <View style={styles.MainDiv}>
      <Text>NutraCal</Text>

      <View
        style={{
          flexDirection: 'row',
          width: (370 / dim.w) * dim.Width,
          justifyContent: 'space-between',
          marginTop: (10 / dim.h) * dim.Height,
        }}>
        <Text style={[styles.heading]}>Rate & Review</Text>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Star
            width={(20 / dim.w) * dim.Width}
            height={(20 / dim.w) * dim.Width}
            style={{marginLeft: (5 / dim.w) * dim.Width}}
          />
          <Star
            width={(20 / dim.w) * dim.Width}
            height={(20 / dim.w) * dim.Width}
            style={{marginLeft: (5 / dim.w) * dim.Width}}
          />
          <Star
            width={(20 / dim.w) * dim.Width}
            height={(20 / dim.w) * dim.Width}
            style={{marginLeft: (5 / dim.w) * dim.Width}}
          />
          <Star
            width={(20 / dim.w) * dim.Width}
            height={(20 / dim.w) * dim.Width}
            style={{marginLeft: (5 / dim.w) * dim.Width}}
          />
          <Star
            width={(20 / dim.w) * dim.Width}
            height={(20 / dim.h) * dim.Height}
            style={{
              marginLeft: (5 / dim.w) * dim.Width,
              marginRight: (10 / dim.w) * dim.Width,
            }}
          />
        </View>
      </View>

      <TextInput
        style={styles.txtInput}
        placeholder="Leave a comment"
        placeholderTextColor="#8F9098"
      />

      <View
        style={{
          marginTop: (10 / dim.h) * dim.Height,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../assets/images/homedp.png')}
          style={{
            width: (50 / dim.w) * dim.Width,
            height: (50 / dim.w) * dim.Width,
          }}
        />
        <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
          <Text style={styles.name}>Bessie Cooper</Text>
          <Text style={[styles.tag, {width: (300 / dim.w) * dim.Width}]}>
            I think you can tell a lot about a person by whether they use a
            shape
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: (5 / dim.h) * dim.Height,
              marginBottom: (10 / dim.h) * dim.Height,
            }}>
            <Reply
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
            />
            <Like
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
              style={{marginLeft: (10 / dim.w) * dim.Width}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: (10 / dim.h) * dim.Height,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../assets/images/homedp.png')}
          style={{
            width: (50 / dim.w) * dim.Width,
            height: (50 / dim.w) * dim.Width,
          }}
        />
        <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
          <Text style={styles.name}>Bessie Cooper</Text>
          <Text style={[styles.tag, {width: (300 / dim.w) * dim.Width}]}>
            I think you can tell a lot about a person by whether they use a
            shape
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
            <Reply
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
            />
            <Like
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
              style={{marginLeft: (10 / dim.w) * dim.Width}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: (10 / dim.h) * dim.Height,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../assets/images/homedp.png')}
          style={{
            width: (50 / dim.w) * dim.Width,
            height: (50 / dim.w) * dim.Width,
          }}
        />
        <View style={{marginLeft: (10 / dim.w) * dim.Width}}>
          <Text style={styles.name}>Bessie Cooper</Text>
          <Text style={[styles.tag, {width: (300 / dim.w) * dim.Width}]}>
            I think you can tell a lot about a person by whether they use a
            shape
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
            <Reply
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
            />
            <Like
              width={(20 / dim.w) * dim.Width}
              height={(20 / dim.w) * dim.Width}
              style={{marginLeft: (10 / dim.w) * dim.Width}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  MainDiv: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    marginVertical: (10 / dim.h) * dim.Height,
    borderColor: '#F8F9FE',
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    height: (50 / dim.h) * dim.Height,
    width: (370 / dim.w) * dim.Width,
    paddingHorizontal: (15 / dim.w) * dim.Width,
    borderRadius: 20,
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 16,
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter-Medium',
    alignSelf: 'flex-start',
  },

  tag: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    marginBottom: (5 / dim.h) * dim.Height,
  },
});
export default ViewBlog;
