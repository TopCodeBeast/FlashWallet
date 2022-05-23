import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
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
import Preferences from './Preferences';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const SettingsTab = ({navigation}) => {
  const [showStatus, setShowStatus] = useState('default');

  useEffect(() => {
    return () => {};
  });

  const renderSettingsRow = (icon, name, onPress) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          marginVertical: 8,
        }}
        onPress={onPress}>
        <View>{icon}</View>
        <View style={{marginLeft: 16}}>
          <Text style={{...fonts.title2, color: 'white'}}>{name}</Text>
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

  const MainSettingsTab = () => {
    return (
      <>
        <Image
          source={backImage}
          style={{position: 'absolute', right: '-15%', top: '10%'}}
        />
        <View
          style={{paddingTop: 44, paddingHorizontal: 16, paddingBottom: 10}}>
          <Text style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
            Settings
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 24,
            height: '100%',
          }}>
          {renderSettingsRow(
            <FontAwesome
              style={{
                fontSize: 32,
                color: 'white',
              }}
              icon={RegularIcons.userCircle}
            />,
            'Account',
            () => {},
          )}
          {renderSettingsRow(
            <AntIcon name="sharealt" size={32} color="white" />,
            'Share My Public Address',
            () => {},
          )}
          {renderSettingsRow(
            <AntIcon name="eyeo" size={32} color="white" />,
            'View on Etherscan',
            () => {},
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.preferenceIconSvgXml} />,
            'Preferences',
            () => {
              console.log(showStatus);
              setShowStatus('prefereneces');
            },
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.getHelpIconSvgXml} />,
            'Get Help',
            () => {},
          )}
          {renderSettingsRow(
            <SvgXml xml={fonts.sendFeedBackIconSvgXml} />,
            'Send Feed back',
            () => {},
          )}
          <View
            style={{
              bottom: -200,
              position: 'relative',
              flex: 1,
              flexDirection: 'column-reverse',
            }}>
            {renderSettingsRow(
              <SvgXml xml={fonts.logoutIconSvgXml} />,
              'Log out',
              () => {},
            )}
          </View>
        </View>
      </>
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
        {showStatus === 'default' && <MainSettingsTab />}
        {showStatus === 'prefereneces' && (
          <Preferences
            onGoBack={() => {
              setShowStatus('default');
            }}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SettingsTab;
