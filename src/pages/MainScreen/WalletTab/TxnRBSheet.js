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
import {ethers, utils} from 'ethers';

const TxnRBSheet = ({submittedTxn, submittedTxnTime, submittedAccount}) => {
  const refCancelRBSheet = useRef(null);
  const refSpeedUpRBSheet = useRef(null);

  const renderCancelRBSheet = () => {
    return (
      <RBSheet
        height={400}
        ref={refCancelRBSheet}
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
        <View style={{marginTop: 40, marginHorizontal: 24}}>
          <Text style={{...fonts.title1, color: 'white', textAlign: 'center'}}>
            Attempt to Cancel?
          </Text>
          <Text
            style={{
              ...fonts.para_regular,
              color: colors.grey9,
              textAlign: 'center',
              marginTop: 16,
            }}>
            Gas Cancellation Fee
          </Text>
          <Text
            style={{
              ...fonts.title1,
              color: 'white',
              textAlign: 'center',
              marginTop: 16,
            }}>
            &lt; 0.00001 ETH
          </Text>
          <Text
            style={{
              marginTop: 40,
              color: colors.grey9,
              ...fonts.para_regular,
              textAlign: 'center',
            }}>
            If the cancellation attempt is successful, you will be charged the
            transaction fee above.
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextButton
            text="Cancel"
            onPress={() => {
              refCancelRBSheet.current.close();
            }}
          />
          <PrimaryButton text="Yes, let's try" onPress={() => {}} />
        </View>
      </RBSheet>
    );
  };

  const renderSpeedUpRBSheet = () => {
    return (
      <RBSheet
        height={400}
        ref={refSpeedUpRBSheet}
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
        <View style={{marginTop: 40, marginHorizontal: 24}}>
          <Text style={{...fonts.title1, color: 'white', textAlign: 'center'}}>
            Attempt to Speed Up?
          </Text>
          <Text
            style={{
              ...fonts.para_regular,
              color: colors.grey9,
              textAlign: 'center',
              marginTop: 16,
            }}>
            Gas Speed Up Fee
          </Text>
          <Text
            style={{
              ...fonts.title1,
              color: 'white',
              textAlign: 'center',
              marginTop: 16,
            }}>
            &lt; 0.00001 ETH
          </Text>
          <Text
            style={{
              marginTop: 40,
              color: colors.grey9,
              ...fonts.para_regular,
              textAlign: 'center',
            }}>
            If the speed up attempt is successful, you will be charged the
            transaction fee above.
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextButton
            text="Cancel"
            onPress={() => {
              refSpeedUpRBSheet.current.close();
            }}
          />
          <PrimaryButton text="Yes, let's try" onPress={() => {}} />
        </View>
      </RBSheet>
    );
  };
  return (
    <>
      {renderCancelRBSheet()}
      {renderSpeedUpRBSheet()}
      {submittedTxn && (
        <ScrollView style={{height: '100%'}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              {'Sent ETH'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 24,
            }}>
            <View>
              <Text
                style={{
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                Status
              </Text>
              <Text
                style={{
                  ...fonts.para_semibold,
                  color: colors.primary5,
                }}>
                Submited
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                Date
              </Text>
              <Text
                style={{
                  ...fonts.caption_small12_18_regular,
                  color: 'white',
                }}>
                {submittedTxnTime}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 24,
            }}>
            <View>
              <Text
                style={{
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                From
              </Text>
              <Text
                style={{
                  ...fonts.para_regular,
                  color: 'white',
                }}>
                {submittedTxn.from.slice(0, 6) +
                  '...' +
                  submittedTxn.from.slice(-4)}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                To
              </Text>
              <Text
                style={{
                  ...fonts.para_regular,
                  color: 'white',
                }}>
                {submittedTxn.to.slice(0, 6) +
                  '...' +
                  submittedTxn.to.slice(-4)}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 24, paddingHorizontal: 24}}>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              Nonce
            </Text>
            <Text
              style={{
                ...fonts.para_regular,
                color: 'white',
              }}>
              {'#' + submittedTxn.nonce}
            </Text>
          </View>
          <View
            style={{
              marginTop: 24,
              padding: 16,
              marginHorizontal: 24,
              borderWidth: 1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderColor: colors.grey22,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  Amount
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  {utils.formatEther(submittedTxn.value) + ' ETH'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <View>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  Network Fee
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  {utils.formatEther(
                    submittedTxn.gasLimit.mul(submittedTxn.maxFeePerGas),
                  ) + ' ETH'}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 24,
              padding: 16,
              borderWidth: 1,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderColor: colors.grey22,
              borderTopColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{...fonts.title2, color: 'white'}}>
                Total Amount
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {utils.formatEther(
                    submittedTxn.gasLimit
                      .mul(submittedTxn.maxFeePerGas)
                      .add(submittedTxn.value),
                  ) + ' ETH'}
                </Text>
              </View>
              <View style={{marginTop: 8}}>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  {'$231.234'}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 24,
              marginBottom: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TextButton
              text="Cancel"
              onPress={() => {
                refCancelRBSheet.current.open();
              }}
            />
            <PrimaryButton
              text="Speed Up"
              onPress={() => {
                refSpeedUpRBSheet.current.open();
              }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default TxnRBSheet;
