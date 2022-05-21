import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {colors, commonStyles, fonts} from '../../styles';

const SecondaryButton = ({onPress, enableFlag, text, icon}) => {
  return (
    <TouchableOpacity
      style={Object.assign(
        {flexDirection: 'row'},
        typeof enableFlag === 'boolean'
          ? enableFlag
            ? commonStyles.secondaryButton
            : commonStyles.disabledButton
          : commonStyles.secondaryButton,
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
                ? colors.green5
                : colors.grey18
              : colors.green5,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
