import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import Header from './Header';

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../../components/Buttons';
import HistoryRow from './HistoryRow';
import {Avatar} from 'react-native-elements';
import SendToken from '../SendToken/SendToken';
import BalanceText from '../../../../components/BalanceText';
import TokenBalanceText from '../../../../components/TokenBalanceText';

const backImage = require('../../../../assets/images/mainscreen/backimage.png');

const tokenBalance = 19.2371;
const usdAmount = 226.69;

const TokenShow = ({
  navigation,
  networks,
  currentNetwork,
  accounts,
  currentAccountIndex,
  selectedToken,
}) => {
  const refRBTokenSendSheet = useRef(null);
  const [sendAddress, setSendAddress] = useState('');

  useEffect(() => {
    console.log(selectedToken);
    return () => {};
  });

  const currentAccount = accounts[currentAccountIndex];

  const renderNetworkBalance = () => {
    return (
      <>
        {selectedToken === 'main' ? (
          <View style={{marginLeft: 24, marginTop: 24}}>
            <View>
              <MaskedView
                maskElement={
                  <BalanceText
                    style={{...fonts.big_type1}}
                    address={currentAccount.address}
                  />
                }>
                <LinearGradient colors={colors.gradient8}>
                  <BalanceText
                    style={{...fonts.big_type1, opacity: 0}}
                    address={currentAccount.address}
                  />
                </LinearGradient>
              </MaskedView>
            </View>
            <View style={{marginTop: 24}}>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                {'$' +
                  parseFloat(tokenBalance * usdAmount)
                    .toFixed(4)
                    .toString()}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{marginLeft: 24, marginTop: 24}}>
            <View>
              <MaskedView
                maskElement={
                  <TokenBalanceText
                    address={currentAccount.address}
                    token={selectedToken}
                    style={{...fonts.big_type1}}
                  />
                }>
                <LinearGradient colors={colors.gradient8}>
                  <TokenBalanceText
                    address={currentAccount.address}
                    token={selectedToken}
                    style={{...fonts.big_type1, opacity: 0}}
                  />
                </LinearGradient>
              </MaskedView>
            </View>
            <View style={{marginTop: 24}}>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                {'$' +
                  parseFloat(tokenBalance * usdAmount)
                    .toFixed(4)
                    .toString()}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const renderTransactionButtonGroup = () => {
    return (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          marginTop: 40,
        }}>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {
              refRBTokenSendSheet.current.open();
            }}
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
      </View>
    );
  };

  const renderHistoryPanel = () => {
    return (
      <ScrollView style={{marginHorizontal: 24, marginVertical: 40}}>
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={0.04}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={2.35}
          amount={2.14}
          fee={0.21}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={1.876}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={1.12}
          amount={0.99}
          fee={0.23}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'received'}
          resultType="confirmed"
          totalAmount={2.04}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
        <HistoryRow
          transactionType={'sent'}
          resultType="cancelled"
          totalAmount={0.54}
          amount={0.18}
          fee={0.36}
          unit="BNB"
          from="0x154710078025b92c6C2F01AF950C1DDEb23F7FeB"
          to="0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996"
          nonce="#0"
        />
      </ScrollView>
    );
  };

  const renderTokenSendRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 100}
        ref={refRBTokenSendSheet}
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
        <SendToken
          onPressClose={() => {
            refRBTokenSendSheet.current.close();
          }}
          isToken={false}
        />
      </RBSheet>
    );
  };

  return (
    <View style={{height: '100%', backgroundColor: colors.grey24}}>
      <Header
        tokenName={selectedToken === 'main' ? 'ETH' : selectedToken.tokenSymbol}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={backImage}
        style={{position: 'absolute', right: '-15%', top: '10%'}}
      />
      {renderNetworkBalance()}
      {renderTransactionButtonGroup()}
      {renderHistoryPanel()}
      {renderTokenSendRBSheet()}
    </View>
  );
};

const mapStateToProps = state => ({
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  selectedToken: state.tokens.selectedToken,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TokenShow);
