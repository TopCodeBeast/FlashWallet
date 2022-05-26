import bip39 from 'react-native-bip39';

const createMnemonic = async () => {
  return await bip39.generateMnemonic();
};

const isValidMnemonic = mnemonic => {
  return bip39.validateMnemonic(mnemonic);
};

export {createMnemonic, isValidMnemonic};
