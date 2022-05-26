import {SET_INITIAL_ACCOUNT_DATA} from '../types';
import bcrypt from 'bcrypt-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';
import bip39 from 'react-native-bip39';
import {createInitialAccountFromMasterSeed} from '../../utils/account';

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
          AsyncStorage.multiSet([
            ['password', hash],
            ['mnemonic', mnemonic],
            ['master_seed', masterSeedString],
            ['accounts_info', JSON.stringify(accountsInfo)],
          ])
            .then(() => {
              dispatch({
                type: SET_INITIAL_ACCOUNT_DATA,
                payload: initialAccountData,
              });

              successCallback();
            })
            .catch(err => {
              console.log('ERROR!!!!!: ', err);
              failCallback();
            });
        })
        .catch(err => {
          console.log('ERROR!!!!!: ', err);
          failCallback();
        });
    })
    .catch(err => {
      console.log('ERROR!!!!!: ', err);
      failCallback();
    });
};

export const testAction = dispatch => {
  dispatch({type: 'test', payload: 'test'});
};
