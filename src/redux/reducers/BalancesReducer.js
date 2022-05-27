import {SET_BALANCE_UPDATED_INFO} from '../types';

const initialState = {};

const BalancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BALANCE_UPDATED_INFO: {
      return Object.assign(
        {},
        {
          ...state,
          [action.payload.address]: {main: action.payload.balance},
        },
      );
    }
    default: {
      // console.log('Balance DEFAULT: ', state);
      return state;
    }
  }
};

export default BalancesReducer;
