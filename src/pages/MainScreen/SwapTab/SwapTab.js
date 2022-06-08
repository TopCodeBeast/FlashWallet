import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import FontAwesome, {SolidIcons, RegularIcons} from 'react-native-fontawesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Header from './Header';
import CanSendTokenList from '../../../components/CanSendTokenList';
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons';

const SwapTab = ({navigation}) => {
  const onUseMaxPress = () => {};
  const [fromToken, setFromToken] = useState('main');
  const [toToken, setToToken] = useState('main');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('0');

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        <Header navigation={navigation} />

        {/* From panel */}
        <View style={{marginTop: 40, paddingHorizontal: 24}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...fonts.title2, color: 'white'}}>From</Text>
            <TouchableOpacity
              onPress={() => {
                onUseMaxPress();
              }}>
              <Text style={{...fonts.btn_medium_normal, color: colors.green5}}>
                Use Max
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 12,
              borderRadius: 8,
              borderColor: colors.grey22,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CanSendTokenList
              containerStyle={{
                borderWidth: 0,
                borderRadius: 0,
                borderColor: colors.grey22,
                borderRightWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                height: 120,
                width: 120,
              }}
              selectedToken={fromToken}
              onSelectToken={token => {
                setFromToken(token);
              }}
            />
            <View style={{paddingHorizontal: 12, flex: 1}}>
              <TextInput
                value={fromValue}
                placeholder={'0'}
                placeholderTextColor={colors.grey9}
                onChangeText={value => {
                  setFromValue(value);
                }}
                style={{
                  color: 'white',
                  ...fonts.big_type1,
                }}
              />
              <Text style={{...fonts.para_regular, color: 'white'}}>$ 0</Text>
            </View>
          </View>
        </View>

        {/* Middle panel */}
        <View style={{marginVertical: 24, alignItems: 'center'}}>
          <SecondaryButton
            icon={
              <Ionicon name="swap-vertical" size={32} color={colors.green5} />
            }
          />
        </View>

        {/* To panel */}
        <View style={{paddingHorizontal: 24}}>
          <Text style={{...fonts.title2, color: 'white'}}>To</Text>
          <View
            style={{
              marginTop: 12,
              borderRadius: 8,
              borderColor: colors.grey22,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CanSendTokenList
              containerStyle={{
                borderWidth: 0,
                borderRadius: 0,
                borderColor: colors.grey22,
                borderRightWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: 120,
              }}
              selectedToken={toToken}
              onSelectToken={token => {
                setToToken(token);
              }}
            />
            <View
              style={{
                paddingHorizontal: 12,
                flex: 1,
                height: '100%',
                backgroundColor: colors.grey23,
              }}>
              <TextInput
                value={toValue}
                onChangeText={value => {
                  setToValue(value);
                }}
                editable={false}
                selectTextOnFocus={false}
                style={{
                  color: 'white',
                  ...fonts.big_type1,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 40,
            marginHorizontal: 24,
          }}>
          <PrimaryButton
            text="Swap"
            onPress={() => {}}
            enableFlag={fromToken.length > 0}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SwapTab;
