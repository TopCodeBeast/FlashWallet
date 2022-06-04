import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import {PrimaryButton} from '../../../../components/Buttons';
import ToggleSwitch from 'toggle-switch-react-native';
import FloatLabelInput from '../../../../components/FloatLabelInput';
import {checkAuthentication} from '../../../../utils/auth';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useColorModeValue} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CustomToast from '../../../../components/CustomToast';
import Toast from 'react-native-toast-message';
import {loadMnemonic} from '../../../../utils/mnemonic';
import Clipboard from '@react-native-clipboard/clipboard';

const RevealSeedRBSheet = ({onPressDone}) => {
  const [status, setStatus] = useState('check');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [nextLoading, setNextLoading] = useState(false);

  const [seedPhrase, setSeedPhrase] = useState('asdfasdfasdfsafd');

  const [curTabIndex, setCurTabIndex] = useState(0);
  const [tabRoutes] = useState([
    {
      key: 'first',
      title: 'Text',
    },
    {
      key: 'second',
      title: 'QR Code',
    },
  ]);

  const onPressNext = () => {
    setNextLoading(true);
    checkAuthentication(
      password,
      () => {
        setNextLoading(false);
        setStatus('done');
        loadMnemonic(
          mnemonic => {
            setSeedPhrase(mnemonic);
          },
          () => {
            console.log('Fail on load mnemonic');
          },
        );
      },
      () => {
        setNextLoading(false);
        setError("Passsword isn't correct.");
      },
      () => {
        console.log('ERROR in reveal seed phrase');
        setNextLoading(false);
        setError('Something went wrong.');
      },
    );
  };

  const onPressCopy = () => {
    Clipboard.setString(seedPhrase);
    Toast.show({
      type: 'copy',
      position: 'bottom',
      text1: 'Copied on the clipboard',
      bottomOffset: 120,
      props: {
        color: colors.green5,
      },
    });
  };

  const renderCheckPanel = () => {
    return (
      <>
        <View style={{marginTop: 40}}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            If you ever change browser or move computers, you will need this
            seed phrase to access your accounts. Save them somewhere safe and
            secret
          </Text>
          <Text
            style={{
              marginTop: 24,
              ...fonts.para_regular,
              color: colors.grey9,
            }}>
            <Text style={{...fonts.para_semibold, color: colors.red5}}>
              DO NOT
            </Text>{' '}
            share this phrase with anymore! These words can be used to steal all
            your accounts
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <FloatLabelInput
            value={password}
            isPassword
            onChangeText={value => setPassword(value)}
            label="Enter password to continue"
          />
          {error.length > 0 && (
            <Text
              style={{
                marginTop: 8,
                marginLeft: 16,
                color: colors.red5,
                ...fonts.caption_small12_16_semibold,
              }}>
              {error}
            </Text>
          )}
        </View>
      </>
    );
  };

  const renderDonePanel = () => {
    const TextRoute = () => {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              marginTop: 24,
              padding: 16,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.grey12,
            }}>
            <Text
              style={{
                ...fonts.caption_small12_16_regular,
                color: colors.grey12,
              }}>
              Seed Phrase
            </Text>
            <Text style={{...fonts.title1, color: 'white'}}>{seedPhrase}</Text>
          </View>
          <View
            style={{
              marginTop: 40,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                onPressCopy();
              }}>
              <FontAwesome
                style={{
                  fontSize: 16,
                  color: colors.green5,
                  marginRight: 12,
                }}
                icon={RegularIcons.copy}
              />
              <Text style={{color: colors.green5, ...fonts.btn_large_normal}}>
                Copy to Clipboard
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const QRCodeRoute = () => {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <QRCode value={seedPhrase} size={200} />
        </View>
      );
    };

    const initialLayout = {
      width: Dimensions.get('window').width,
    };
    const renderScene = SceneMap({
      first: TextRoute,
      second: QRCodeRoute,
    });

    const renderTabBar = props => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      return (
        <View style={{flexDirection: 'row'}}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            });
            const color =
              curTabIndex === i
                ? useColorModeValue('white', colors.grey12)
                : useColorModeValue(colors.grey12, colors.grey12);

            return (
              <View
                key={'revealseedrbsheet' + i}
                style={{
                  marginHorizontal: 24,
                  borderBottomWidth: curTabIndex === i ? 3 : 0,
                  borderColor: 'white',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    setCurTabIndex(i);
                  }}>
                  <Animated.Text
                    style={{
                      color,
                    }}>
                    {route.title}
                  </Animated.Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      );
    };

    return (
      <View style={{height: '80%'}}>
        <TabView
          style={{marginTop: 24}}
          navigationState={{index: curTabIndex, routes: tabRoutes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setCurTabIndex}
          initialLayout={initialLayout}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          marginHorizontal: 24,
        }}>
        <View>
          <Text
            style={{
              marginTop: 12,
              ...fonts.title2,
              color: 'white',
              textAlign: 'center',
            }}>
            Reveal Seed Phrase
          </Text>
          {status === 'check' && renderCheckPanel()}
          {status === 'done' && renderDonePanel()}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 60,
          }}>
          {status === 'check' && (
            <PrimaryButton
              loading={nextLoading}
              text="Next"
              onPress={onPressNext}
              enableFlag={password.length > 0}
            />
          )}
          {status === 'done' && (
            <PrimaryButton text="Done" onPress={onPressDone} />
          )}
        </View>
      </View>
      <CustomToast />
    </>
  );
};
export default RevealSeedRBSheet;
