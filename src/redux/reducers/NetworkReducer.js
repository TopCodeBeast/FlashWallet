import {SET_ACCOUNTS_DATA} from '../types';

import {NetworkList} from '../../engine/constants';

const initialState = {
  currentNetwork: NetworkList.rinkeby,
  networks: NetworkList,
};

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return initialState;
  }
};

export default NetworkReducer;
