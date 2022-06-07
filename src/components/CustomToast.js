import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {toastConfig} from './utils/CustomToastConfig';

const CustomToast = props => {
  return (
    <Toast
      config={toastConfig({hasRef: false})}
      ref={ref => Toast.setRef(ref)}
      style={Object.assign({}, props.style ? props.style : {})}
    />
  );
};

export default CustomToast;
