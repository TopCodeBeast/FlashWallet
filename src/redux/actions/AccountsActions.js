import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_ACCOUNTS_DATA, SET_CURRENT_ACCOUNT_INDEX} from '../types';

import {store} from '../store';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

const hardenedOffset = require('../../constants').default.HARDENED_OFFSET;
//import utils
import {
  generateAccountFromPrivateKey,
  generateNewAccount,
} from '../../utils/account';

export const loadAccountsDataFromStorage = dispatch => {
  AsyncStorage.getItem('accounts_info')
    .then(res => {
      const data = JSON.parse(res);
      dispatch({type: SET_ACCOUNTS_DATA, payload: data});
    })
    .catch(err => {
      console.log('Accounts Actions: ERROR!!!!!!: ', err);
    });
};

export const createNewAccount = (
  dispatch,
  accountName,
  beforeWork,
  successCallback,
  errorCallback,
) => {
  beforeWork();
  AsyncStorage.multiGet(['master_seed', 'accounts_info'])
    .then(res => {
      const masterSeedString = res[0][1];
      let accountsInfo = JSON.parse(res[1][1]);
      const addresses = accountsInfo.accounts.map(item => item.address);
      const masterSeed = new Buffer(masterSeedString, 'hex');

      let path;
      let newAccount;
      while (1) {
        path =
          "m/44'/60'/" +
          (Math.round(Math.random() * 100000000000) % hardenedOffset) +
          "'/" +
          (Math.round(Math.random() * 100000000000) % hardenedOffset) +
          "'/" +
          (Math.round(Math.random() * 100000000000) % hardenedOffset);
        newAccount = generateNewAccount(
          masterSeed,
          path,
          accountName,
          accountsInfo.accounts.length,
        );
        let foundIndex = addresses.findIndex(
          item => item === newAccount.address,
        );
        if (foundIndex < 0) {
          break;
        }
      }
      accountsInfo.accounts.push(newAccount);
      accountsInfo.currentAccountIndex = accountsInfo.accounts.length - 1;
      const updatedAccountsInfoString = JSON.stringify(accountsInfo);
      AsyncStorage.setItem('accounts_info', updatedAccountsInfoString)
        .then(() => {
          dispatch({type: SET_ACCOUNTS_DATA, payload: accountsInfo});
          successCallback();
        })
        .catch(err => {
          console.log('Accounts Action ERROR!!!!!: ', err);
          errorCallback();
        });
    })
    .catch(err => {
      console.log('ERROR!!!!!: ', err);
      errorCallback();
    });
};

export const setCurrentAccountIndex = (dispatch, index) => {
  AsyncStorage.getItem('accounts_info')
    .then(res => {
      let accountsInfo = JSON.parse(res);
      accountsInfo.currentAccountIndex = index;
      AsyncStorage.setItem('accounts_info', JSON.stringify(accountsInfo))
        .then(() => {
          console.log(
            'Set current Account index: successfully saved in asyncstorage',
          );
        })
        .catch(err => {
          console.log('AccountsAction: ERROR!!!!: ', err);
        });
    })
    .catch(err => {
      console.log('AccountsAction: ERROR!!!!: ', err);
    });
  dispatch({type: SET_CURRENT_ACCOUNT_INDEX, payload: index});
};

export const importAccount = (
  dispatch,
  privateKey,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();
  AsyncStorage.getItem('accounts_info')
    .then(res => {
      let accountsInfo = JSON.parse(res);
      let foundIndex = accountsInfo.accounts.findIndex(
        item => item.privateKey === privateKey,
      );
      let importedAccountCount = accountsInfo.accounts.filter(
        item => item.isImported === true,
      ).length;
      if (foundIndex >= 0) {
        failCallback(
          `That private key is now being used by ${accountsInfo.accounts[foundIndex].name}.`,
        );
      } else {
        const importedAccount = generateAccountFromPrivateKey({
          privateKey,
          accountName:
            'Imported Account ' + (importedAccountCount + 1).toString(),
          index: accountsInfo.accounts.length,
        });
        accountsInfo.accounts.push(importedAccount);
        accountsInfo.currentAccountIndex = accountsInfo.accounts.length - 1;
        const updatedAccountsInfoString = JSON.stringify(accountsInfo);
        AsyncStorage.setItem('accounts_info', updatedAccountsInfoString)
          .then(() => {
            dispatch({type: SET_ACCOUNTS_DATA, payload: accountsInfo});
            successCallback();
          })
          .catch(err => {
            console.log('Accounts Action ERROR!!!!!: ', err);
            failCallback('ERROR occurs!');
          });
      }
    })
    .catch(err => {
      console.log('ERROR!!!!: ', err);
      failCallback('ERROR occurs!');
    });
};

// export const watchAccountBalance = dispatch => {
//   const currentNetwork = store.getState().networks.currentNetwork;
//   const network = store.getState().networks.networks[currentNetwork];
//   const balances = store.getState().balances;
//   const accounts = store.getState().accounts.accounts;
//   const currentAccountIndex = store.getState().accounts.currentAccountIndex;
//   console.log('Watch Account Balance: ', network);
//   const provider = network.networkType
//     ? ethers.getDefaultProvider(network.networkType)
//     : new ethers.providers.JsonRpcProvider(network.rpc);

//   provider.off('block');
//   provider.on('block', blockNum => {
//     console.log('Detect: ', blockNum);
//   });
// };
