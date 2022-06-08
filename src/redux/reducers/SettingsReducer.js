import {
  SET_BASE_CURRENCY,
  SET_CURRENT_LANGUAGE,
  SET_AUTOLOCK_TIME,
  SET_PRIVACY_CURRENCY,
  SET_SEARCH_ENGINE,
  SET_SETTINGS_DATA,
} from '../types';
import {initialSettings} from '../../engine/constants';

const initialState = {...initialSettings};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_BASE_CURRENCY: {
      return {
        ...state,
        baseCurrency: action.payload,
      };
    }
    case SET_CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }
    case SET_AUTOLOCK_TIME: {
      return {
        ...state,
        autoLockTime: parseInt(action.payload),
      };
    }
    case SET_PRIVACY_CURRENCY: {
      return {...state, privacyCurrency: action.payload};
    }
    case SET_SEARCH_ENGINE: {
      return {
        ...state,
        searchEngine: action.payload,
      };
    }
    default:
      return state;
  }
};

export default SettingsReducer;
