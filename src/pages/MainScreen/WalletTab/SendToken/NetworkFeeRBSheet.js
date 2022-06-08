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
import {fonts, colors} from '../../../../styles';
import {PrimaryButton} from '../../../../components/Buttons';
import FloatLabelInput from '../../../../components/FloatLabelInput';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';
import {transferETHGasLimit} from '../../../../engine/constants';

const NetworkFeeRBSheet = props => {
  const {onSave, feeData} = props;
  const propsMaxFee = utils.formatUnits(props.maxFee, 'gwei');
  const propsMaxPriorityFee = utils.formatUnits(props.maxPriorityFee, 'gwei');
  const propsGasLimit = props.gasLimit.toString();
  const [networkFeeType, setNetworkFeeType] = useState(props.networkFeeType);
  const {networks, currentNetwork} = props;

  const [showStatus, setShowStatus] = useState(
    props.networkFeeType === 'advanced' ? 'advanced' : 'basic',
  );

  const [gasLimit, setGasLimit] = useState(propsGasLimit);
  const [maxPriorityFee, setMaxPriorityFee] = useState(propsMaxPriorityFee);
  const [maxFee, setMaxFee] = useState(propsMaxFee);
  const [error, setError] = useState({});

  const currentNetworkSymbol = networks[currentNetwork].symbol;

  const onPressSave = () => {
    if (Number(gasLimit) !== parseInt(gasLimit)) {
      setError({...error, gasLimit: 'Must be valid Integer.'});
      return;
    }
    if (Number(maxFee) !== Number(maxFee)) {
      setError({...error, maxFee: 'Must be valid Number.'});
      return;
    }
    if (Number(maxPriorityFee) !== Number(maxPriorityFee)) {
      setError({...error, maxPriorityFee: 'Must be valid Number.'});
      return;
    }
    if (Number(gasLimit) < transferETHGasLimit) {
      setError({...error, gasLimit: 'Must be bigger than 21000.'});
      return;
    }
    if (parseFloat(maxFee) < parseFloat(maxPriorityFee)) {
      setError({
        ...error,
        maxFee: 'Max Fee cannot be lower than Max Priority Fee.',
      });
      return;
    }
    if (
      parseFloat(maxFee) < utils.formatUnits(feeData.low.maxFeePerGas, 'gwei')
    ) {
      setError({
        ...error,
        maxFee: 'Max Fee is lower than the current network condition.',
      });
    }
    if (
      parseFloat(maxPriorityFee) <
      utils.formatUnits(feeData.low.maxPriorityFeePerGas, 'gwei')
    ) {
      setError({
        ...error,
        maxPriorityFee:
          'Max Priority Fee is lower than the current network condition.',
      });
    }
    if (
      parseFloat(maxFee) > utils.formatUnits(feeData.high.maxFeePerGas, 'gwei')
    ) {
      setError({...error, maxFee: 'Max Fee is higher than necessary.'});
    }
    if (
      parseFloat(maxPriorityFee) >
      utils.formatUnits(feeData.high.maxPriorityFeePerGas, 'gwei')
    ) {
      setError({
        ...error,
        maxPriorityFee: 'Max Priority Fee is higher than necessary.',
      });
    }
    if (showStatus === 'basic') {
      onSave({type: networkFeeType, data: {gasLimit}});
    } else if (showStatus === 'advanced') {
      onSave({
        type: 'advanced',
        data: {
          gasLimit,
          maxFee,
          maxPriorityFee,
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
                    parseFloat(utils.formatEther(feeData.low.maxFeePerGas)) *
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
                    parseFloat(utils.formatEther(feeData.medium.maxFeePerGas)) *
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
                    parseFloat(utils.formatEther(feeData.high.maxFeePerGas)) *
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
                    utils.parseUnits(parseFloat(maxFee).toFixed(9), 'gwei'),
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
            value={maxPriorityFee}
            label="Max Priority Fee (GWEI)"
            onChangeText={value => {
              setError({...error, maxPriorityFee: undefined});
              setMaxPriorityFee(value);
            }}
          />
          {error.maxPriorityFee && (
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: colors.red5,
              }}>
              {error.maxPriorityFee}
            </Text>
          )}
        </View>
        <View style={{marginTop: 16}}>
          <FloatLabelInput
            value={maxFee}
            label="Max Fee (GWEI)"
            onChangeText={value => {
              setError({...error, maxFee: undefined});
              setMaxFee(value);
            }}
          />
          {error.maxFee && (
            <Text
              style={{
                paddingLeft: 16,
                ...fonts.caption_small12_16_regular,
                color: colors.red5,
              }}>
              {error.maxFee}
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
              maxFee.length > 0 &&
              maxPriorityFee.length > 0)
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

export default connect(mapStateToProps, mapDispatchToProps)(NetworkFeeRBSheet);
