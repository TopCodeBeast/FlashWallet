// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import AsyncStorage from '@react-native-async-storage/async-storage';

const createMnemonic = () => {
  const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
  return mnemonic;
};

const isValidMnemonic = mnemonic => {
  return ethers.utils.isValidMnemonic(mnemonic);
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
