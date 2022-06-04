import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import BalanceText from './BalanceText';
import TokenBalanceText from './TokenBalanceText';

const CanSendTokenList = ({
  accounts,
  currentAccountIndex,
  tokens,
  onSelectToken,
  selectedToken,
  currentNetwork,
}) => {
  const tokensList = tokens[currentNetwork.toString()]
    ? tokens[currentNetwork.toString()][currentAccountIndex]
      ? tokens[currentNetwork.toString()][currentAccountIndex].tokensList
      : []
    : [];
  const refRBTokensListSheet = useRef(null);

  console.log(tokensList);

  const TokenRow = ({token, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.grey23,
                marginRight: 16,
              }}></View>
            <View>
              <View>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {token.tokenAddress === 'main' ? 'ETH' : token.tokenSymbol}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              {token.tokenAddress === 'main' ? (
                <BalanceText
                  address={accounts[currentAccountIndex].address}
                  style={{...fonts.title2, color: 'white'}}
                />
              ) : (
                <TokenBalanceText
                  address={accounts[currentAccountIndex].address}
                  token={token}
                  style={{...fonts.title2, color: 'white'}}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTokensList = () => {
    return (
      <RBSheet
        height={450}
        ref={refRBTokensListSheet}
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
        <ScrollView>
          <View style={{marginTop: 12}}>
            <Text
              style={{textAlign: 'center', color: 'white', ...fonts.title2}}>
              Token
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <TokenRow
              onPress={() => {
                onSelectToken('main');
                refRBTokensListSheet.current.close();
              }}
              key={'cansendTokenList_main'}
              token={{
                tokenDecimal: 18,
                tokenAddress: 'main',
              }}
            />
            {tokensList.map(token => (
              <TokenRow
                onPress={() => {
                  onSelectToken(token);
                  refRBTokensListSheet.current.close();
                }}
                key={'cansendTokenList_' + token.tokenAddress}
                token={token}
              />
            ))}
          </View>
        </ScrollView>
      </RBSheet>
    );
  };

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.grey22,
        height: 60,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        refRBTokensListSheet.current.open();
      }}>
      <Text style={{...fonts.para_semibold, color: 'white'}}>
        {selectedToken === 'main' ? 'ETH' : selectedToken.tokenSymbol}
      </Text>
      <View style={{flex: 1, marginRight: 16, flexDirection: 'row-reverse'}}>
        <FontAwesome
          onPress={() => {}}
          style={{fontSize: 16, color: 'white', marginRight: 16}}
          icon={SolidIcons.chevronDown}
        />
      </View>
      {renderTokensList()}
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  currentNetwork: state.networks.currentNetwork,
  tokens: state.tokens,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CanSendTokenList);
