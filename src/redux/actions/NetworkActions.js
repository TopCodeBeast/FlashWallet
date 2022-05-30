import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_NETWORKS_DATA, SET_CURRENT_NETWORK} from '../types';

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

export const setCurrentNetwork = (dispatch, network) => {
  dispatch({type: SET_CURRENT_NETWORK, payload: network});
  AsyncStorage.getItem('networks_info')
    .then(res => {
      let data = JSON.parse(res);
      data.currentNetwork = network;
      AsyncStorage.setItem('networks_info', JSON.stringify(data))
        .then(() => {
          console.log(
            'Network Actions: saved currentNetwork to asyncStroage Successfully',
          );
        })
        .catch(err => {
          console.log('Network Actions: ERROR!!!!: ', err);
        });
    })
    .catch(err => {
      console.log('Network Actions: ERROR!!!!: ', err);
    });
};
