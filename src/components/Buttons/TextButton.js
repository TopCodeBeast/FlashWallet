import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {colors, fonts} from '../../styles';

const TextButton = ({onPress, text, icon, ...rest}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={Object.assign(rest.style ? rest.style : {}, {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        })}>
        {icon ? icon : <></>}
        <Text
          style={{
            textAlign: 'center',
            ...fonts.btn_large_normal,
            color: colors.green5,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
