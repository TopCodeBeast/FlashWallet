import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextButton} from '../../../../components/Buttons';

const usdAmount = 226.69;

const HistoryRow = ({
  time,
  totalAmount,
  unit,
  transactionType,
  resultType,
  from,
  to,
  nonce,
  amount,
  fee,
}) => {
  const refRBSheet = useRef(null);

  return (
    <TouchableOpacity
      style={{paddingVertical: 8}}
      onPress={() => {
        refRBSheet.current.open();
      }}>
      <View style={{paddingVertical: 8}}>
        <Text
          style={{color: colors.grey9, ...fonts.caption_small12_18_regular}}>
          Mar 3 at 10:04 AM
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <FontAwesome
            style={{
              fontSize: 40,
              color: resultType === 'confirmed' ? colors.green5 : colors.red5,
              marginRight: 16,
            }}
            icon={
              transactionType === 'received'
                ? SolidIcons.arrowDown
                : SolidIcons.arrowUp
            }
          />
        </View>
        <View>
          <View>
            <Text style={{color: 'white', ...fonts.title2}}>
              {(transactionType === 'received' ? 'Received ' : 'Sent ') + unit}
            </Text>
          </View>
          <View style={{marginTop: 4}}>
            <Text
              style={{
                color: resultType === 'confirmed' ? colors.green5 : colors.red5,
                ...fonts.title2,
              }}>
              {resultType === 'confirmed' ? 'Confirmed' : 'Cancelled'}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              {totalAmount + ' ' + unit}
            </Text>
          </View>
          <View style={{marginTop: 4}}>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              {'$' + parseFloat(totalAmount * usdAmount).toFixed(4)}
            </Text>
          </View>
        </View>
      </View>
      <RBSheet
        height={transactionType === 'received' ? 640 : 720}
        ref={refRBSheet}
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
        <View>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              {(transactionType === 'received' ? 'Received' : 'Sent') +
                ' ' +
                unit}
            </Text>
          </View>
          <View
            style={{marginTop: 24, paddingVertical: 16, marginHorizontal: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <View>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}>
                    Status
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...fonts.para_semibold,
                      color:
                        resultType === 'confirmed'
                          ? colors.green5
                          : colors.red5,
                    }}>
                    {resultType === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}>
                    Date
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: 'white',
                    }}>
                    Mar 3 at 10:04 AM
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: 24, paddingVertical: 16, marginHorizontal: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <View>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}>
                    From
                  </Text>
                </View>
                <View style={{paddingVertical: 8}}>
                  <Text
                    style={{
                      ...fonts.para_regular,
                      color: 'white',
                    }}>
                    {from.slice(0, 6) + '...' + from.slice(-4)}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}>
                    To
                  </Text>
                </View>
                <View style={{paddingVertical: 8}}>
                  <Text
                    style={{
                      ...fonts.para_regular,
                      color: 'white',
                    }}>
                    {to.slice(0, 6) + '...' + to.slice(-4)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: 24, paddingVertical: 16, marginHorizontal: 24}}>
            <View>
              <Text
                style={{
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                Nonce
              </Text>
            </View>
            <View style={{marginTop: 8}}>
              <Text
                style={{
                  ...fonts.para_regular,
                  color: 'white',
                }}>
                {nonce}
              </Text>
            </View>
          </View>
          {transactionType === 'received' && (
            <View
              style={{
                marginTop: 24,
                padding: 16,
                marginHorizontal: 24,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.grey9,
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
                    {totalAmount + ' ' + unit}
                  </Text>
                </View>
                <View style={{marginTop: 8}}>
                  <Text
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}>
                    {'$' + parseFloat(usdAmount * totalAmount).toFixed(4)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {transactionType === 'sent' && (
            <>
              <View
                style={{
                  marginTop: 24,
                  padding: 16,
                  marginHorizontal: 24,
                  borderWidth: 1,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderColor: colors.grey9,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text style={{...fonts.para_regular, color: 'white'}}>
                      Amount
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{...fonts.para_regular, color: 'white'}}>
                      {amount + ' ' + unit}
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
                      {fee + ' ' + unit}
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
                  borderColor: colors.grey9,
                  borderTopWidth: 0,
                  borderBottomWidth: 1,
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
                      {totalAmount + ' ' + unit}
                    </Text>
                  </View>
                  <View style={{marginTop: 8}}>
                    <Text
                      style={{
                        ...fonts.caption_small12_18_regular,
                        color: colors.grey9,
                      }}>
                      {'$' + parseFloat(usdAmount * totalAmount).toFixed(4)}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
          <View style={{marginTop: 40, marginBottom: 40}}>
            <TextButton text="View on Main Net" onPress={() => {}} />
          </View>
        </View>
      </RBSheet>
    </TouchableOpacity>
  );
};

export default HistoryRow;
