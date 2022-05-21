import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors, commonStyles, fonts} from '../../styles';
import {Input, Block} from 'galio-framework';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import ToggleSwitch from 'toggle-switch-react-native';
import {SvgXml} from 'react-native-svg';
import {SecondaryButton} from '../../components/Buttons';

const qrScanSvgXml = `<svg
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg">
<path
  d="M21 8V5C21 3.895 20.105 3 19 3H16"
  stroke="${colors.green5}"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M8 3H5C3.895 3 3 3.895 3 5V8"
  stroke="${colors.green5}"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M3 16V19C3 20.105 3.895 21 5 21H8"
  stroke="${colors.green5}"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M16 21H19C20.105 21 21 20.105 21 19V16"
  stroke="${colors.green5}"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M3 12H21"
  stroke="${colors.green5}"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
</svg>`;

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
  const [errors, setErrors] = useState({});

  const checkCanPass = data => {
    if (!data.seedPhrase) {
      setCanPass(false);
      return;
    }
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

  const onImportWallet = () => {
    if (password.length < 8) {
    }
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
        <View style={{paddingHorizontal: 24, marginTop: 40}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 24,
              alignItems: 'center',
            }}>
            <View style={{width: '75%'}}>
              <FloatingLabelInput
                label={'Seed Phrase'}
                value={seedPhrase}
                onChangeText={value => {
                  setSeedPhrase(value);
                  checkCanPass({password, passwordConfirm, seedPhrase: value});
                }}
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
            <View
              style={{
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml xml={qrScanSvgXml} />
            </View>
          </View>
          <View style={{marginBottom: 24}}>
            <FloatingLabelInput
              label={'New Password'}
              isPassword
              value={password}
              onChangeText={value => {
                setPassword(value);
                checkCanPass({password: value, passwordConfirm, seedPhrase});
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
          <View style={{marginBottom: 24}}>
            <FloatingLabelInput
              label={'Confirm Password'}
              isPassword
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                checkCanPass({password, passwordConfirm: value, seedPhrase});
              }}
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
          <SecondaryButton
            enableFlag={canPass}
            onPress={() => {
              onImportWallet();
            }}
            text="Import"
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ImportWalletScreen;
