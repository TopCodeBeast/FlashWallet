import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

const Header = ({tokenName, onBackPress}) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey24,
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            onBackPress();
          }}
          style={{width: 20}}>
          <FontAwesome
            style={{fontSize: 16, color: 'white'}}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
        <Text style={{...fonts.title2, color: 'white'}}>{tokenName}</Text>
      </View>
    </View>
  );
};

export default Header;
