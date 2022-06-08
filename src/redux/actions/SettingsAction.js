import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_SETTINGS_DATA} from '../types';

export const loadSettingsDataFromStorage = dispatch => {
  AsyncStorage.getItem('settings_info')
    .then(res => {
      const settingsInfo = JSON.parse(res);
      dispatch({type: SET_SETTINGS_DATA, payload: settingsInfo});
    })
    .catch(err => {
      console.log('Settings Action ERROR:::: ', err);
    });
};
