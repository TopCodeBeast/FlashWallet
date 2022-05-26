import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_ACCOUNTS_DATA} from '../types';

export const loadAccountsDataFromStorage = dispatch => {
  AsyncStorage.getItem('accounts_info')
    .then(res => {
      const data = JSON.parse(res);
      dispatch({type: SET_ACCOUNTS_DATA, payload: data});
    })
    .catch(err => {
      console.log('ERROR!!!!!!: ', err);
    });
};

export const balanceChanged = (accounts, dispatch) => {
  dispatch({
    type: SET_ACCOUNTS_DATA,
    payload: {
      accounts,
    },
  });
};
