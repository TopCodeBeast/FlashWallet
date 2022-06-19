import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  feeData,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import FontAwesome, {SolidIcons, RegularIcons} from 'react-native-fontawesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Header from './Header';
import CanSendTokenList from '../../../components/CanSendTokenList';
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons';
import {getPriceData} from '../../../utils/swap';
import SwapConfirmBnb from './SwapConfirmBnb';
import {
  getFeeData,
  setGettingFeeDataTimerId,
} from '../../../redux/actions/EngineAction';
import {
  estimateGasRatio,
  gettingFeeDataTimerInterval,
  minimumEthToSwap,
  swapGasRatio,
  uniswapGasLimit,
} from '../../../engine/constants';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';
import {swapTokenBnb} from '../../../redux/actions/SwapActionBnb';

const SwapTabBnb = ({
  navigation,
  networks,
  currentNetwork,
  feeData,
  getFeeData,
  setGettingFeeDataTimerId,
  accounts,
  currentAccountIndex,
  balancesInfo,
  swapTokenBnb,
  onSubmitTxn,
  onErrorOccured,
}) => {
  const [fromToken, setFromToken] = useState('main');
  const [toToken, setToToken] = useState('main');
  const [fromValue, setFromValue] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [canSwap, setCanSwap] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchedPriceData, setFetchedPriceData] = useState('');
  const [status, setStatus] = useState('default');
  const [gasLimit, setGasLimit] = useState('200000');
  const [gasPrice, setGasPrice] = useState(feeData.medium.gasPrice);
  const [slippage, setSlippage] = useState('2');
  const [swapLoading, setSwapLoading] = useState(false);

  const currentAccount = accounts[currentAccountIndex];
  const currentNetworkSymbol = networks[currentNetwork].symbol;

  const onCloseTab = () => {
    console.log('close Tab;;;;;;;;;');
    setFromToken('main');
    setToToken('main');
    setFromValue('');
    setCanSwap(false);
    setFetchLoading(false);
    setFetchedPriceData('');
    setStatus('default');
    setGasLimit('200000');
    setMaxPriorityFee(feeData.medium.maxPriorityFeePerGas);
    setGasPrice(feeData.medium.gasPrice);
    setSlippage('2');
  };

  const onConfirm = () => {
    const mainBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address]['main']
      : 0;
    const curBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address][
          fromToken === 'main' ? 'main' : fromToken.tokenAddress
        ]
        ? parseFloat(
            balancesInfo[currentAccount.address][
              fromToken === 'main' ? 'main' : fromToken.tokenAddress
            ],
          )
        : 0
      : 0;
    if (fromToken == 'main') {
      if (fromValue + minimumEthToSwap > curBalance) {
        setConfirmError('Not Enough ' + currentNetworkSymbol);
        return;
      }
    } else {
      if (fromValue > curBalance) {
        setConfirmError('Not Enough ' + fromToken.tokenSymbol);
        return;
      }
      if (mainBalance < minimumEthToSwap) {
        setConfirmError('Not Enough ' + currentNetworkSymbol + ' to Swap');
        return;
      }
    }
    setStatus('confirm');
  };

  const onSwap = () => {
    swapTokenBnb(
      {
        currentNetwork: networks[currentNetwork],
        currentAccount,
        fromTokenData: fromToken,
        toTokenData: toToken,
        fromValue,
        toValue,
        slippage,
        gasLimit,
      },
      () => {
        setSwapLoading(true);
      },
      originTxn => {
        setSwapLoading(false);
        onSubmitTxn(originTxn);
      },
      error => {
        setSwapLoading(false);
        onErrorOccured(error);
      },
    );
  };

  useEffect(() => {
    getFeeData(networks[currentNetwork]);
  }, []);

  const statusGoBack = curStatus => {
    if (curStatus === 'confirm') {
      setStatus('default');
    }
  };

  const getSwapGasFee = () => {
    return (
      parseFloat(utils.formatEther(feeData.high.gasPrice)) *
      uniswapGasLimit *
      swapGasRatio
    );
  };

  const fetchPriceData = data => {
    const {fromToken, toToken, fromValue} = data;
    setFetchLoading(true);
    setFetchedPriceData('');
    getPriceData(networks[currentNetwork], fromToken, toToken)
      .then(res => {
        setFetchLoading(false);
        // console.log('Fetched price::::::', res);
        setFetchedPriceData(res);
      })
      .catch(err => {
        setFetchLoading(false);
        console.log('Fail Fetch price::::::', err);
        setFetchedPriceData('');
        setCanSwap(false);
      });
  };

  const changeEachToken = () => {
    if (
      (fromToken == 'main' && toToken == 'main') ||
      (fromToken != 'main' &&
        toToken != 'main' &&
        fromToken.tokenAddress == toToken.tokenAddress)
    ) {
      return;
    }
    const temp = fromToken == 'main' ? 'main' : {...fromToken};
    setFromToken(toToken == 'main' ? 'main' : {...toToken});
    setToToken(temp);
    fetchPriceData({fromToken: toToken, toToken: temp});
    setConfirmError('');
  };

  const calcMaxAmount = () => {
    const curBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address][
          fromToken === 'main' ? 'main' : fromToken.tokenAddress
        ]
        ? parseFloat(
            balancesInfo[currentAccount.address][
              fromToken === 'main' ? 'main' : fromToken.tokenAddress
            ],
          )
        : 0
      : 0;
    setFromValue(
      Math.max(
        0,
        parseFloat(
          fromToken === 'main' ? curBalance - getSwapGasFee() : curBalance,
        ),
      ).toString(),
    );
  };

  const checkCanSwap = data => {
    const {fromToken, toToken, fromValue} = data;
    if (fromToken == 'main' && toToken == 'main') {
      setCanSwap(false);
      setFetchLoading(false);
      setFetchedPriceData('');
      return;
    }
    if (
      fromToken != 'main' &&
      toToken != 'main' &&
      fromToken.tokenAddress == toToken.tokenAddress
    ) {
      setCanSwap(false);
      setFetchLoading(false);
      setFetchedPriceData('');
      return;
    }
    if (parseFloat(fromValue) != Number(fromValue)) {
      setCanSwap(false);
      setFetchLoading(false);
      setFetchedPriceData('');
      return;
    }
    if (!fetchLoading) {
      fetchPriceData(data);
    }
    if (!canSwap) {
      setCanSwap(true);
    }
  };

  const toValue =
    (fromToken == 'main' && toToken == 'main') ||
    (fromToken != 'main' &&
      toToken != 'main' &&
      fromToken.tokenAddress == toToken.tokenAddress)
      ? fromValue
      : fetchedPriceData.length > 0 &&
        parseFloat(fromValue) === Number(fromValue)
      ? (parseFloat(fromValue) / parseFloat(fetchedPriceData)).toFixed(6)
      : fromValue.length === 0
      ? '0'
      : parseFloat(fromValue) !== Number(fromValue)
      ? 'NaN'
      : '...';

  const renderDefaultStatus = () => {
    return (
      <>
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
                calcMaxAmount();
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
                checkCanSwap({toToken, fromToken: token, fromValue});
              }}
            />
            <View style={{paddingHorizontal: 12, flex: 1}}>
              <TextInput
                value={fromValue}
                placeholder={'0'}
                placeholderTextColor={colors.grey9}
                onChangeText={value => {
                  setConfirmError('');
                  setFromValue(value);
                  checkCanSwap({toToken, fromToken, fromValue: value});
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

        {confirmError.length > 0 && (
          <Text
            style={{
              paddingLeft: 40,
              paddingTop: 12,
              ...fonts.para_semibold,
              color: colors.red5,
            }}>
            {confirmError}
          </Text>
        )}

        {/* Middle panel */}
        <View style={{marginVertical: 24, alignItems: 'center'}}>
          <SecondaryButton
            onPress={() => {
              changeEachToken();
            }}
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
                checkCanSwap({toToken: token, fromToken, fromValue});
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
                editable={false}
                selectTextOnFocus={false}
                style={{
                  color: 'white',
                  ...fonts.big_type1,
                }}
              />
            </View>
          </View>
          {fetchLoading && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <ActivityIndicator size={'small'} color={colors.green5} />
              <Text
                style={{
                  marginLeft: 12,
                  ...fonts.para_regular,
                  color: colors.grey9,
                }}>
                Fetching Price Data...
              </Text>
            </View>
          )}
          {fetchedPriceData.length > 0 && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <FontAwesome
                onPress={() => {
                  fetchPriceData({fromToken, toToken, fromValue});
                }}
                style={{paddingLeft: 8, fontSize: 16, color: 'white'}}
                icon={SolidIcons.redo}
              />
              <Text
                style={{
                  marginLeft: 12,
                  ...fonts.para_regular,
                  color: colors.grey9,
                }}>
                {'1 ' +
                  (toToken == 'main'
                    ? currentNetworkSymbol
                    : toToken.tokenSymbol) +
                  ' = ' +
                  parseFloat(fetchedPriceData).toFixed(4) +
                  ' ' +
                  (fromToken == 'main'
                    ? currentNetworkSymbol
                    : fromToken.tokenSymbol)}
              </Text>
            </View>
          )}
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
        <Header
          navigation={navigation}
          status={status}
          statusGoBack={status => statusGoBack(status)}
          onCloseTab={() => {
            onCloseTab();
          }}
        />

        {status === 'default' && renderDefaultStatus()}
        {status === 'confirm' && (
          <SwapConfirmBnb
            swapData={{
              fromToken,
              toToken,
              fromValue,
              toValue,
              inversePrice: fetchedPriceData,
              slippage,
            }}
            navigation={navigation}
            setSlippage={value => {
              setSlippage(value);
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 40,
            marginHorizontal: 24,
          }}>
          {status === 'default' && (
            <PrimaryButton
              text="Swap"
              onPress={() => {
                onConfirm();
              }}
              enableFlag={canSwap && !fetchLoading}
            />
          )}
          {status === 'confirm' && (
            <PrimaryButton
              text="Swap"
              onPress={() => {
                onSwap();
              }}
              loading={swapLoading}
            />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  tokens: state.tokens.tokensData,
  feeData: state.engine.feeData,
  gettingFeeDataTimerId: state.engine.gettingFeeDataTimerId,
  balancesInfo: state.balances.balancesInfo,
});
const mapDispatchToProps = dispatch => ({
  getFeeData: currentNetworkObject =>
    getFeeData(dispatch, currentNetworkObject),
  setGettingFeeDataTimerId: timerId =>
    setGettingFeeDataTimerId(dispatch, timerId),
  swapTokenBnb: (data, beforeWork, successCallback, failCallback) =>
    swapTokenBnb(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapTabBnb);
