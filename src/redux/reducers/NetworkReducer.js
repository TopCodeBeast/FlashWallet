import {SET_CURRENT_NETWORK, SET_NETWORKS_DATA} from '../types';

import {NetworkList, RINKEBY} from '../../engine/constants';

const initialState = {
  currentNetwork: RINKEBY,
  networks: NetworkList,
};

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORKS_DATA: {
      console.log('Network Action: ', SET_NETWORKS_DATA);
      return {
        ...state,
        currentNetwork: action.payload?.currentNetwork || state.currentNetwork,
        networks: Object.assign({}, action.payload?.networks || state.networks),
      };
    }
    case SET_CURRENT_NETWORK: {
      console.log('Network Actions: ', SET_CURRENT_NETWORK);
      return {
        ...state,
        currentNetwork: action.payload,
      };
    }
    default:
      return state;
  }
};

export default NetworkReducer;
