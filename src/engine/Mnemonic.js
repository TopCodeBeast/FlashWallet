import bip39 from 'react-native-bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
const hdkey = require('ethereumjs-wallet').hdkey;

const createMnemonic = async () => {
  return await bip39.generateMnemonic();
};

const saveMnemonic = (mnemonic, successCallback, failCallback) => {
  if (!Array.isArray(mnemonic) || !bip39.validateMnemonic(mnemonic.join(' '))) {
    console.log('Given mnemonic is not valid');
    setSuccessLoading(false);
    return;
  }
  const mnemonicString = mnemonic.join(' ');
  const masterSeed = bip39.mnemonicToSeed(mnemonicString);
  const masterSeedString = masterSeed.toString('hex');
  let path = "m/44'/60'/" + 0 + "'/" + 0 + "'/" + 0;
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();

  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKeyString();
  let accountsInfo = {paths: [], accounts: []};
  accountsInfo.paths.push(path);
  accountsInfo.accounts.push({
    privateKey,
    address,
  });
  AsyncStorage.multiSet([
    ['main_mnemonic', mnemonicString],
    ['master_seed', masterSeedString],
    ['account_info', JSON.stringify(accountsInfo)],
  ])
    .then(res => {
      if (successCallback && typeof successCallback === 'function') {
        successCallback();
      }
    })
    .catch(err => {
      console.log('ERROR!!!!!!: ', err);
      if (failCallback && typeof failCallback === 'function') {
        failCallback();
      }
    });
};

export default {
  createMnemonic,
  saveMnemonic,
};
