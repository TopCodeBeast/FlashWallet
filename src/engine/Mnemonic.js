import bip39 from 'react-native-bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

const createMnemonic = async () => {
  return await bip39.generateMnemonic();
};

const saveMnemonic = async mnemonic => {
  if (!Array.isArray(mnemonic) || !bip39.validateMnemonic(mnemonic.join(' '))) {
    console.log('Given mnemonic is not valid');
    return Promise.reject(new Error('invalid mnemonic'));
  }
  return await AsyncStorage.setItem('main_mnemonic', mnemonic.join(' '));
};

export default {
  createMnemonic,
  saveMnemonic,
};
