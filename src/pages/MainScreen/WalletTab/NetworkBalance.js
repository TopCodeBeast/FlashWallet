import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {colors, fonts} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import BalanceText from '../../../components/BalanceText';

const NetworkBalance = ({navigation, accounts, currentAccountIndex}) => {
  return (
    <View style={{marginLeft: 24, marginTop: 24}}>
      <View>
        <MaskedView
          maskElement={
            accounts && accounts[currentAccountIndex] ? (
              <BalanceText
                style={{...fonts.big_type1}}
                address={accounts[currentAccountIndex].address}
              />
            ) : (
              <Text style={{...fonts.big_type1}}>0 ETH</Text>
            )
          }>
          <LinearGradient colors={colors.gradient8}>
            {accounts && accounts[currentAccountIndex] ? (
              <BalanceText
                style={{...fonts.big_type1, opacity: 0}}
                address={accounts[currentAccountIndex].address}
              />
            ) : (
              <Text style={{...fonts.big_type1, opacity: 0}}>0 ETH</Text>
            )}
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

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkBalance);
