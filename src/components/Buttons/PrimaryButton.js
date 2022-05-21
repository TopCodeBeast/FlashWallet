import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors, commonStyles, fonts} from '../../styles';

const PrimaryButton = ({onPress, enableFlag, text, icon}) => {
  return (
    <TouchableOpacity
      style={Object.assign(
        {flexDirection: 'row'},
        typeof enableFlag === 'boolean'
          ? enableFlag
            ? commonStyles.primaryButton
            : commonStyles.disabledButton
          : commonStyles.primaryButton,
      )}
      onPress={onPress}
      disabled={typeof enableFlag === 'boolean' ? !enableFlag : false}>
      {icon ? icon : <></>}
      <Text
        style={{
          ...fonts.btn_large_normal,
          color:
            typeof enableFlag === 'boolean'
              ? enableFlag
                ? 'black'
                : colors.grey18
              : 'black',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
