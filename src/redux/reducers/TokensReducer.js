import {SET_SELECTED_TOKEN, SET_TOKENS_DATA} from '../types';

const initialState = {
  tokensData: {},
  selectedToken: 'main',
};

const TokensReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_SELECTED_TOKEN: {
      return {
        ...state,
        selectedToken: action.payload,
      };
    }
    default: {
      // console.log('Account DEFAULT: ', state);
      return state;
    }
  }
};

export default TokensReducer;

// case 'test': {
//   console.log('HERE TEst ACtiON;');
//   return state;
// }
