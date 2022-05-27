import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {KeyboardAvoidingView, SafeAreaView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import {colors, fonts} from '../../styles';
import ToggleSwitch from 'toggle-switch-react-native';
import {SvgXml} from 'react-native-svg';
import {PrimaryButton, SecondaryButton} from '../../components/Buttons';
import FloatLabelInput from '../../components/FloatLabelInput';
import bip39 from 'react-native-bip39';

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

import {passwordStrength} from 'check-password-strength';

import Constants from '../../constants';
import {createWallet} from '../../redux/actions/WalletActions';
const passwordStrengthCheckOption = Constants.passwordStrengthCheckOption;
const passwordLevelColor = Constants.passwordLevelColor;

const ImportWalletScreen = ({navigation, createWallet}) => {
  useEffect(() => {});
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [canPass, setCanPass] = useState(false);
  const [passwordStrengthLabel, setPasswordStrengthLabel] =
    useState('No Password');
  const [createPasswordModalVisible, setCreatePasswordModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!bip39.validateMnemonic(data.seedPhrase)) {
      setCanPass(false);
      return;
    }
    setCanPass(true);
  };

  const onImportWallet = () => {
    createWallet(
      {
        password,
        mnemonic: seedPhrase,
      },
      () => {
        setLoading(true);
      },
      () => {
        console.log('success on press import');
        setLoading(false);
        setCreatePasswordModalVisible(false);
        navigation.replace('mainscreen');
      },
      () => {
        console.log('fail on press import');
        setLoading(false);
        setCreatePasswordModalVisible(false);
      },
    );
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
          <Modal
            isVisible={createPasswordModalVisible}
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 24,
                borderRadius: 12,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                <Text style={{...fonts.title2}}>Password is not strong.</Text>
                {'\n'}Are you sure you want to use this passord?
              </Text>
              <View
                style={{
                  marginTop: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <PrimaryButton
                  enableFlag={!loading}
                  onPress={() => {
                    setCreatePasswordModalVisible(false);
                  }}
                  text={'No, try again.'}
                />
                <SecondaryButton
                  onPress={() => {
                    onImportWallet();
                  }}
                  style={{width: 200}}
                  text="Yes, I am sure."
                  loading={loading}
                />
              </View>
            </View>
          </Modal>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 24,
              alignItems: 'center',
            }}>
            <View style={{width: '75%'}}>
              <FloatLabelInput
                label={'Seed Phrase'}
                value={seedPhrase}
                onChangeText={value => {
                  setSeedPhrase(value);
                  checkCanPass({password, passwordConfirm, seedPhrase: value});
                }}
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
              {seedPhrase.length > 0 && (
                <Text
                  style={{
                    paddingLeft: 16,
                    ...fonts.caption_small12_16_regular,
                    color: bip39.validateMnemonic(seedPhrase)
                      ? colors.green5
                      : colors.grey12,
                  }}>
                  {bip39.validateMnemonic(seedPhrase)
                    ? 'Valid Seed Phrase '
                    : 'Seed Phrase must be valid. '}
                  {bip39.validateMnemonic(seedPhrase) && (
                    <FontAwesome
                      style={{
                        fontSize: 12,
                        color: colors.green5,
                      }}
                      icon={SolidIcons.check}
                    />
                  )}
                </Text>
              )}
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
            <FloatLabelInput
              label={'New Password'}
              isPassword
              value={password}
              onChangeText={value => {
                setPassword(value);
                checkCanPass({password: value, passwordConfirm, seedPhrase});
                setPasswordStrengthLabel(
                  passwordStrength(value, passwordStrengthCheckOption).value,
                );
              }}
            />
            {password.length > 0 && (
              <>
                <Text
                  style={{
                    paddingLeft: 16,
                    ...fonts.caption_small12_16_regular,
                    color: colors.grey12,
                  }}>
                  Password strength:{' '}
                  <Text
                    style={{color: passwordLevelColor[passwordStrengthLabel]}}>
                    {passwordStrengthLabel}
                  </Text>
                </Text>
                {password.length < 8 && (
                  <Text
                    style={{
                      paddingLeft: 16,
                      paddingTop: 4,
                      ...fonts.caption_small12_16_regular,
                      color: colors.grey12,
                    }}>
                    Must be at least 8 characters.
                  </Text>
                )}
              </>
            )}
          </View>
          <View style={{marginBottom: 24}}>
            <FloatLabelInput
              label={'Confirm Password'}
              isPassword
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                checkCanPass({password, passwordConfirm: value, seedPhrase});
              }}
            />
            {passwordConfirm.length > 0 && (
              <Text
                style={{
                  paddingLeft: 16,
                  ...fonts.caption_small12_16_regular,
                  color:
                    password === passwordConfirm
                      ? colors.green5
                      : colors.grey12,
                }}>
                {password === passwordConfirm
                  ? 'Password matched. '
                  : 'Password must match. '}
                {password === passwordConfirm && (
                  <FontAwesome
                    style={{
                      fontSize: 12,
                      color: colors.green5,
                      marginLeft: 12,
                    }}
                    icon={SolidIcons.check}
                  />
                )}
              </Text>
            )}
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
              if (
                passwordStrength(password, passwordStrengthCheckOption).id < 2
              ) {
                setCreatePasswordModalVisible(true);
                return;
              }
              onImportWallet();
            }}
            text="Import"
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  createWallet: (data, beforeWork, successCallback, failCallback) =>
    createWallet(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportWalletScreen);
