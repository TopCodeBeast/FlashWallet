import React, {useState, useRef} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import ComboBox from '../../../../components/ComboBox';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../../components/Buttons';
import ToggleSwitch from 'toggle-switch-react-native';
import RevealSeedRBSheet from './RevealSeedRBSheet';

const autoLockProps = require('../../../../constants').default.autoLockProps;

const SecurityAndPrivacyRBSheet = ({onPressClose}) => {
  const [signInWithFaceId, setSignInWithFaceId] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(true);
  const [inMetaMetrics, setInMetaMetrics] = useState(false);
  const [incomingTxn, setIncomingTxn] = useState(true);

  const refRBAutoLockSheet = useRef(null);
  const refRBRevealSeedSheet = useRef(null);

  const renderAutoLockRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refRBAutoLockSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
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
        <Text
          style={{
            marginTop: 12,
            color: 'white',
            ...fonts.title2,
            textAlign: 'center',
          }}>
          Auto-Lock
        </Text>
        <ScrollView style={{paddingHorizontal: 24, paddingBottom: 40}}>
          {autoLockProps.map(option => {
            return (
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginBottom: 12,
                }}
                key={'securityandprivacy_' + option.value}>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  {option.label}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </RBSheet>
    );
  };

  const revealSeedRBSheet = () => {
    return (
      <RBSheet
        height={550}
        ref={refRBRevealSeedSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
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
        <RevealSeedRBSheet
          onPressDone={() => {
            if (refRBRevealSeedSheet && refRBRevealSeedSheet.current) {
              refRBRevealSeedSheet.current.close();
            }
          }}
        />
      </RBSheet>
    );
  };

  return (
    <View style={{marginHorizontal: 24}}>
      {renderAutoLockRBSheet()}
      {revealSeedRBSheet()}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onPressClose}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...fonts.title2,
            color: 'white',
            textAlign: 'center',
            flex: 1,
          }}>
          Security &amp; Privacy
        </Text>
        <TouchableOpacity
          onPress={onPressClose}
          style={{flexDirection: 'row-reverse'}}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.times}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginTop: 40,
          marginBottom: 120,
        }}>
        <View>
          <Text style={{...fonts.title2, color: 'white'}}>Security</Text>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>
            Protect your wallet
          </Text>
          <Text
            style={{...fonts.para_regular, color: colors.grey9, marginTop: 12}}>
            Display fiat values in using o specific currency throughout the
            application
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 24,
            }}>
            <TextButton text="Back up" onPress={() => {}} />
            <PrimaryButton
              text="Reveal Seed Phrase"
              onPress={() => {
                refRBRevealSeedSheet.current.open();
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>
            Protect Your Wallet
          </Text>
          <Text
            style={{marginTop: 12, color: colors.grey9, ...fonts.para_regular}}>
            Display fiat values in using o specific currency throughout the
            application
          </Text>
          <View style={{marginTop: 24}}>
            <TextButton text="Change Password" onPress={() => {}} />
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>Auto-Lock</Text>
          <Text
            style={{marginTop: 12, color: colors.grey9, ...fonts.para_regular}}>
            Choose the amount of time before the application automatically locks
          </Text>
          <View style={{marginTop: 24}}>
            <ComboBox
              onPress={() => {
                refRBAutoLockSheet.current.open();
              }}>
              <Text style={{...fonts.para_semibold, color: 'white'}}>
                After 30 seconds
              </Text>
            </ComboBox>
          </View>
        </View>
        <View
          style={{marginTop: 40, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...fonts.title2, color: 'white'}}>
            Sign in with Fae ID?
          </Text>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
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
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>
            Show Private Key for &ldquo;Jersey Pinkman&rdquo;
          </Text>
          <Text
            style={{marginTop: 12, color: colors.grey9, ...fonts.para_regular}}>
            This is the private key for the current selected account: Account1.
            Never disclose this key. Anyone with your private key can fully
            control your account, including transferring away any of your funds.
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>Privacy</Text>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.title2, color: 'white'}}>
            Clear Privacy Data
          </Text>
          <Text
            style={{marginTop: 12, ...fonts.para_regular, color: colors.grey9}}>
            Clear Priacy data so all websites must request access to view
            account information again
          </Text>
          <View style={{marginTop: 24}}>
            <SecondaryButton text="Clear Privacy Data" enableFlag={false} />
          </View>
        </View>
        <View style={{marginTop: 40, marginHorizontal: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.title2, color: 'white'}}>Private Mode</Text>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              <ToggleSwitch
                isOn={privacyMode}
                onColor={colors.green5}
                offColor="grey"
                size="large"
                onToggle={isOn => setPrivacyMode(isOn)}
                animationSpeed={100}
                thumbOnStyle={{borderRadius: 6}}
                thumbOffStyle={{borderRadius: 6}}
                trackOnStyle={{borderRadius: 8, width: 68, height: 32}}
                trackOffStyle={{borderRadius: 8, width: 68, height: 32}}
              />
            </View>
          </View>
          <Text
            style={{marginTop: 16, ...fonts.para_regular, color: colors.grey9}}>
            Website must request access to view your account information
          </Text>
        </View>
        <View style={{marginTop: 40, marginHorizontal: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Participate in MetaMetrics
            </Text>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              <ToggleSwitch
                isOn={inMetaMetrics}
                onColor={colors.green5}
                offColor="grey"
                size="large"
                onToggle={isOn => setInMetaMetrics(isOn)}
                animationSpeed={100}
                thumbOnStyle={{borderRadius: 6}}
                thumbOffStyle={{borderRadius: 6}}
                trackOnStyle={{borderRadius: 8, width: 68, height: 32}}
                trackOffStyle={{borderRadius: 8, width: 68, height: 32}}
              />
            </View>
          </View>
          <Text
            style={{marginTop: 16, ...fonts.para_regular, color: colors.grey9}}>
            Participate in MetaMetrics to help us make DefiSquid better
          </Text>
        </View>
        <View style={{marginTop: 40, marginHorizontal: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Get Incoming Transactions
            </Text>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              <ToggleSwitch
                isOn={incomingTxn}
                onColor={colors.green5}
                offColor="grey"
                size="large"
                onToggle={isOn => setIncomingTxn(isOn)}
                animationSpeed={100}
                thumbOnStyle={{borderRadius: 6}}
                thumbOffStyle={{borderRadius: 6}}
                trackOnStyle={{borderRadius: 8, width: 68, height: 32}}
                trackOffStyle={{borderRadius: 8, width: 68, height: 32}}
              />
            </View>
          </View>
          <Text
            style={{marginTop: 16, ...fonts.para_regular, color: colors.grey9}}>
            Third party APIs (Etherscan are used to show your incoming
            transactions in the history. Turn off if you don’t want us to pull
            data from those service
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SecurityAndPrivacyRBSheet;
