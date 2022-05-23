import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors, fonts} from '../../../styles';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../components/Buttons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ComboBox from '../../../components/ComboBox';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const Preferences = ({navigation, onGoBack}) => {
  const refRBGeneralSheet = useRef(null);
  const [privateCurrency, setPrivateCurrency] = useState('native');

  useEffect(() => {
    return () => {};
  });

  const renderSettingsRow = (icon, name, onPress, info) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          marginVertical: 8,
        }}
        onPress={onPress}>
        <View>{icon ? icon : <></>}</View>
        <View style={{marginLeft: icon ? 16 : 0, marginRight: 16}}>
          <Text style={{...fonts.title2, color: 'white'}}>{name}</Text>
          <Text
            style={{
              ...fonts.caption_small12_18_regular,
              color: colors.grey9,
              marginTop: 8,
            }}>
            {info}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronRight}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingTop: 44,
          paddingHorizontal: 16,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            onGoBack();
          }}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
            Preferences
          </Text>
        </View>
      </View>
    );
  };

  const renderGeneralRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 150}
        ref={refRBGeneralSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 24,
            }}>
            <TouchableOpacity
              onPress={() => {
                refRBGeneralSheet.current.close();
              }}>
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
              General
            </Text>
            <TouchableOpacity
              onPress={() => {
                refRBGeneralSheet.current.close();
              }}
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
          <ScrollView style={{marginTop: 40, marginHorizontal: 24}}>
            <View style={{marginTop: 40}}>
              <View>
                <Text style={{...fonts.title2, color: 'white'}}>
                  Currency Conversion
                </Text>
                <Text
                  style={{
                    ...fonts.para_regular,
                    color: colors.grey9,
                    marginTop: 8,
                  }}>
                  Display fiat values in using o specific currency throughout
                  the application
                </Text>
              </View>
              <View style={{marginTop: 24}}>
                <ComboBox>
                  <Text style={{...fonts.para_semibold, color: 'white'}}>
                    USD-United State Dollar
                  </Text>
                </ComboBox>
              </View>
            </View>
            <View style={{marginTop: 40}}>
              <View>
                <Text style={{...fonts.title2, color: 'white'}}>
                  Privacy Currency
                </Text>
                <Text
                  style={{
                    ...fonts.para_regular,
                    color: colors.grey9,
                    marginTop: 8,
                  }}>
                  Select Native to prioritize displaying values in the native
                  currency of the chain (e.g. ETH). Select Fiat to prioritize
                  displaying values in your selected fiat currency
                </Text>
              </View>
              <View style={{marginTop: 24, flexDirection: 'row'}}></View>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
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
        <Image
          source={backImage}
          style={{position: 'absolute', right: '-15%', top: '10%'}}
        />
        {renderHeader()}
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 24,
            height: '100%',
          }}>
          {renderSettingsRow(
            undefined,
            'General',
            () => {
              refRBGeneralSheet.current.open();
            },
            'Currency conversion, primary currency, language and search engine',
          )}
          {renderSettingsRow(
            undefined,
            'Security & Privacy',
            () => {},
            'Privacy settings, private key and wallet seed phrase',
          )}
          {renderSettingsRow(
            undefined,
            'Advanced',
            () => {},
            'Access developer features, reset account, setup testnets, sync extension, state logs,...',
          )}
          {renderSettingsRow(
            undefined,
            'Contracts',
            () => {},
            'Add, edit, remove, and manage your accounts',
          )}
          {renderSettingsRow(
            undefined,
            'Networks',
            () => {},
            'Add and edit custom RPC networks',
          )}
          {renderSettingsRow(undefined, 'Experimental', () => {}, 'About DeGe')}
        </View>
        {renderGeneralRBSheet()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Preferences;
