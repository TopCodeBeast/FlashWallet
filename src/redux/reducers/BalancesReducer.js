import {
  SET_BALANCE_UPDATED_INFO,
  SET_TOKEN_BALANCE_UPDATED_INFO,
} from '../types';

const initialState = {
  balancesInfo: {},
};

const BalancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BALANCE_UPDATED_INFO: {
      return {
        ...state,
        balancesInfo: {
          ...state.balancesInfo,
          [action.payload.address]: {
            ...(state.balancesInfo[action.payload.address] || {}),
            main: action.payload.balance,
          },
        },
      };
    }
    case SET_TOKEN_BALANCE_UPDATED_INFO: {
      return {
        ...state,
        balancesInfo: {
          ...state.balancesInfo,
          [action.payload.address]: {
            ...(state.balancesInfo[action.payload.address] || {}),
            [action.payload.tokenAddress]: action.payload.balance,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default BalancesReducer;
