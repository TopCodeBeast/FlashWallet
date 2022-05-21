import {View, Text} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../styles';

const CollectibleItemRow = ({name, unit, balance, trend, usdAmount}) => {
  return (
    <View style={{padding: 16, marginTop: 24}}>
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
            style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 56}}>
            <View style={{width: '50%'}}>
              <Text style={{...fonts.title2, color: 'white'}}>{name}</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'right'}}>
                {balance + ' ' + unit}
              </Text>
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
    </View>
  );
};

export default CollectibleItemRow;
