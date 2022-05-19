import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  Linking,
  TouchableOpacity,
} from 'react-native';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

import {colors, commonStyles, fonts} from '../../styles';
import {Input, Block} from 'galio-framework';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import ToggleSwitch from 'toggle-switch-react-native';
import CheckBox from 'react-native-check-box';

import {SvgXml} from 'react-native-svg';

const commonInputContainerStyles = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: 'grey',
  paddingHorizontal: 10,
};
const commonInputCustomLabelStyles = {
  colorFocused: 'grey',
  colorBlurred: 'grey',
  fontFamily: 'Poppins',
  fontSize: 12,
  color: 'grey',
  lineHeight: 16,
  letterSpacing: 0,
};
const commonInputInputStyles = {
  color: 'white',
  fontFamily: 'Poppins',
  fontSize: 14,
  color: 'white',
  lineHeight: 24,
  height: 64,
  letterSpacing: 0,
  fontWeight: 'bold',
};

import titleSvgXml from './titleSVG';

const CreateWalletScreen1 = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);
  const [canPass, setCanPass] = useState(false);

  const checkCanPass = data => {
    if (!data.password) {
      setCanPass(false);
      return;
    }
    if (!data.passwordConfirm) {
      setCanPass(false);
      return;
    }
    setCanPass(true);
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
          paddingTop: 40,
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View>
            <SvgXml xml={titleSvgXml} />
          </View>
          <View>
            <Text
              style={{
                color: colors.grey9,
                ...fonts.para_regular,
                textAlign: 'center',
                paddingHorizontal: 24,
                paddingTop: 16,
              }}>
              This password will unlock your DeGe Wallet only on this service.
            </Text>
          </View>
        </View>
        <View style={{width: '100%', paddingHorizontal: 24, marginTop: 40}}>
          <View style={{marginBottom: 24}}>
            <FloatingLabelInput
              label={'New Password'}
              isPassword
              value={password}
              onChangeText={value => {
                setPassword(value);
                checkCanPass({password: value, passwordConfirm});
              }}
              containerStyles={commonInputContainerStyles}
              customLabelStyles={commonInputCustomLabelStyles}
              inputStyles={commonInputInputStyles}
            />
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: 'grey',
              }}>
              Password strength:{' '}
              <Text style={{color: colors.green5}}>Good</Text>
            </Text>
          </View>
          <View>
            <FloatingLabelInput
              label={'Confirm Password'}
              isPassword
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                checkCanPass({password, passwordConfirm: value});
              }}
              containerStyles={commonInputContainerStyles}
              customLabelStyles={commonInputCustomLabelStyles}
              inputStyles={commonInputInputStyles}
            />
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: 'grey',
              }}>
              Must be at least 8 characters.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            paddingHorizontal: 32,
          }}>
          <View style={{width: '60%'}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Sign in with Face ID?
            </Text>
          </View>
          <View style={{width: '40%', alignItems: 'flex-end'}}>
            <ToggleSwitch
              isOn={signInWithFaceId}
              onColor={colors.green5}
              offColor="grey"
              size="large"
              onToggle={isOn => setSignInWithFaceId(isOn)}
              animationSpeed={100}
              thumbOnStyle={{borderRadius: 6}}
              thumbOffStyle={{borderRadius: 6}}
              trackOnStyle={{borderRadius: 8, width: 68, height: 32}}
              trackOffStyle={{borderRadius: 8, width: 68, height: 32}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
            paddingLeft: 24,
            paddingRight: 24,
            alignItems: 'center',
          }}>
          <CheckBox
            checkedCheckBoxColor={colors.green5}
            checkBoxColor={colors.grey13}
            isChecked={isAgreeChecked}
            onClick={() => {
              setIsAgreeChecked(!isAgreeChecked);
            }}
          />
          <View
            style={{
              marginLeft: 8,
              width: '80%',
            }}>
            <Text
              style={{
                color: 'white',
                ...fonts.para_regular,
              }}>
              I understand that DeGe cannot recover this password for me.{' '}
              <Text
                style={{color: colors.blue5}}
                onPress={() => Linking.openURL('http://google.com')}>
                Learn more
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: '6%',
            width: '90%',
            left: '5%',
          }}>
          <TouchableOpacity
            style={commonStyles.secondaryButton}
            onPress={() => {}}
            disabled={!canPass}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: canPass ? colors.green5 : colors.grey18,
              }}>
              Create Password
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateWalletScreen1;
