import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_ACCOUNTS_DATA} from '../types';

import {store} from '../store';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

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

export const watchAccountBalance = dispatch => {
  const currentNetwork = store.getState().networks.currentNetwork;
  const network = store.getState().networks.networks[currentNetwork];
  const balances = store.getState().balances;
  const accounts = store.getState().accounts.accounts;
  const currentAccountIndex = store.getState().accounts.currentAccountIndex;
  console.log('Watch Account Balance: ', network);
  const provider = network.networkType
    ? ethers.getDefaultProvider(network.networkType)
    : new ethers.providers.JsonRpcProvider(network.rpc);

  provider.off('block');
  provider.on('block', blockNum => {
    console.log('Detect: ', blockNum);
  });
};
