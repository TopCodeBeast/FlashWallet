import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_NETWORKS_DATA} from '../types';

export const loadNetworksDataFromStorage = dispatch => {
  AsyncStorage.getItem('networks_info')
    .then(res => {
      const data = JSON.parse(res);
      dispatch({type: SET_NETWORKS_DATA, payload: data});
    })
    .catch(err => {
      console.log('NetworkActions: ERROR!!!!!!: ', err);
    });
};
