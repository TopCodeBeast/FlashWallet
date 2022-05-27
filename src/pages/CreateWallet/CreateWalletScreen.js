import React, {useState, useEffect, createRef, useRef} from 'react';

import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  PrimaryButton,
  TextButton,
  SecondaryButton,
} from '../../components/Buttons';
import Modal from 'react-native-modal';
import FontAwesome, {SolidIcons, RegularIcons} from 'react-native-fontawesome';
import {colors, fonts} from '../../styles';
import ToggleSwitch from 'toggle-switch-react-native';
import CheckBox from 'react-native-check-box';
import ConfirmSeedScreen from './ConfirmSeedScreen';
import {SvgXml} from 'react-native-svg';
import {BlurView} from '@react-native-community/blur';
import RBSheet from 'react-native-raw-bottom-sheet';
import createPasswordTitleSvgXml from './createPasswordTitleSVG';
import secureWalletTitleSvgXml from './secureWalletTitleSVG';
import infoCircleIconSvgXml from './infoCircleIconSVG';
import writeSeedTitleSvgXml from './writeSeedTitleSVG';
import successTitleSvgXml from './successTitleSVG';
import FloatLabelInput from '../../components/FloatLabelInput';

import Constants from '../../constants';
//import actions
import {createWallet} from '../../redux/actions/WalletActions';

//import utils
import {passwordStrength} from 'check-password-strength';
import {createMnemonic} from '../../utils/mnemonic';

const passwordStrengthCheckOption = Constants.passwordStrengthCheckOption;
const passwordLevelColor = Constants.passwordLevelColor;

const image = require('../../assets/images/createwallet2/image.png');

const screenWidth = Dimensions.get('screen').width;

const CreateWalletScreen = ({navigation, createWallet}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordStrengthLabel, setPasswordStrengthLabel] =
    useState('No Password');
  const [createPasswordModalVisible, setCreatePasswordModalVisible] =
    useState(false);
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);
  const [canPass, setCanPass] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [viewRef, setViewRef] = useState(null);
  const [understandNotSecurity, setUnderstandNotSecurity] = useState(false);
  const [successLoading, setSuccessLoading] = useState(false);

  const backgroundImageRef = createRef();
  const refRBSkipSecuritySheet = useRef(null);
  const refRBSeedPhraseSheet = useRef(null);
  const refRBProtectWalletSheet = useRef(null);

  const [status, setStatus] = useState('create_password');
  const [mnemonic, setMnemonic] = useState([]);

  useEffect(async () => {
    let phrase = await createMnemonic();
    phrase = phrase.split(' ');
    setMnemonic(phrase);
    return () => {};
  }, []);

  const onPressCreatePassword = async () => {
    setStatus('secure_wallet');
  };
  const onPressSuccess = () => {
    createWallet(
      {
        password,
        mnemonic: mnemonic.join(' '),
      },
      () => {
        setSuccessLoading(true);
      },
      () => {
        console.log('success on press success');
        setSuccessLoading(false);
        navigation.navigate('mainscreen');
      },
      () => {
        console.log('fail on press success');
        setSuccessLoading(false);
      },
    );
  };

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
    if (data.password.length < 8) {
      setCanPass(false);
      return;
    }
    if (data.password !== data.passwordConfirm) {
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
        <View>
          <TouchableOpacity
            onPress={() => {
              if (status === 'success') {
                setStatus('secure_wallet');
              } else if (status === 'confirm_seed') {
                setStatus('write_seed');
              } else if (status === 'write_seed') {
                setShowSeed(false);
                setStatus('secure_seed');
              } else if (status === 'secure_seed') {
                setStatus('secure_wallet');
              } else if (status === 'secure_wallet') {
                setStatus('create_password');
                setCreatePasswordModalVisible(false);
              } else if (status === 'create_password') {
                navigation.goBack();
              }
            }}
            style={{width: 20}}>
            <FontAwesome
              style={{fontSize: 16, color: 'white'}}
              icon={SolidIcons.chevronLeft}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            flex: 1,
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
                onPress={() => {
                  setCreatePasswordModalVisible(false);
                }}
                text={'No, try again.'}
              />
              <SecondaryButton
                onPress={() => {
                  onPressCreatePassword();
                }}
                style={{width: 200}}
                text="Yes, I am sure."
              />
            </View>
          </View>
        </Modal>
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
            <FloatLabelInput
              label={'New Password'}
              isPassword={true}
              value={password}
              onChangeText={value => {
                setPassword(value);
                checkCanPass({
                  password: value,
                  passwordConfirm,
                  isAgreeChecked,
                });
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
          <View>
            <FloatLabelInput
              label={'Confirm Password'}
              isPassword={true}
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                checkCanPass({
                  password,
                  passwordConfirm: value,
                  isAgreeChecked,
                });
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
                  : 'Password must match.'}
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
              offColor={colors.grey23}
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
          <PrimaryButton
            enableFlag={canPass}
            onPress={() => {
              if (
                passwordStrength(password, passwordStrengthCheckOption).id < 2
              ) {
                setCreatePasswordModalVisible(true);
                return;
              }
              onPressCreatePassword();
            }}
            text="Create Password"
          />
        </View>
      </View>
    );
  };

  const secureWalletRender = () => {
    return (
      <View style={{height: '100%'}}>
        <RBSheet
          height={280}
          ref={refRBSkipSecuritySheet}
          closeOnDragDown={true}
          closeOnPressBack={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: '#222531BB',
            },
            draggableIcon: {
              backgroundColor: colors.grey9,
            },
            container: {
              backgroundColor: colors.grey24,
            },
          }}>
          <View>
            <View style={{paddingTop: 16}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                Skip Account Security?
              </Text>
            </View>
            <View
              style={{
                paddingTop: 40,
                flexDirection: 'row',
                paddingLeft: 24,
                paddingRight: 24,
                alignItems: 'center',
              }}>
              <CheckBox
                checkedCheckBoxColor={colors.green5}
                checkBoxColor={colors.grey13}
                isChecked={understandNotSecurity}
                onClick={() => {
                  setUnderstandNotSecurity(!understandNotSecurity);
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
                  I understand that if i lose mt seed phrase i will not be able
                  to access my wallet
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 12,
                paddingHorizontal: 24,
                paddingTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TextButton
                onPress={() => {
                  setStatus('secure_seed');
                }}
                text="Secure Now"
              />
              <PrimaryButton
                onPress={() => {
                  setStatus('success');
                }}
                text="Skip"
                enableFlag={understandNotSecurity}
              />
            </View>
          </View>
        </RBSheet>
        <RBSheet
          height={460}
          ref={refRBSeedPhraseSheet}
          closeOnDragDown={true}
          closeOnPressBack={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: '#222531BB',
            },
            draggableIcon: {
              backgroundColor: colors.grey9,
            },
            container: {
              backgroundColor: colors.grey24,
            },
          }}>
          <View>
            <View style={{paddingTop: 12}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                What is a 'Seed Phrase'?
              </Text>
            </View>
            <View style={{paddingTop: 24, paddingHorizontal: 24}}>
              <Text
                style={{
                  ...fonts.para_regular,
                  color: 'white',
                  textAlign: 'left',
                }}>
                A seed phrase is a set of twelve words that contains all the
                information about your wallet, including your funds. It's like a
                secret code used to access your entire wallet.{'\n'}You must
                keep your seed phrase secret and safe. If someone gets your seed
                phrase, they'll gain control over your accounts. {'\n'}Save it
                in a place where only you can access it. If you lose it, not
                even MetaMask can help you recover it.
              </Text>
            </View>
            <View style={{paddingTop: 40, paddingHorizontal: 24}}>
              <PrimaryButton
                onPress={() => {
                  refRBSeedPhraseSheet.current.close();
                }}
                text="I Got It."
              />
            </View>
          </View>
        </RBSheet>

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
                  refRBSeedPhraseSheet.current.open();
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
          <View>
            <TextButton
              onPress={() => {
                refRBSkipSecuritySheet.current.open();
              }}
              text="Remind Me Later"
            />
          </View>
          <View style={{marginTop: 24}}>
            <PrimaryButton
              onPress={() => {
                setStatus('secure_seed');
              }}
              text="Start"
            />
          </View>
        </View>
      </View>
    );
  };

  const secureSeedRender = () => {
    return (
      <View style={{width: '100%', paddingTop: 40, height: '100%'}}>
        <RBSheet
          height={360}
          ref={refRBProtectWalletSheet}
          closeOnDragDown={true}
          closeOnPressBack={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: '#222531BB',
            },
            draggableIcon: {
              backgroundColor: colors.grey9,
            },
            container: {
              backgroundColor: colors.grey24,
            },
          }}>
          <View>
            <View style={{paddingTop: 12}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                Protect Your Wallet
              </Text>
            </View>
            <View style={{paddingTop: 24, paddingHorizontal: 24}}>
              <Text
                style={{
                  ...fonts.para_regular,
                  color: 'white',
                  textAlign: 'left',
                }}>
                Dont’t risk losing your funds. Protect your wallet by saving
                your seed phrase in a place you trust.{'\n'}It’s the only way to
                recover your wallet if you get locked out of the app or get a
                new device.
              </Text>
            </View>
            <View style={{paddingTop: 40, paddingHorizontal: 24}}>
              <PrimaryButton
                onPress={() => {
                  refRBProtectWalletSheet.current.close();
                }}
                text="I Got It."
              />
            </View>
          </View>
        </RBSheet>
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
            <Text
              style={{color: colors.blue5, ...fonts.para_semibold}}
              onPress={() => {
                refRBProtectWalletSheet.current.open();
              }}>
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
          <PrimaryButton
            onPress={() => {
              setStatus('write_seed');
            }}
            text="Start"
            enableFlag={canPass}
          />
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
          }}
          ref={backgroundImageRef}
          onLoadEnd={() => {
            // Workaround for a tricky race condition on initial load
            InteractionManager.runAfterInteractions(() => {
              setTimeout(() => {
                setViewRef(findNodeHandle(backgroundImageRef.current));
              }, 500);
            });
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
              <BlurView
                viewRef={viewRef}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                }}
                blurType="light"
                overlayColor={'rgba(0, 0, 255, 0)'}
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
                  <SecondaryButton
                    onPress={() => {
                      setShowSeed(true);
                    }}
                    text="View"
                    icon={
                      <FontAwesome
                        style={{
                          fontSize: 16,
                          color: colors.green5,
                          marginRight: 12,
                        }}
                        icon={RegularIcons.eye}
                      />
                    }
                  />
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
          <PrimaryButton
            onPress={() => {
              setStatus('confirm_seed');
              setShowSeed(false);
            }}
            text="Next"
            enableFlag={showSeed}
          />
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
          <PrimaryButton
            onPress={onPressSuccess}
            loading={successLoading}
            text="Success"
          />
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
            mnemonic={mnemonic}
          />
        )}
        {status === 'success' && successRender()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  createWallet: (data, beforeWork, successCallback, failCallback) =>
    createWallet(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletScreen);
