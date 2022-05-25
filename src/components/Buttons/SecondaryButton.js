import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {colors, commonStyles, fonts} from '../../styles';

const SecondaryButton = ({
  onPress,
  enableFlag,
  text,
  icon,
  loading,
  ...rest
}) => {
  const backgroundDisabled =
    (typeof enableFlag === 'boolean' && !enableFlag) ||
    (typeof loading === 'boolean' && loading) ||
    false;
  return (
    <TouchableOpacity
      style={Object.assign(
        rest.style ? rest.style : {},
        {flexDirection: 'row'},
        backgroundDisabled
          ? commonStyles.disabledButton
          : commonStyles.secondaryButton,
      )}
      onPress={onPress}
      disabled={backgroundDisabled}>
      {icon ? icon : <></>}
      {!loading && (
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
      )}
      {loading && <ActivityIndicator size={'small'} color={colors.green5} />}
    </TouchableOpacity>
  );
};

export default SecondaryButton;
