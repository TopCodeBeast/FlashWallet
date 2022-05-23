import React from 'react';
import {View} from 'react-native';
import {colors} from '../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

const ComboBox = props => {
  return (
    <View
      style={{
        borderRadius: 8,
        borderColor: colors.grey9,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}>
      <View>{props.children}</View>
      <View style={{flex: 1, flexDirection: 'row-reverse'}}>
        <FontAwesome
          style={{
            fontSize: 16,
            color: 'white',
          }}
          icon={SolidIcons.chevronDown}
        />
      </View>
    </View>
  );
};

export default ComboBox;
