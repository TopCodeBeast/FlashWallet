import {SET_ACCOUNTS_DATA, SET_INITIAL_ACCOUNT_DATA} from '../types';

const initialState = {
  accounts: [],
  currentAccountIndex: -1,
};

const AccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_ACCOUNT_DATA: {
      console.log('ACCOUNT Action');
      return {
        ...state,
        accounts: [action.payload],
        currentAccountIndex: 0,
      };
    }
    default: {
      console.log('Account DEFAULT: ', state);
      return state;
    }
  }
};

export default AccountsReducer;

// case 'test': {
//   console.log('HERE TEst ACtiON;');
//   return state;
// }
