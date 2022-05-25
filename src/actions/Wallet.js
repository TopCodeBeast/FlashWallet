import AsyncStorage from '@react-native-async-storage/async-storage';
import bip39 from 'react-native-bip39';
import bcrypt from 'bcrypt-react-native';
const hdkey = require('ethereumjs-wallet').hdkey;

const saltRound = 10;

export const importWallet = (data, successCallback, failCallback) => {
  const masterSeed = bip39.mnemonicToSeed(data.mnemonic);
  const masterSeedString = masterSeed.toString('hex');
  let path = "m/44'/60'/" + 0 + "'/" + 0 + "'/" + 0;
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();
  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKey().toString('hex');

  bcrypt.getSalt(saltRound).then(salt => {
    bcrypt.hash(salt, data.password).then(hash => {
      let accountsInfo = {paths: [], accounts: []};
      accountsInfo.paths.push(path);
      accountsInfo.accounts.push({
        privateKey,
        address,
        name: 'Account 1',
      });
      AsyncStorage.multiSet([
        ['main_mnemonic', data.mnemonic],
        ['master_seed', masterSeedString],
        ['account_info', JSON.stringify(accountsInfo)],
        ['main_password', hash],
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
    });
  });
};
