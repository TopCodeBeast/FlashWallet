import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome, {RegularIcons} from 'react-native-fontawesome';
import {fonts} from '../styles';

const toastConfig = {
  success: props => {
    const {text1} = props;
    return (
      <View style={{height: 60, width: '100%', backgroundColor: 'green'}}>
        <Text>{text1}</Text>
      </View>
    );
  },
  error: props => {
    const {text1} = props;
    return (
      <View style={{height: 60, width: '100%', backgroundColor: 'blue'}}>
        <Text>{text1}</Text>
      </View>
    );
  },
  warning: props => {
    const {text1} = props;
    return (
      <View style={{height: 60, width: '100%', backgroundColor: 'yellow'}}>
        <Text>{text1}</Text>
      </View>
    );
  },
  copy: ({text1, props}) => {
    const {color} = props;
    return (
      <TouchableOpacity
        onPress={() => {
          Toast.hide();
        }}
        style={{
          height: 60,
          width: '80%',
          backgroundColor: color + '26',
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <FontAwesome
          style={{
            fontSize: 24,
            color: color,
            marginRight: 12,
          }}
          icon={RegularIcons.copy}
        />
        <Text style={{...fonts.para_regular, color: color}}>{text1}</Text>
      </TouchableOpacity>
    );
  },
};

const CustomToast = () => {
  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

export default CustomToast;
