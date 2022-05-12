import {
  SET_CURRENT_USER,
  SET_SELECTED_ZCARD,
} from './types';

// set default Redux state
const initialState = {
  currentUser: {},
  selectedZCard:null,
};

// reducer with cases for Redux
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, currentUser: action.user
      };
    case SET_SELECTED_ZCARD:
      return {
        ...state, selectedZCard: action.zcard
      };
  }
}

export default reducer;