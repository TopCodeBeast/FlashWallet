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

const ImportWalletScreen = ({navigation}) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [canPass, setCanPass] = useState(false);

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
          paddingTop: 40,
        }}>
        <View style={{paddingHorizontal: 24, marginTop: 40}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 24,
            }}>
            <View style={{width: '75%'}}>
              <FloatingLabelInput
                label={'Seed Phrase'}
                isPassword
                value={seedPhrase}
                onChangeText={value => setSeedPhrase(value)}
                containerStyles={commonInputContainerStyles}
                customLabelStyles={commonInputCustomLabelStyles}
                inputStyles={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  color: 'white',
                  lineHeight: 24,
                  height: 100,
                  letterSpacing: 0,
                  fontWeight: 'bold',
                }}
                multiline
              />
            </View>
            <View style={{marginLeft: 40, marginTop: 20}}>
              <FontAwesome
                style={{fontSize: 20, color: colors.green5}}
                icon={SolidIcons.qrcode}
              />
            </View>
          </View>
          <View style={{marginBottom: 24}}>
            <FloatingLabelInput
              label={'New Password'}
              isPassword
              value={password}
              onChangeText={value => setPassword(value)}
              containerStyles={commonInputContainerStyles}
              customLabelStyles={commonInputCustomLabelStyles}
              inputStyles={commonInputInputStyles}
            />
          </View>
          <View style={{marginBottom: 24}}>
            <FloatingLabelInput
              label={'Confirm Password'}
              isPassword
              value={passwordConfirm}
              onChangeText={value => setPasswordConfirm(value)}
              containerStyles={commonInputContainerStyles}
              customLabelStyles={commonInputCustomLabelStyles}
              inputStyles={commonInputInputStyles}
            />
          </View>
          <View
            style={{
              marginBottom: 24,
              flexDirection: 'row',
              paddingHorizontal: 8,
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
              marginBottom: 24,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                ...fonts.para_regular,
                color: 'grey',
                textAlign: 'justify',
              }}>
              By proceeding, you agree to these{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                Term and Conditions.
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
          <Pressable
            style={commonStyles.secondaryButton}
            onPress={() => {
              console.log(123);
            }}
            disabled={!canPass}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: canPass ? colors.green5 : colors.grey18,
              }}>
              Import
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ImportWalletScreen;
