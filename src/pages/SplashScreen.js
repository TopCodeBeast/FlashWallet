import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Image, KeyboardAvoidingView, SafeAreaView, Text} from 'react-native';

import {colors} from '../styles';

//import images
const shapeImage = require('../assets/images/splash/shape.png');
const logoImage = require('../assets/images/splash/logo.png');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('through');
    }, 3000);
    return () => {};
  });

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SplashScreen;
