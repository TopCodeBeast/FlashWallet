import {FloatingLabelInput} from 'react-native-floating-label-input';
import React from 'react';

const commonInputContainerStyles = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: 'grey',
  paddingHorizontal: 10,
};
const commonInputCustomLabelStyles = {
  colorFocused: 'grey',
  colorBlurred: 'grey',
  fontFamily: 'Poppins',
  fontSize: 12,
  color: 'grey',
  lineHeight: 16,
  letterSpacing: 0,
};
const commonInputInputStyles = {
  color: 'white',
  fontFamily: 'Poppins',
  fontSize: 14,
  color: 'white',
  lineHeight: 24,
  height: 64,
  letterSpacing: 0,
  fontWeight: 'bold',
};

const FloatLabelInput = ({label, isPassword, value, onChangeText, ...rest}) => {
  return (
    <FloatingLabelInput
      label={label}
      isPassword={isPassword}
      value={value}
      onChangeText={onChangeText}
      containerStyles={commonInputContainerStyles}
      customLabelStyles={commonInputCustomLabelStyles}
      inputStyles={rest.inputStyles ? rest.inputStyles : commonInputInputStyles}
      {...rest}
    />
  );
};

export default FloatLabelInput;
