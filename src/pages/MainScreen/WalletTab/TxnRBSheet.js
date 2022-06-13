import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import {colors, fonts} from '../../../styles';

import {PrimaryButton, TextButton} from '../../../components/Buttons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ethers, utils} from 'ethers';

const TxnRBSheet = ({
  submittedTxn,
  submittedTxnTime,
  submittedAccount,
  submittedNetworkRPC,
  onClose,
  onSubmittedNewTxn,
  onSuccessNewTxn,
  onFailNewTxn,
}) => {
  const refCancelRBSheet = useRef(null);
  const refSpeedUpRBSheet = useRef(null);
  const [speedLoading, setSpeedLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const provider = new ethers.providers.JsonRpcProvider(submittedNetworkRPC);
  const wallet = new ethers.Wallet(submittedAccount.privateKey, provider);

  console.log('Txn RB Sheet - submittedTxn:::::: ', submittedTxn);

  /*Txn RB Sheet - submittedTxn::::::  {"chainId": 4, "from": "0x632Bd9a598cd5c52F1625c850A6c46ECd4Cb7829", "gasLimit": {"hex": "0x5208", "type": "BigNumber"}, "maxFeePerGas": {"hex": "0x957cebf6", "type": "BigNumber"}, "maxPriorityFeePerGas": {"hex": "0x540ae47f", "type": "BigNumber"}, "nonce": 81, "to": "0xB1e50315BbDa7D9Fd7e4F030e26eEC585A1Efc0c", "type": 2, "value": {"hex": "0xb5e620f48000", "type": "BigNumber"}}*/

  const speedUpTxn = () => {
    console.log('Starting new');
    const newTxn = {
      ...submittedTxn,
      maxFeePerGas: submittedTxn.maxFeePerGas.div(10).mul(13),
      maxPriorityFeePerGas: submittedTxn.maxPriorityFeePerGas.div(10).mul(13),
    };
    console.log('new Txn: ', newTxn);
    setSpeedLoading(true);
    wallet
      .sendTransaction(newTxn)
      .then(newTxnRes => {
        // setSpeedLoading(false);
        if (refSpeedUpRBSheet) {
          refSpeedUpRBSheet.current.close();
        }
        onClose();
        console.log('newTxn Res: ', newTxnRes);
        onSubmittedNewTxn('Speeding Up Transaction...', 'Tap to hide');
        newTxnRes
          .wait()
          .then(newReciept => {
            console.log('newReciept: ', newReciept);
            onSuccessNewTxn(
              'Speeded Up Txn #' + newTxnRes.nonce,
              'Tap to hide',
            );
          })
          .catch(err => {
            console.log('Speed UP Txn ERR::::::: ', err);
            onFailNewTxn('Fail speeding up.', 'Tap to hide');
          });
      })
      .catch(err => {
        // setSpeedLoading(false);
        onClose();
        console.log('Speed UP Txn ERR::::::: ', err);
        onFailNewTxn('Fail speeding up.', 'Tap to hide');
      });
  };

  const cancelTxn = () => {
    console.log('Canceling Txn');
    console.log('Starting new');
    const newTxn = {
      ...submittedTxn,
      maxFeePerGas: submittedTxn.maxFeePerGas.div(10).mul(13),
      maxPriorityFeePerGas: submittedTxn.maxPriorityFeePerGas.div(10).mul(13),
      to: submittedAccount.address,
      value: ethers.BigNumber.from(0),
    };
    console.log('new Txn: ', newTxn);
    setCancelLoading(true);
    wallet
      .sendTransaction(newTxn)
      .then(newTxnRes => {
        // setCancelLoading(false);
        if (refCancelRBSheet) {
          refCancelRBSheet.current.close();
        }
        onClose();
        console.log('newTxn Res: ', newTxnRes);
        onSubmittedNewTxn('Cancelling Transaction...', 'Tap to hide');
        newTxnRes
          .wait()
          .then(newReciept => {
            console.log('newReciept: ', newReciept);
            onSuccessNewTxn('Cancelled Txn #' + newTxnRes.nonce, 'Tap to hide');
          })
          .catch(err => {
            console.log('Cancel Txn ERR1::::::: ', err);
            onFailNewTxn('Fail cancelling.', 'Tap to hide');
          });
      })
      .catch(err => {
        // setCancelLoading(false);
        onClose();
        console.log('Cancel Txn ERR2::::::: ', err);
        onFailNewTxn('Fail cancelling.', 'Tap to hide');
      });
  };

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
            style={{width: 160}}
            onPress={() => {
              refCancelRBSheet.current.close();
            }}
          />
          <PrimaryButton
            loading={cancelLoading}
            style={{width: 160}}
            text="Yes, Try"
            onPress={() => {
              cancelTxn();
            }}
          />
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
            style={{width: 160}}
            onPress={() => {
              refSpeedUpRBSheet.current.close();
            }}
          />
          <PrimaryButton
            text="Yes, Try"
            loading={speedLoading}
            style={{width: 160}}
            onPress={() => {
              speedUpTxn();
            }}
          />
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
                {submittedAccount.address.slice(0, 6) +
                  '...' +
                  submittedAccount.address.slice(-4)}
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
                  {submittedTxn.value
                    ? utils.formatEther(submittedTxn.value) + ' ETH'
                    : '0 ETH'}
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
                    submittedTxn.value
                      ? submittedTxn.gasLimit
                          .mul(submittedTxn.maxFeePerGas)
                          .add(submittedTxn.value)
                      : submittedTxn.gasLimit.mul(submittedTxn.maxFeePerGas),
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
