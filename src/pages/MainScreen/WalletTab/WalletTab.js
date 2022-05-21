import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Header from './Header';
import TokenAndCollectiblesTab from './TokenAndCollectibleTab';

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../components/Buttons';
import TokenShow from './TokenShow/TokenShow';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const WalletTab = ({navigation}) => {
  const [selectedToken, setSelectedToken] = useState('');

  useEffect(() => {
    return () => {};
  });

  const renderNetworkBalance = () => {
    return (
      <View style={{marginLeft: 24, marginTop: 24}}>
        <View>
          <MaskedView
            maskElement={<Text style={{...fonts.big_type1}}>9.2363 ETH</Text>}>
            <LinearGradient colors={colors.gradient8}>
              <Text style={{...fonts.big_type1, opacity: 0}}>9.2363 ETH</Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={{marginTop: 24, flexDirection: 'row'}}>
          <View>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              $16,858.15
            </Text>
          </View>
          <View style={{marginLeft: 8}}>
            <Text style={{...fonts.para_regular, color: colors.green5}}>
              +0.7%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTransactionButtonGroup = () => {
    return (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 40,
        }}>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {}}
            text="Send"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowUp}
              />
            }
          />
        </View>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {}}
            text="Receive"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowDown}
              />
            }
          />
        </View>
        <View>
          <SecondaryButton
            onPress={() => {}}
            text="Buy"
            icon={<SvgXml style={{marginRight: 16}} xml={buyIconSvgXml} />}
          />
        </View>
      </View>
    );
  };

  const tokenRowPressed = token => {
    setSelectedToken(token);
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        {selectedToken.length > 0 && (
          <TokenShow
            backPressed={() => {
              setSelectedToken('');
            }}
          />
        )}
        {!selectedToken && (
          <>
            <Header />
            <Image
              source={backImage}
              style={{position: 'absolute', right: '-15%', top: '10%'}}
            />
            {/* <View style={{height: '20%'}}></View> */}
            {renderNetworkBalance()}
            {renderTransactionButtonGroup()}
            <TokenAndCollectiblesTab
              navigation={navigation}
              tokenPressed={tokenRowPressed}
            />
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default WalletTab;
