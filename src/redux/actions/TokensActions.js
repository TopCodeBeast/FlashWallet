import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_TOKENS_DATA} from '../types';

export const getTokensList = (
  dispatch,
  currentNetwork,
  currentAccountIndex,
  successCallback,
) => {
  AsyncStorage.getItem('tokens_info')
    .then(res => {
      const data = JSON.parse(res);
      const tokensList = data[currentNetwork.toString()]
        ? data[currentNetwork.toString()][currentAccountIndex]
          ? data[currentNetwork.toString()][currentAccountIndex].tokensList
          : []
        : [];
      successCallback(tokensList);
    })
    .catch(err => {
      console.log('Token actions: ERROR!!!!!: ', err);
      successCallback([]);
    });
};

export const addToken = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();
  const {token, currentNetwork, currentAccountIndex} = data;
  AsyncStorage.getItem('tokens_info')
    .then(res => {
      let data = JSON.parse(res);
      if (!data[currentNetwork.toString()]) {
        data[currentNetwork.toString()] = {};
      }
      if (!data[currentNetwork.toString()][currentAccountIndex]) {
        data[currentNetwork.toString()][currentAccountIndex] = {
          tokensList: [],
        };
      }
      data[currentNetwork.toString()][currentAccountIndex].tokensList.push(
        token,
      );
      AsyncStorage.setItem('tokens_info', JSON.stringify(data))
        .then(() => {
          dispatch({type: SET_TOKENS_DATA, payload: data});
          setTimeout(() => {
            successCallback();
          }, 0);
        })
        .catch(err => {
          console.log('Token actions: ERROR!!!!!: ', err);
          failCallback();
        });
    })
    .catch(err => {
      console.log('Token actions: ERROR!!!!!: ', err);
      failCallback();
    });
};

export const loadTokensDataFromStorage = dispatch => {
  AsyncStorage.getItem('tokens_info')
    .then(res => {
      const data = JSON.parse(res);
      dispatch({type: SET_TOKENS_DATA, payload: data});
    })
    .catch(err => {
      console.log('Token actions: ERROR!!!!!: ', err);
    });
};
