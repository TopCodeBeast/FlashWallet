import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {colors, fonts} from '../styles';
import FloatLabelInput from '../components/FloatLabelInput';
import {PrimaryButton} from '../components/Buttons';
import ToggleSwitch from 'toggle-switch-react-native';
import {checkAuthentication, saveRememberOption} from '../actions/Auth';

//import images
const logoImage = require('../assets/images/splash/logo.png');

const LogIn = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const onPressLogIn = async () => {
    setIsLoading(true);
    const res = await checkAuthentication(password);
    if (!res) {
      setError('Password is wrong.');
    } else {
      const res = await saveRememberOption(rememberMe ? 'true' : 'false');
      if (res) {
        navigation.replace('mainscreen');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.replace('through');
    // }, 3000);
    return () => {};
  });

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={logoImage} />
          </View>
          <View style={{marginTop: 90, width: '100%'}}>
            <FloatLabelInput
              label={'Password'}
              isPassword
              value={password}
              onChangeText={value => {
                setError('');
                setPassword(value);
              }}
              autoFocus
              style={error ? {borderColor: colors.red5} : {}}
            />
            {error.length > 0 && (
              <Text
                style={{
                  paddingLeft: 16,
                  ...fonts.caption_small12_16_regular,
                  color: colors.red5,
                }}>
                {error}
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: 24,
              width: '100%',
            }}>
            <ToggleSwitch
              isOn={rememberMe}
              onColor={colors.green5}
              offColor={colors.grey23}
              size="large"
              onToggle={isOn => setRememberMe(isOn)}
              animationSpeed={100}
              thumbOnStyle={{borderRadius: 6}}
              thumbOffStyle={{borderRadius: 6}}
              trackOnStyle={{borderRadius: 8, width: 68, height: 32}}
              trackOffStyle={{borderRadius: 8, width: 68, height: 32}}
              label={'Remember Me'}
              labelStyle={{color: colors.grey12, ...fonts.para_semibold}}
            />
          </View>
          <View style={{marginTop: 60}}>
            <PrimaryButton
              loading={isLoading}
              text={'Log In'}
              onPress={onPressLogIn}
              enableFlag={password.length > 0}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
