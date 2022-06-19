import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import {fonts, colors} from '../styles';
import {PrimaryButton} from './Buttons';
import FloatLabelInput from './FloatLabelInput';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';
import {transferETHGasLimit} from '../engine/constants';

const NetworkFeeRBSheetBnb = props => {
  const {onSave, feeData} = props;
  const propsGasPrice = utils.formatUnits(props.gasPrice, 'gwei');
  const propsGasLimit = props.gasLimit.toString();
  const [networkFeeType, setNetworkFeeType] = useState(props.networkFeeType);
  const {networks, currentNetwork} = props;

  const [showStatus, setShowStatus] = useState(
    props.networkFeeType === 'advanced' ? 'advanced' : 'basic',
  );

  const [gasLimit, setGasLimit] = useState(propsGasLimit);
  const [gasPrice, setGasPrice] = useState(propsGasPrice);
  const [error, setError] = useState({});

  const currentNetworkSymbol = networks[currentNetwork].symbol;

  const onPressSave = () => {
    if (Number(gasLimit) !== parseInt(gasLimit)) {
      setError({...error, gasLimit: 'Must be valid Integer.'});
      return;
    }
    if (Number(gasPrice) !== Number(gasPrice)) {
      setError({...error, gasPrice: 'Must be valid Number.'});
      return;
    }

    if (Number(gasPrice) === 0) {
      setError({...error, gasPrice: 'Must be bigger than 0.'});
      return;
    }

    if (Number(gasLimit) < transferETHGasLimit) {
      setError({...error, gasLimit: 'Must be bigger than 21000.'});
      return;
    }

    if (showStatus === 'basic') {
      onSave({type: networkFeeType, data: {gasLimit}});
    } else if (showStatus === 'advanced') {
      onSave({
        type: 'advanced',
        data: {
          gasLimit,
          gasPrice,
        },
      });
    }
  };

  const renderBasicStatus = () => {
    return (
      <View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.grey22,
            borderRadius: 8,
            marginTop: 24,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.grey22,
              padding: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                setNetworkFeeType('low');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>Low</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {(
                    parseFloat(utils.formatEther(feeData.low.gasPrice || '0')) *
                    gasLimit
                  ).toFixed(8) +
                    ' ' +
                    currentNetworkSymbol}
                </Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
              {networkFeeType === 'low' && (
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5, marginRight: 24}}
                  icon={RegularIcons.checkCircle}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.grey22,
              padding: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                setNetworkFeeType('medium');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>Medium</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {(
                    parseFloat(
                      utils.formatEther(feeData.medium.gasPrice || '0'),
                    ) * gasLimit
                  ).toFixed(8) +
                    ' ' +
                    currentNetworkSymbol}
                </Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
              {networkFeeType === 'medium' && (
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5, marginRight: 24}}
                  icon={RegularIcons.checkCircle}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                setNetworkFeeType('high');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>High</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {(
                    parseFloat(
                      utils.formatEther(feeData.high.gasPrice || '0'),
                    ) * gasLimit
                  ).toFixed(8) +
                    ' ' +
                    currentNetworkSymbol}
                </Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
              {networkFeeType === 'high' && (
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5, marginRight: 24}}
                  icon={RegularIcons.checkCircle}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 24}}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            The network fee covers the cost of processing your transaction on
            the Ethereum network.
          </Text>
        </View>
      </View>
    );
  };

  const renderAdvancedStatus = () => {
    return (
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>Total</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
            }}>
            <Text
              style={{
                ...fonts.title2,
                color: 'white',
              }}>
              {(
                parseFloat(
                  utils.formatEther(
                    utils.parseUnits(
                      parseFloat(gasPrice || '0').toFixed(9),
                      'gwei',
                    ),
                  ),
                ) * gasLimit
              ).toFixed(8) +
                ' ' +
                currentNetworkSymbol}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <FloatLabelInput
            value={gasLimit}
            label="Gas Limit"
            onChangeText={value => {
              setError({...error, gasLimit: undefined});
              setGasLimit(value);
            }}
          />
          {error.gasLimit && (
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: colors.red5,
              }}>
              {error.gasLimit}
            </Text>
          )}
        </View>
        <View style={{marginTop: 16}}>
          <FloatLabelInput
            value={gasPrice}
            label="Gas Price (GWEI)"
            onChangeText={value => {
              setError({...error, gasPrice: undefined});
              setGasPrice(value);
            }}
          />
          {error.gasPrice && (
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: colors.red5,
              }}>
              {error.gasPrice}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{marginTop: 12}}>
        <Text style={{textAlign: 'center', color: 'white', ...fonts.title2}}>
          Edit Network Fee
        </Text>
      </View>
      <View style={{marginTop: 40, marginHorizontal: 24, marginBottom: '10%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setShowStatus('basic');
            }}
            style={{
              paddingHorizontal: 16,
              borderColor: 'white',
              borderBottomWidth: showStatus === 'basic' ? 3 : 0,
            }}>
            <Text
              style={{
                ...fonts.title2,
                color: showStatus === 'basic' ? 'white' : colors.grey12,
              }}>
              Basic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowStatus('advanced');
            }}
            style={{
              paddingHorizontal: 16,
              borderColor: 'white',
              borderBottomWidth: showStatus === 'advanced' ? 3 : 0,
            }}>
            <Text
              style={{
                ...fonts.title2,
                color: showStatus === 'advanced' ? 'white' : colors.grey12,
              }}>
              Advanced
            </Text>
          </TouchableOpacity>
        </View>
        {showStatus === 'basic' && renderBasicStatus()}
        {showStatus === 'advanced' && renderAdvancedStatus()}
      </View>
      <View style={{padding: 24, marginBottom: 20}}>
        <PrimaryButton
          enableFlag={
            showStatus === 'basic' ||
            (showStatus === 'advanced' &&
              gasLimit.length > 0 &&
              gasPrice.length > 0)
          }
          onPress={() => {
            onPressSave();
          }}
          text="Save"
        />
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  feeData: state.engine.feeData,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetworkFeeRBSheetBnb);
