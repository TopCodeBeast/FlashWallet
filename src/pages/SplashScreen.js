import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Linking,
  Animated,
  Text,
  View,
} from 'react-native';

import {colors} from '../styles';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

//import images
const shapeImage = require('../assets/images/splash/shape.png');
const logoImage = require('../assets/images/splash/logo.png');

const SplashScreen = () => {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        width: '100%',
        height: '100%',
      }}>
      <Image
        source={shapeImage}
        style={{
          left: '40%',
          top: '-5.6%',
          width: '60%',
          height: '50%',
          resizeMode: 'stretch',
        }}
      />
      <Image
        source={logoImage}
        style={{
          left: '10%',
          top: '8%',
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins',
          fontSize: 42,
          color: 'white',
          width: 274,
          left: '10%',
          top: '12%',
        }}>
        Millions of people participate
      </Text>
    </View>
  );
};

export default SplashScreen;
