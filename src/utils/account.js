const hdkey = require('ethereumjs-wallet').hdkey;
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

const avatarsCount = require('../constants').default.avatarsCount;

const createInitialAccountFromMasterSeed = masterSeed => {
  let path = "m/44'/60'/" + 0 + "'/" + 0 + "'/" + 0;
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();
  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKey().toString('hex');
  return {
    name: 'Account 1',
    privateKey,
    address,
    icon: 0,
    path,
    index: 0,
  };
};

const generateNewAccount = (masterSeed, path, accountName, index) => {
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();
  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKey().toString('hex');
  return {
    name: accountName,
    privateKey,
    address,
    icon: Math.floor(Math.random() * avatarsCount) % avatarsCount,
    path,
    index,
  };
};

const generateAccountFromPrivateKey = ({privateKey, accountName, index}) => {
  let address = ethers.utils.computeAddress('0x' + privateKey);
  return {
    name: accountName,
    privateKey,
    address,
    icon: Math.floor(Math.random() * avatarsCount) % avatarsCount,
    index,
    isImported: true,
  };
};

export {
  createInitialAccountFromMasterSeed,
  generateNewAccount,
  generateAccountFromPrivateKey,
};
