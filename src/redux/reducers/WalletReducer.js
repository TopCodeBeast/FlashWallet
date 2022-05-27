import {SET_WALLET} from '../types';

const initialState = {
  password: '',
  mnemonic: '',
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET: {
      // console.log('SET WALLET Action');
      return {
        ...state,
        password: action.payload.password,
        mnemonic: action.payload.mnemonic,
      };
    }
    default: {
      // console.log('WALLET DEFAULT: ', state);
      return state;
    }
  }
};

export default WalletReducer;
