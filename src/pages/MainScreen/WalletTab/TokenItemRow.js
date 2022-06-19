import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors, fonts} from '../../../styles';
import TokenBalanceText from '../../../components/TokenBalanceText';
import BalanceText from '../../../components/BalanceText';
import {connect} from 'react-redux';
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons';
import {removeToken} from '../../../redux/actions/TokensActions';
import RBSheet from 'react-native-raw-bottom-sheet';

const TokenItemRow = ({
  token,
  onPress,
  removable,
  accounts,
  currentAccountIndex,
  networks,
  currentNetwork,
  removeToken,
}) => {
  const {tokenSymbol, tokenAddress, tokenDecimal} = token;
  const trend = 1.2;
  const usdAmount = 123;
  const currentNetworkSymbol = networks[currentNetwork].symbol;
  const refRemoveRBSheet = useRef(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const renderRemoveRBSheet = () => {
    return (
      <RBSheet
        height={200}
        ref={refRemoveRBSheet}
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
        <Text
          style={{
            marginTop: 12,
            ...fonts.title2,
            color: 'white',
            textAlign: 'center',
          }}>
          Do you wanna remove this Token?
        </Text>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <SecondaryButton
            style={{width: 160}}
            text={'Remove'}
            loading={removeLoading}
            onPress={() => {
              removeToken(
                {tokenAddress, currentNetwork, currentAccountIndex},
                () => {
                  setRemoveLoading(true);
                },
                () => {},
                () => {},
              );
            }}
          />
          <PrimaryButton
            style={{width: 160}}
            text={'Cancel'}
            onPress={() => {
              refRemoveRBSheet.current.close();
            }}
          />
        </View>
      </RBSheet>
    );
  };

  return (
    <>
      {renderRemoveRBSheet()}
      <TouchableOpacity
        style={{padding: 16, marginTop: 24}}
        onPress={onPress}
        onLongPress={
          removable
            ? () => {
                refRemoveRBSheet.current.open();
              }
            : () => {}
        }
        key={
          token.address ? token.address.toString() : 'currentToken_onTokenShow'
        }>
        {token === 'main' ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 20,
                width: 40,
                height: 40,
                backgroundColor: colors.grey19,
              }}></View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 16,
                  paddingRight: 56,
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{...fonts.title2, color: 'white'}}>
                    {currentNetworkSymbol}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <BalanceText
                    address={accounts[currentAccountIndex].address}
                    style={{
                      ...fonts.title2,
                      color: 'white',
                      textAlign: 'right',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 16,
                }}>
                <Text
                  style={{
                    ...fonts.caption_small12_16_regular,
                    color: colors.grey9,
                  }}>
                  {'$' + parseFloat(usdAmount).toFixed(2)}
                </Text>
                <Text
                  style={{
                    ...fonts.para_semibold,
                    color: trend > 0 ? colors.green5 : colors.red5,
                    marginLeft: 16,
                  }}>
                  {(trend > 0 ? '+' : '') + trend + '%'}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 20,
                width: 40,
                height: 40,
                backgroundColor: colors.grey19,
              }}></View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 16,
                  paddingRight: 56,
                }}>
                <View style={{width: '50%'}}>
                  <Text style={{...fonts.title2, color: 'white'}}>
                    {tokenSymbol}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <TokenBalanceText
                    address={accounts[currentAccountIndex].address}
                    token={token}
                    style={{
                      ...fonts.title2,
                      color: 'white',
                      textAlign: 'right',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 16,
                }}>
                <Text
                  style={{
                    ...fonts.caption_small12_16_regular,
                    color: colors.grey9,
                  }}>
                  {'$' + parseFloat(usdAmount).toFixed(2)}
                </Text>
                <Text
                  style={{
                    ...fonts.para_semibold,
                    color: trend > 0 ? colors.green5 : colors.red5,
                    marginLeft: 16,
                  }}>
                  {(trend > 0 ? '+' : '') + trend + '%'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
});
const mapDispatchToProps = dispatch => ({
  removeToken: (data, beforeWork, successCallback, failCallback) =>
    removeToken(dispatch, data, beforeWork, successCallback, failCallback),
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenItemRow);
