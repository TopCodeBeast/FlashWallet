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

import {colors, fonts} from '../../../../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import RBSheet from 'react-native-raw-bottom-sheet';
import GeneralRBSheet from './GeneralRBSheet';
import SecurityAndPrivacyRBSheet from './SecurityAndPrivacyRBSheet';

const backImage = require('../../../../assets/images/mainscreen/backimage.png');

const Preferences = ({navigation, onGoBack}) => {
  const refRBGeneralSheet = useRef(null);
  const refRBSecuritySheet = useRef(null);

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
        height={Dimensions.get('screen').height - 120}
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
        <GeneralRBSheet
          onPressClose={() => {
            if (refRBGeneralSheet && refRBGeneralSheet.current) {
              refRBGeneralSheet.current.close();
            }
          }}
        />
      </RBSheet>
    );
  };

  const renderSecurityAndPrivacyRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 120}
        ref={refRBSecuritySheet}
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
        <SecurityAndPrivacyRBSheet
          onPressClose={() => {
            if (refRBSecuritySheet && refRBSecuritySheet.current) {
              refRBSecuritySheet.current.close();
            }
          }}
        />
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
            () => {
              refRBSecuritySheet.current.open();
            },
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
        {renderSecurityAndPrivacyRBSheet()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Preferences;
