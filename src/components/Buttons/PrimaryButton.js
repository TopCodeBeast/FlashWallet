import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {colors, commonStyles, fonts} from '../../styles';

const PrimaryButton = ({onPress, enableFlag, text, icon, loading}) => {
  const backgroundDisabled =
    (typeof enableFlag === 'boolean' && !enableFlag) ||
    (typeof loading === 'boolean' && loading) ||
    false;
  return (
    <TouchableOpacity
      style={Object.assign(
        {flexDirection: 'row'},
        backgroundDisabled
          ? commonStyles.disabledButton
          : commonStyles.primaryButton,
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
                  ? 'black'
                  : colors.grey18
                : 'black',
          }}>
          {text}
        </Text>
      )}
      {loading && <ActivityIndicator size={'small'} color={colors.green5} />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
