import {SET_INITIAL_ACCOUNT_DATA} from '../types';
import bcrypt from 'bcrypt-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import {createInitialAccountFromMasterSeed} from '../../utils/account';

import {NetworkList, RINKEBY} from '../../engine/constants';

export const createWallet = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();

  bcrypt
    .getSalt(Constants.saltRound)
    .then(salt => {
      const {password, mnemonic} = data;
      const masterSeedString = ethers.utils.mnemonicToSeed(mnemonic).slice(2);
      const masterSeed = Buffer.from(masterSeedString, 'hex');
      bcrypt
        .hash(salt, password)
        .then(hash => {
          const initialAccountData =
            createInitialAccountFromMasterSeed(masterSeed);
          const accountsInfo = {
            accounts: [initialAccountData],
            currentAccountIndex: 0,
          };
          const networksInfo = {
            networks: NetworkList,
            currentNetwork: RINKEBY,
          };
          const balancesInfo = {
            [initialAccountData.address]: {main: '0'},
          };
          const networkKeys = Object.keys(NetworkList);
          let tokensInfo = {};
          networkKeys.forEach(key => {
            tokensInfo[key] = {
              [initialAccountData.address]: {
                tokensList: [],
              },
            };
          });
          const storingTokensInfo = {
            tokensData: tokensInfo,
            selectedToken: 'main',
          };
          AsyncStorage.multiSet([
            ['password', hash],
            ['mnemonic', mnemonic],
            ['master_seed', masterSeedString],
            ['accounts_info', JSON.stringify(accountsInfo)],
            ['networks_info', JSON.stringify(networksInfo)],
            ['balances_info', JSON.stringify(balancesInfo)],
            ['tokens_info', JSON.stringify(storingTokensInfo)],
          ])
            .then(() => {
              dispatch({
                type: SET_INITIAL_ACCOUNT_DATA,
                payload: initialAccountData,
              });

              successCallback();
            })
            .catch(err => {
              console.log('Wallet Actions: ERROR!!!!!: ', err);
              failCallback();
            });
        })
        .catch(err => {
          console.log('Wallet Actions: ERROR!!!!!: ', err);
          failCallback();
        });
    })
    .catch(err => {
      console.log('Wallet Actions: ERROR!!!!!: ', err);
      failCallback();
    });
};

export const testAction = dispatch => {
  dispatch({type: 'test', payload: 'test'});
};
