import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../../../styles';

import {getSwapEstimatedGasLimit} from '../../../utils/swap';
import RBSheet from 'react-native-raw-bottom-sheet';
import SlippageRBSheet from './SlippageRBSheet';
import {
  getFeeData,
  setGettingFeeDataTimerId,
} from '../../../redux/actions/EngineAction';
import {gettingFeeDataTimerInterval} from '../../../engine/constants';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';
import NetworkFeeRBSheetBnb from '../../../components/NetworkFeeRBSheetBnb';

const SwapConfirmBnb = ({
  navigation,
  accounts,
  currentAccountIndex,
  networks,
  currentNetwork,
  swapData,
  feeData,
  getFeeData,
  setGettingFeeDataTimerId,
  gettingFeeDataTimerId,
  setSlippage,
}) => {
  const {fromToken, toToken, fromValue, toValue, inversePrice} = swapData;
  const currentNetworkSymbol = networks[currentNetwork].symbol;

  const refSlippageRBSheet = useRef(null);
  const refRBNetworkFeeSheet = useRef(null);

  const [networkFeeType, setNetworkFeeType] = useState('medium');
  const [gasPrice, setGasPrice] = useState(feeData.medium.gasPrice);

  const [gasLimit, setGasLimit] = useState('200000');
  const [fetchingGasLimit, setFetchingGasLimit] = useState(false);

  const currentAccount = accounts[currentAccountIndex];

  useEffect(() => {
    getEstimatedGasLimit();
  }, []);

  const getEstimatedGasLimit = () => {
    setFetchingGasLimit(true);
    getSwapEstimatedGasLimit({
      currentNetwork: networks[currentNetwork],
      currentAccount,
      fromTokenData: fromToken,
      toTokenData: toToken,
      fromValue,
      toValue,
      slippage: swapData.slippage,
    })
      .then(res => {
        setFetchingGasLimit(false);
        setGasLimit(res.toString());
      })
      .catch(err => {
        console.log('ERROR in swap confirm::::: ', err);
        setFetchingGasLimit(false);
      });
  };

  const renderSlippageRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refSlippageRBSheet}
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
        <SlippageRBSheet
          slippage={swapData.slippage}
          onSaveSlippage={value => {
            setSlippage(value);
            getEstimatedGasLimit();
            refSlippageRBSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const renderNetworkFeeRBSheet = () => {
    return (
      <RBSheet
        height={700}
        ref={refRBNetworkFeeSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        onOpen={() => {
          const timerId = setInterval(() => {
            console.log(
              '...geting FEE data from swap confirm network fee rb sheet',
            );
            getFeeData(networks[currentNetwork]);
          }, gettingFeeDataTimerInterval);
          setGettingFeeDataTimerId(timerId);
        }}
        onClose={() => {
          clearTimeout(gettingFeeDataTimerId);
        }}
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
        <NetworkFeeRBSheetBnb
          networkFeeType={networkFeeType}
          gasPrice={gasPrice}
          gasLimit={gasLimit}
          onSave={({type, data}) => {
            if (type !== 'advanced') {
              setNetworkFeeType(type);
              setGasPrice(feeData[type].gasPrice);
              setGasLimit(parseInt(data.gasLimit));
            } else {
              setNetworkFeeType('advanced');
              setGasPrice(utils.parseUnits(data.gasPrice, 'gwei'));
              setGasLimit(parseInt(data.gasLimit));
            }
            refRBNetworkFeeSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const totalFee =
    parseFloat(
      utils.formatEther(utils.parseUnits(gasPrice.toString(), 'wei')),
    ) * parseFloat(gasLimit);

  return (
    <View
      style={{
        marginTop: 80,
        marginHorizontal: 24,
      }}>
      {renderSlippageRBSheet()}
      {renderNetworkFeeRBSheet()}
      <View
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderColor: colors.grey9,
          borderWidth: 1,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...fonts.para_regular, color: 'white'}}>
          Slippage tolerance
        </Text>
        <TouchableOpacity
          onPress={() => {
            refSlippageRBSheet.current.open();
          }}>
          <Text
            style={{
              ...fonts.para_semibold,
              color: colors.green5,
              marginLeft: 12,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Text style={{...fonts.para_regular, color: 'white'}}>
            {swapData.slippage + '%'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: colors.grey9,
          borderWidth: 1,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...fonts.para_regular, color: 'white', flex: 1}}>
          Rate
        </Text>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Text style={{...fonts.para_regular, color: 'white'}}>
            {fromValue.toString() +
              ' ' +
              (fromToken == 'main'
                ? currentNetworkSymbol
                : fromToken.tokenSymbol) +
              ' = ' +
              toValue.toString() +
              ' ' +
              (toToken == 'main' ? currentNetworkSymbol : toToken.tokenSymbol)}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: colors.grey9,
          borderWidth: 1,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...fonts.para_regular, color: 'white', flex: 1}}>
          Inverse Rate
        </Text>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Text style={{...fonts.para_regular, color: 'white'}}>
            {'1 ' +
              (toToken == 'main' ? currentNetworkSymbol : toToken.tokenSymbol) +
              ' = ' +
              inversePrice.toString() +
              ' ' +
              (fromToken == 'main'
                ? currentNetworkSymbol
                : fromToken.tokenSymbol)}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: colors.grey9,
          borderWidth: 1,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...fonts.para_regular, color: 'white'}}>USD Price</Text>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Text style={{...fonts.para_regular, color: 'white'}}>
            {'1 ' +
              (fromToken == 'main'
                ? currentNetworkSymbol
                : fromToken.tokenSymbol) +
              ' = ' +
              '$ 1284.53'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: colors.grey9,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...fonts.para_regular, color: 'white'}}>
          Estimated Fee
        </Text>
        {fetchingGasLimit ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                ...fonts.para_semibold,
                color: colors.grey23,
                marginLeft: 12,
                marginRight: 8,
              }}>
              Edit
            </Text>
            <ActivityIndicator size={'small'} color={colors.green5} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              refRBNetworkFeeSheet.current.open();
            }}>
            <Text
              style={{
                ...fonts.para_semibold,
                color: colors.green5,
                marginLeft: 12,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        )}

        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Text style={{...fonts.para_regular, color: 'white'}}>
            {totalFee.toFixed(6) + ' ' + currentNetworkSymbol}
          </Text>
        </View>
      </View>
    </View>
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
});
const mapDispatchToProps = dispatch => ({
  getFeeData: currentNetworkObject =>
    getFeeData(dispatch, currentNetworkObject),
  setGettingFeeDataTimerId: timerId =>
    setGettingFeeDataTimerId(dispatch, timerId),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapConfirmBnb);
