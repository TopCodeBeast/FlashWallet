import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
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
} from 'react-native-fontawesome';

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
import SendToken from './SendToken/SendToken';
import RBSheet from 'react-native-raw-bottom-sheet';
import NetworkBalance from './NetworkBalance';
import ReceiveToken from './ReceiveToken/ReceiveToken';
import BuyToken from './BuyToken/BuyToken';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import TxnRBSheet from './TxnRBSheet';
import SendTokenBnb from './SendToken/SendTokenBnb';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const WalletTab = ({
  navigation,
  currentNetwork,
  networks,
  gettingFeeDataTimerId,
  accounts,
  currentAccountIndex,
  onSendSubmittedTxn,
  onSendError,
}) => {
  const [selectedToken, setSelectedToken] = useState('');

  const refRBSendTokenSheet = useRef(null);
  const refRBReceiveTokenSheet = useRef(null);
  const refRBBuySheet = useRef(null);

  useEffect(() => {
    return () => {
      // console.warn('wallet tab is gone');
    };
  });

  const currentAccount = accounts[currentAccountIndex];

  const renderBuyRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 150}
        onClose={() => {
          clearTimeout(gettingFeeDataTimerId);
        }}
        ref={refRBBuySheet}
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
        <BuyToken
          onPressClose={() => {
            refRBBuySheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const renderReceiveTokenRBSheet = () => {
    return (
      <RBSheet
        height={600}
        ref={refRBReceiveTokenSheet}
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
        <ReceiveToken token={'main'} />
      </RBSheet>
    );
  };

  const renderTransactionButtonGroup = () => {
    return (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {
              refRBSendTokenSheet.current.open();
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
            onPress={() => {
              refRBReceiveTokenSheet.current.open();
            }}
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
            onPress={() => {
              refRBBuySheet.current.open();
            }}
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

  const renderSendTokenRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 100}
        ref={refRBSendTokenSheet}
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
        {networks[currentNetwork].chainType === 'ethereum' && (
          <SendToken
            isToken={false}
            onPressClose={() => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
            }}
            onSubmitTxn={originTxn => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
              onSendSubmittedTxn(originTxn);
            }}
            onErrorOccured={error => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
              onSendError(error);
            }}
          />
        )}
        {networks[currentNetwork].chainType === 'binance' && (
          <SendTokenBnb
            isToken={false}
            onPressClose={() => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
            }}
            onSubmitTxn={originTxn => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
              onSendSubmittedTxn(originTxn);
            }}
            onErrorOccured={error => {
              if (refRBSendTokenSheet && refRBSendTokenSheet.current) {
                refRBSendTokenSheet.current.close();
              }
              onSendError(error);
            }}
          />
        )}
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
        {/* <TouchableOpacity
          style={{width: 100, height: 100, backgroundColor: 'red'}}
          onPress={() => {
            Toast.show({
              type: 'txnCancelled',
              position: 'bottom',
              bottomOffset: 120,
              props: {
                transaction: {},
                onPress: () => {
                  setSubmittedTxn(tempTxn);
                  const timeString = moment(new Date().valueOf())
                    .format('MMM DD [at] hh:mm a')
                    .toString();
                  setSubmittedTxnTime(timeString);
                  setSubmittedAccount(accounts[currentAccountIndex]);
                  refTxnRBSheet.current.open();
                },
              },
            });
          }}></TouchableOpacity> */}
        {selectedToken.length > 0 && (
          <>
            <TokenShow
              onBackPress={() => {
                setSelectedToken('');
              }}
            />
          </>
        )}
        {!selectedToken && (
          <>
            {renderSendTokenRBSheet()}
            {renderReceiveTokenRBSheet()}
            {renderBuyRBSheet()}
            <Header navigation={navigation} />
            <Image
              source={backImage}
              style={{position: 'absolute', right: '-15%', top: '10%'}}
            />
            {/* <View style={{height: '20%'}}></View> */}
            <NetworkBalance />
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

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  gettingFeeDataTimerId: state.engine.gettingFeeDataTimerId,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTab);
