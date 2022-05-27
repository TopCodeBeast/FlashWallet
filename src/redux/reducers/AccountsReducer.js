import {SET_ACCOUNTS_DATA, SET_INITIAL_ACCOUNT_DATA} from '../types';

const initialState = {
  accounts: [],
  currentAccountIndex: -1,
};

const AccountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_ACCOUNT_DATA: {
      console.log('Account Action: ', SET_INITIAL_ACCOUNT_DATA);
      return {
        ...state,
        accounts: [action.payload],
        currentAccountIndex: 0,
      };
    }
    case SET_ACCOUNTS_DATA: {
      console.log('Account Action: ', SET_ACCOUNTS_DATA);
      return {
        ...state,
        accounts: [].concat(action.payload?.accounts || state.accounts),
        currentAccountIndex:
          action.payload?.currentAccountIndex || state.currentAccountIndex,
      };
    }
    default: {
      // console.log('Account DEFAULT: ', state);
      return state;
    }
  }
};

export default AccountsReducer;

// case 'test': {
//   console.log('HERE TEst ACtiON;');
//   return state;
// }
