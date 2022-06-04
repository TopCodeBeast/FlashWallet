import bip39 from 'react-native-bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createMnemonic = async () => {
  return await bip39.generateMnemonic();
};

const isValidMnemonic = mnemonic => {
  return bip39.validateMnemonic(mnemonic);
};

const loadMnemonic = (successCallback, failCallback) => {
  AsyncStorage.getItem('mnemonic')
    .then(res => {
      successCallback(res);
    })
    .catch(err => {
      console.log('mnemonic Utils ERROR::::: ', err);
      failCallback();
    });
};

export {createMnemonic, isValidMnemonic, loadMnemonic};
