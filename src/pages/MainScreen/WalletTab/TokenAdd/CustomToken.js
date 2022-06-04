import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {fonts, colors} from '../../../../styles';
import {PrimaryButton, TextButton} from '../../../../components/Buttons';
import FloatLabelInput from '../../../../components/FloatLabelInput';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import {isValidAddress} from '../../../../utils/common';
import {addToken} from '../../../../redux/actions/TokensActions';

const CustomToken = ({
  onCancel,
  addToken,
  currentNetwork,
  currentAccountIndex,
}) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState('');
  const [step, setStep] = useState(0);
  const [canNext, setCanNext] = useState(false);
  const [addTokenLoading, setAddTokenLoading] = useState(false);

  const checkCanNext = data => {
    if (!data.tokenAddress || !data.tokenSymbol || !data.tokenDecimal) {
      setCanNext(false);
      return false;
    }
    if (!isValidAddress(data.tokenAddress)) {
      setCanNext(false);
      return false;
    }
    if (
      !(
        Number.isInteger(parseInt(data.tokenDecimal)) &&
        parseInt(data.tokenDecimal) > 0
      )
    ) {
      setCanNext(false);
      return false;
    }
    setCanNext(true);
    return true;
  };

  const renderStep0 = () => {
    return (
      <>
        <View style={{marginTop: 24}}>
          <FloatLabelInput
            value={tokenAddress}
            onChangeText={value => {
              checkCanNext({tokenAddress: value, tokenSymbol, tokenDecimal});
              setTokenAddress(value);
            }}
            label="Token Address"
          />
          <Text
            style={{
              paddingLeft: 16,
              ...fonts.caption_small12_16_regular,
              color: isValidAddress(tokenAddress)
                ? colors.green5
                : colors.grey12,
            }}>
            Must be valid address.{' '}
            {isValidAddress(tokenAddress) && (
              <FontAwesome
                style={{
                  fontSize: 12,
                  color: colors.green5,
                }}
                icon={SolidIcons.check}
              />
            )}
          </Text>
        </View>

        <View style={{marginTop: 24}}>
          <FloatLabelInput
            value={tokenSymbol}
            onChangeText={value => {
              checkCanNext({tokenAddress, tokenSymbol: value, tokenDecimal});
              setTokenSymbol(value);
            }}
            label="Token Symbol"
          />
        </View>
        <View style={{marginTop: 24}}>
          <FloatLabelInput
            value={tokenDecimal}
            onChangeText={value => {
              checkCanNext({tokenAddress, tokenSymbol, tokenDecimal: value});
              setTokenDecimal(value);
            }}
            label="Token Precision"
          />
        </View>
      </>
    );
  };

  const renderStep1 = () => {
    const renderTokenRow = token => {
      const {tokenSymbol} = token;
      return (
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.grey9,
              }}></View>
            <View style={{marginLeft: 16}}>
              <Text style={{...fonts.title2, color: 'white'}}>
                {tokenSymbol}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              <FontAwesome
                style={{fontSize: 24, color: colors.green5}}
                icon={RegularIcons.checkCircle}
              />
            </View>
          </View>
        </View>
      );
    };
    return (
      <>
        <View style={{marginTop: 24}}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            Would you like to add these tokens?
          </Text>
        </View>
        <View style={{marginTop: 16}}>
          {renderTokenRow({tokenSymbol, tokenAddress, tokenDecimal})}
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 24,
        height: '100%',
      }}>
      {step === 0 && renderStep0()}
      {step === 1 && renderStep1()}
      <View style={{position: 'absolute', bottom: 0, left: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 40,
            width: '100%',
          }}>
          <TextButton
            text="Cancel"
            style={{width: 160}}
            onPress={() => {
              if (step === 1) {
                setStep(0);
              } else if (step === 0) {
                onCancel();
              }
            }}
          />
          <PrimaryButton
            loading={addTokenLoading}
            text={step === 0 ? 'Next' : 'Add Token'}
            onPress={() => {
              if (step === 0) {
                setStep(1);
              } else if (step === 1) {
                addToken(
                  {
                    token: {
                      tokenAddress,
                      tokenDecimal,
                      tokenSymbol,
                    },
                    currentNetwork,
                    currentAccountIndex,
                  },
                  () => {
                    setAddTokenLoading(true);
                  },
                  () => {
                    console.log('success on add custom token');
                    onCancel();
                  },
                  () => {
                    console.log('fail on add custom token');
                    onCancel();
                  },
                );
              }
            }}
            style={{width: 160}}
            enableFlag={canNext}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  currentNetwork: state.networks.currentNetwork,
  currentAccountIndex: state.accounts.currentAccountIndex,
});
const mapDispatchToProps = dispatch => ({
  addToken: (data, beforeWork, successCallback, failCallback) =>
    addToken(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomToken);
