import {SET_TOKEN_PRICE, SET_MAIN_PRICE} from '../types';

const initialState = {};

const QuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIN_PRICE: {
      return {...state};
    }
    default:
      return state;
  }
};

export default QuoteReducer;
