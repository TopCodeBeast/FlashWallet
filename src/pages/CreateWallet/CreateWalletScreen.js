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
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

import {colors, commonStyles, fonts} from '../../styles';
import {Input, Block} from 'galio-framework';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import ToggleSwitch from 'toggle-switch-react-native';
import CheckBox from 'react-native-check-box';

import ConfirmSeedScreen from './ConfirmSeedScreen';

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

import createPasswordTitleSvgXml from './createPasswordTitleSVG';
import secureWalletTitleSvgXml from './secureWalletTitleSVG';
import infoCircleIconSvgXml from './infoCircleIconSVG';
import writeSeedTitleSvgXml from './writeSeedTitleSVG';
import successTitleSvgXml from './successTitleSVG';

const image = require('../../assets/images/createwallet2/image.png');
const seedMaskImage = require('../../assets/images/createwallet2/seed_mask.png');

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

console.log(screenWidth, screenHeight);

const mnemonic = [
  'future',
  'use',
  'abuse',
  'bubble',
  'disagree',
  'yard',
  'exit',
  'engage',
  'drum',
  'frequent',
  'target',
  'organ',
];

const CreateWalletScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);
  const [canPass, setCanPass] = useState(false);
  const [showSeed, setShowSeed] = useState(false);

  const [status, setStatus] = useState('create_password');

  const checkCanPass = data => {
    if (!data.password) {
      setCanPass(false);
      return;
    }
    if (!data.passwordConfirm) {
      setCanPass(false);
      return;
    }
    if (!data.isAgreeChecked) {
      setCanPass(false);
      return;
    }
    setCanPass(true);
  };

  const createWalletHeaderRender = () => {
    return (
      <View
        style={{
          backgroundColor: colors.grey24,
          paddingTop: 44,
          paddingHorizontal: 16,
          paddingBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1}}>
          <Pressable
            onPress={() => {
              if (status === 'success') {
                setStatus('confirm_seed');
              } else if (status === 'confirm_seed') {
                setStatus('write_seed');
              } else if (status === 'write_seed') {
                setShowSeed(false);
                setStatus('secure_seed');
              } else if (status === 'secure_seed') {
                setStatus('secure_wallet');
              } else if (status === 'secure_wallet') {
                setStatus('create_password');
              } else if (status === 'create_password') {
                navigation.goBack();
              }
            }}
            style={{width: 20}}>
            <FontAwesome
              style={{fontSize: 16, color: 'white'}}
              icon={SolidIcons.chevronLeft}
            />
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '90%',
            height: 8,
          }}>
          <View
            style={{
              width: '30%',
              height: 8,
              backgroundColor: colors.green5,
              borderRadius: 2,
            }}></View>
          <View
            style={{
              width: '30%',
              height: 8,
              backgroundColor:
                status === 'secure_wallet' ||
                status === 'secure_seed' ||
                status === 'write_seed' ||
                status === 'confirm_seed' ||
                status === 'success'
                  ? colors.green5
                  : colors.grey23,
            }}></View>
          <View
            style={{
              width: '30%',
              height: 8,
              backgroundColor:
                status === 'confirm_seed' || status === 'success'
                  ? colors.green5
                  : colors.grey23,
            }}></View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{color: colors.grey13, ...fonts.caption_small12_16_regular}}>
            {status === 'create_password'
              ? '1/3'
              : status === 'secure_wallet' ||
                status === 'secure_seed' ||
                status === 'write_seed'
              ? '2/3'
              : status === 'confirm_seed' || status === 'success'
              ? '3/3'
              : '??'}
          </Text>
        </View>
      </View>
    );
  };

  const createPasswordRender = () => {
    return (
      <View style={{height: '100%'}}>
        <View style={{width: '100%', alignItems: 'center', paddingTop: 40}}>
          <View>
            <SvgXml xml={createPasswordTitleSvgXml} />
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
                checkCanPass({
                  password: value,
                  passwordConfirm,
                  isAgreeChecked,
                });
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
                checkCanPass({
                  password,
                  passwordConfirm: value,
                  isAgreeChecked,
                });
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
              let value = !isAgreeChecked;
              setIsAgreeChecked(value);
              checkCanPass({
                password,
                passwordConfirm,
                isAgreeChecked: value,
              });
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
            bottom: 120,
            width: '90%',
            left: '5%',
          }}>
          <TouchableOpacity
            style={
              canPass ? commonStyles.primaryButton : commonStyles.disabledButton
            }
            onPress={() => {
              setStatus('secure_wallet');
            }}
            disabled={!canPass}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: canPass ? 'black' : colors.grey18,
              }}>
              Create Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const secureWalletRender = () => {
    return (
      <View style={{height: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image source={image} />
        </View>
        <View style={{marginTop: 40, paddingHorizontal: 24}}>
          <View style={{paddingBottom: 16}}>
            <Text
              style={{textAlign: 'center', ...fonts.title2, color: 'white'}}>
              Secure Your Wallet
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.grey9,
                ...fonts.para_regular,
                textAlign: 'left',
              }}>
              Don't risk losing your funds. Protect your wallet by saving your{' '}
              <Text
                style={{color: colors.blue5, ...fonts.para_semibold}}
                onPress={() => {
                  setStatus('secure_seed');
                }}>
                Seed Phrase
              </Text>{' '}
              in a place you trust.
            </Text>
          </View>
          <View style={{marin: 8}}>
            <Text
              style={{
                color: colors.grey9,
                ...fonts.para_semibold,
                textAlign: 'left',
              }}>
              It's the only way to recover your wallet if you get locked out of
              the app or get a new device.
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 120,
            width: '90%',
            left: '5%',
          }}>
          <TouchableWithoutFeedback>
            <View style={{paddingVertical: 12, marginBottom: 8}}>
              <Text
                style={{
                  ...fonts.btn_large_normal,
                  color: colors.green5,
                  textAlign: 'center',
                }}>
                Remind Me Later
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={{
              ...commonStyles.primaryButton,
            }}
            onPress={() => {
              setStatus('secure_seed');
            }}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: 'black',
              }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const secureSeedRender = () => {
    return (
      <View style={{width: '100%', paddingTop: 40, height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <SvgXml xml={secureWalletTitleSvgXml} />
          </View>
          <View style={{position: 'relative', right: 48}}>
            <SvgXml xml={infoCircleIconSvgXml} />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            marginTop: 16,
          }}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            Secure your wallet's "
            <Text style={{color: colors.blue5, ...fonts.para_semibold}}>
              Seed Phrase
            </Text>
            "
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            marginTop: 40,
          }}>
          <View>
            <Text style={{...fonts.para_semibold, color: 'white'}}>Manual</Text>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              Write down your seed phrase on a piece of paper and store in a
              safe place.
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <View>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                Security level: Very strong
              </Text>
            </View>
            <View style={{marginTop: 8}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 4,
                    height: 8,
                    width: 53,
                    marginRight: 8,
                    backgroundColor: colors.green5,
                  }}></View>
                <View
                  style={{
                    borderRadius: 4,
                    height: 8,
                    width: 53,
                    marginRight: 8,
                    backgroundColor: colors.green5,
                  }}></View>
                <View
                  style={{
                    borderRadius: 4,
                    height: 8,
                    width: 53,
                    backgroundColor: colors.green5,
                  }}></View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              Risks are:{'\n'}• You lose it {'\n'}• You forget where you put it{' '}
              {'\n'}• Someone else finds it
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              Other options doesn't have to be paper!
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              Tips:{'\n'}• Store in bank vault
              {'\n'}• Store in a safe
              {'\n'}• Store in multiple secret places
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 120,
            width: '90%',
            left: '5%',
          }}>
          <TouchableOpacity
            style={
              canPass ? commonStyles.primaryButton : commonStyles.disabledButton
            }
            onPress={() => {
              setStatus('write_seed');
            }}
            disabled={!canPass}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: canPass ? 'black' : colors.grey18,
              }}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const writeSeedRender = () => {
    return (
      <View style={{width: '100%', paddingTop: 40, height: '100%'}}>
        <View style={{alignItems: 'center', paddingHorizontal: 24}}>
          <SvgXml xml={writeSeedTitleSvgXml} />
        </View>
        <View style={{marginTop: 16, paddingHorizontal: 24}}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            This is your seed phrase. Write it down on a paper and keep it in a
            safe place. You'll be asked to re-enter this phrase (in order) on
            the next step.
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 24,
            padding: 24,
            borderRadius: 8,
            borderColor: colors.grey22,
            borderWidth: 1,
          }}>
          {mnemonic.map((item, index) => {
            if (index < 6) {
              return (
                <View
                  key={'mnemonic_' + index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 16,
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.grey22,
                      borderRadius: 8,
                      height: 32,
                      width: 140,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        ...fonts.para_regular,
                        textAlign: 'center',
                      }}>
                      {(index + 1).toString() + '. ' + item}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.grey22,
                      borderRadius: 8,
                      height: 32,
                      width: 140,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        ...fonts.para_regular,
                        textAlign: 'center',
                      }}>
                      {(index + 7).toString() + '. ' + mnemonic[index + 6]}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
          {!showSeed && (
            <>
              <Image
                source={seedMaskImage}
                style={{
                  position: 'absolute',
                  width: screenWidth - 48,
                  height: 336,
                  borderRadius: 8,
                  borderColor: colors.grey22,
                  borderWidth: 1,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: screenWidth - 48,
                  height: 336,
                }}>
                <View>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        ...fonts.para_semibold,
                        textAlign: 'center',
                      }}>
                      Tap to reveal your seed phrase
                    </Text>
                  </View>
                  <View style={{marginTop: 16}}>
                    <Text
                      style={{
                        color: colors.grey9,
                        ...fonts.para_regular,
                        textAlign: 'center',
                      }}>
                      Make sure no one is watching your screen.
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 40}}>
                  <TouchableOpacity
                    style={{
                      ...commonStyles.secondaryButton,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setShowSeed(true);
                    }}>
                    <FontAwesome
                      style={{
                        fontSize: 16,
                        color: colors.green5,
                        marginRight: 12,
                      }}
                      icon={RegularIcons.eye}
                    />
                    <Text
                      style={{
                        ...fonts.btn_large_normal,
                        color: colors.green5,
                      }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 120,
            width: '90%',
            left: '5%',
          }}>
          <TouchableOpacity
            style={
              showSeed
                ? commonStyles.primaryButton
                : commonStyles.disabledButton
            }
            onPress={() => {
              setStatus('confirm_seed');
              setShowSeed(false);
            }}
            disabled={!showSeed}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: showSeed ? 'black' : colors.grey18,
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const successRender = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: 24,
          alignItems: 'center',
          paddingTop: 150,
        }}>
        <View>
          <SvgXml xml={successTitleSvgXml} />
        </View>
        <View style={{marginTop: 40}}>
          <Text
            style={{
              textAlign: 'center',
              ...fonts.para_regular,
              color: 'white',
            }}>
            You've successfully protected your wallet. Remember to keep your
            seed phrase safe, it's your responsibility!
          </Text>
        </View>
        <View style={{marginTop: 24}}>
          <Text
            style={{
              textAlign: 'center',
              ...fonts.para_regular,
              color: 'white',
            }}>
            DefiSquid cannot recover your wallet should you lose it. You can
            find your seedphrase in Setings &gt; Security &amp; Privacy
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 120,
            width: '100%',
          }}>
          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => {
              navigation.navigate('mainscreen');
            }}>
            <Text
              style={{
                ...fonts.btn_large_normal,
                color: 'black',
              }}>
              Success
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        {createWalletHeaderRender()}
        {status === 'create_password' && createPasswordRender()}
        {status === 'secure_wallet' && secureWalletRender()}
        {status === 'secure_seed' && secureSeedRender()}
        {status === 'write_seed' && writeSeedRender()}
        {status === 'confirm_seed' && (
          <ConfirmSeedScreen
            successCallback={() => {
              setStatus('success');
            }}
          />
        )}
        {status === 'success' && successRender()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateWalletScreen;
