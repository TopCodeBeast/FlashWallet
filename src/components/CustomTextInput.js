import React from 'react';
import {TextInput, View} from 'react-native';
import {colors} from '../styles';

const CustomTextInput = ({
  onChangText,
  value,
  placeholder,
  placeholderTextColor,
  leftElement,
  rightElement,
  hasError,
  ...rest
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: hasError ? colors.red5 : colors.grey12,
      }}>
      {leftElement ? leftElement : <></>}
      <TextInput
        style={{
          color: 'white',
          height: 64,
          paddingHorizontal: 12,
          width: '80%',
        }}
        onChangeText={onChangText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.grey12}
        {...rest}
      />
      <View style={{flex: 1, flexDirection: 'row-reverse'}}>
        {rightElement ? rightElement : <></>}
      </View>
    </View>
  );
};

export default CustomTextInput;
