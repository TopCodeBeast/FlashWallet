import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Image, KeyboardAvoidingView, SafeAreaView, Text} from 'react-native';

import {colors, commonStyles, fonts} from '../../styles';

const MainScreen = ({navigation}) => {
  useEffect(() => {
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
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 42,
            color: 'white',
            width: 274,
            left: '10%',
            top: '12%',
          }}>
          Main Screen
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
