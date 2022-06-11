import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import Feather from 'react-native-vector-icons/Feather';
import {colors, fonts} from '../../styles';

export const toastConfig = ({hasRef, toastRef}) => {
  return {
    txnSubmitted: props => {
      const {transaction, onPress} = props.props;
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 80,
            width: '90%',
            backgroundColor: colors.primary5 + '44',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            zIndex: 100,
          }}>
          <FontAwesome
            style={{
              fontSize: 40,
              color: colors.primary5,
              marginRight: 12,
            }}
            icon={RegularIcons.clock}
          />
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              {'Transaction ' + '#' + transaction.nonce + ' Submitted'}
            </Text>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              Waiting for confirmation
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    txnCompleted: props => {
      const {transaction} = props.props;
      return (
        <TouchableOpacity
          onPress={() => {
            if (hasRef) {
              toastRef.current.hide();
            } else {
              Toast.hide();
            }
          }}
          style={{
            height: 80,
            width: '90%',
            backgroundColor: colors.green5 + '44',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            zIndex: 100,
          }}>
          <FontAwesome
            style={{
              fontSize: 40,
              color: colors.green5,
              marginRight: 12,
            }}
            icon={RegularIcons.checkCircle}
          />
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              {'Transaction ' + '#' + transaction.nonce + ' Completed'}
            </Text>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              Tap to view this transaction
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    txnCancelled: props => {
      const {transaction, onPress} = props.props;
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 80,
            width: '90%',
            backgroundColor: colors.red5 + '44',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            zIndex: 100,
          }}>
          <Feather
            name="info"
            size={40}
            color={colors.red5}
            style={{marginRight: 12}}
          />
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              Transaction Cancelled
            </Text>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              Tap to view this transaction
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    error: props => {
      const {text1} = props;
      const {error} = props.props;
      console.log(error);
      return (
        <TouchableOpacity
          onPress={() => {
            if (hasRef) {
              toastRef.current.hide();
            } else {
              Toast.hide();
            }
          }}
          style={{
            height: 80,
            width: '90%',
            backgroundColor: colors.red5 + '44',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            zIndex: 100,
          }}>
          <FontAwesome
            style={{
              fontSize: 40,
              color: colors.red5,
              marginRight: 12,
            }}
            icon={RegularIcons.timesCircle}
          />
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>{text1}</Text>
            <Text
              style={{
                ...fonts.caption_small12_18_regular,
                color: colors.grey9,
              }}>
              Tap to hide
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    warning: props => {
      const {text1} = props;
      return (
        <View style={{height: 60, width: '100%', backgroundColor: 'yellow'}}>
          <Text>{text1}</Text>
        </View>
      );
    },
    copy: ({text1, props}) => {
      const {color} = props;
      return (
        <TouchableOpacity
          onPress={() => {
            if (hasRef) {
              toastRef.current.hide();
            } else {
              Toast.hide();
            }
          }}
          style={{
            height: 60,
            width: '80%',
            backgroundColor: color + '26',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <FontAwesome
            style={{
              fontSize: 24,
              color: color,
              marginRight: 12,
            }}
            icon={RegularIcons.copy}
          />
          <Text style={{...fonts.para_regular, color: color}}>{text1}</Text>
        </TouchableOpacity>
      );
    },
  };
};
