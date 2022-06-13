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
import {ethers, utils} from 'ethers';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const WalletTab = ({
  navigation,
  currentNetwork,
  networks,
  gettingFeeDataTimerId,
  accounts,
  currentAccountIndex,
}) => {
  const tempTxn = {
    type: 2,
    chainId: 4,
    nonce: 56,
    maxPriorityFeePerGas: utils.parseEther('0.0000000015'),
    maxFeePerGas: utils.parseEther('0.000000001500000016'),
    gasPrice: null,
    gasLimit: ethers.BigNumber.from(21000),
    to: '0xB1e50315BbDa7D9Fd7e4F030e26eEC585A1Efc0c',
    value: utils.parseEther('0.001'),
    data: '0x',
    accessList: [],
    hash: '0xde8f5411d2d531817747a1ddab3ef4f25ffc721edb9f7ad3eed5dba864b27f84',
    v: 0,
    r: '0x60d1134a116991601e9f02d08c45f9e7c72bc738d58f5e46f3a4e232f40cf92d',
    s: '0x353d211b728e8a67ffdebe3fa5aedabb62c444c8a93816870fb17976b78d9da3',
    from: '0x632Bd9a598cd5c52F1625c850A6c46ECd4Cb7829',
    confirmations: 0,
  };
  const [selectedToken, setSelectedToken] = useState('');
  const [submittedTxn, setSubmittedTxn] = useState(tempTxn);
  const [submittedTxnTime, setSubmittedTxnTime] = useState('');
  const [submittedAccount, setSubmittedAccount] = useState(undefined);
  const [submittedNetworkRPC, setSubmittedNetworkRPC] = useState('');
  const refRBSendTokenSheet = useRef(null);
  const refRBReceiveTokenSheet = useRef(null);
  const refRBBuySheet = useRef(null);

  const refTxnRBSheet = useRef(null);

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

  const renderTxnRBSheet = () => {
    return (
      <RBSheet
        height={620}
        ref={refTxnRBSheet}
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
        <TxnRBSheet
          submittedTxn={submittedTxn}
          submittedTxnTime={submittedTxnTime}
          submittedAccount={submittedAccount}
          submittedNetworkRPC={submittedNetworkRPC}
          onClose={() => {
            refTxnRBSheet.current.close();
          }}
          onSubmittedNewTxn={(text1, text2) => {
            Toast.show({
              type: 'submitted',
              position: 'bottom',
              bottomOffset: 120,
              text1: text1,
              text2: text2,
            });
          }}
          onSuccessNewTxn={(text1, text2) => {
            Toast.show({
              type: 'success',
              position: 'bottom',
              bottomOffset: 120,
              text1: text1,
              text2: text2,
            });
          }}
          onFailNewTxn={(text1, text2) => {
            Toast.show({
              type: 'error',
              position: 'bottom',
              bottomOffset: 120,
              text1: text1,
              text2: text2,
            });
          }}
        />
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
        <SendToken
          isToken={false}
          onPressClose={() => {
            refRBSendTokenSheet.current.close();
          }}
          onSubmitTxn={originTxn => {
            setSubmittedNetworkRPC(networks[currentNetwork].rpc);
            setSubmittedTxn({...originTxn});
            const timeString = moment(new Date().valueOf())
              .format('MMM DD [at] hh:mm a')
              .toString();
            setSubmittedTxnTime(timeString);
            setSubmittedAccount(currentAccount);
            refRBSendTokenSheet.current.close();
            Toast.show({
              type: 'txnSubmitted',
              position: 'bottom',
              bottomOffset: 120,
              props: {
                transaction: {...originTxn},
                onPress: () => {
                  refTxnRBSheet.current.open();
                },
              },
            });
          }}
          onErrorOccured={error => {
            refRBSendTokenSheet.current.close();
            Toast.show({
              type: 'error',
              position: 'bottom',
              bottomOffset: 120,
              text1: 'Transaction failed',
              props: {
                error: error,
              },
            });
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
            {renderTxnRBSheet()}
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
