import {SET_BALANCE_UPDATED_INFO} from '../types';

export const updateBalanceInfo = (dispatch, data) => {
  dispatch({type: SET_BALANCE_UPDATED_INFO, payload: data});
};
