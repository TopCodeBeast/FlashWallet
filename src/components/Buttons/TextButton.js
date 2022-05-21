import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors, fonts} from '../../styles';

const TextButton = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          ...fonts.btn_large_normal,
          color: colors.green5,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
