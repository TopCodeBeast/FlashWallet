import {SET_INITIAL_ACCOUNT_DATA} from '../types';
import bcrypt from 'bcrypt-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';
import bip39 from 'react-native-bip39';
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
      const masterSeed = bip39.mnemonicToSeed(mnemonic);
      const masterSeedString = masterSeed.toString('hex');
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
          AsyncStorage.multiSet([
            ['password', hash],
            ['mnemonic', mnemonic],
            ['master_seed', masterSeedString],
            ['accounts_info', JSON.stringify(accountsInfo)],
            ['networks_info', JSON.stringify(networksInfo)],
            ['balances_info', JSON.stringify(balancesInfo)],
            ['tokens_info', JSON.stringify(tokensInfo)],
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
