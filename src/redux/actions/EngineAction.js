// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import {SET_FEE_DATA, SET_GETTING_FEE_DATA_TIMER_ID} from '../types';

import {feeRatio} from '../../engine/constants';

export const getFeeData = (dispatch, currentNetworkRPC) => {
  const provider = new ethers.providers.JsonRpcProvider(currentNetworkRPC);
  provider.getFeeData().then(feeData => {
    const lowFeeData = {
      maxFeePerGas: ethers.BigNumber.from(
        (feeData.maxFeePerGas * feeRatio.lowFeeRatio).toFixed(0),
      ),
      maxPriorityFeePerGas: ethers.BigNumber.from(
        (feeData.maxPriorityFeePerGas * feeRatio.lowFeeRatio).toFixed(0),
      ),
    };
    const mediumFeeData = {
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
    const highFeeData = {
      maxFeePerGas: ethers.BigNumber.from(
        (feeData.maxFeePerGas * feeRatio.highFeeRatio).toFixed(0),
      ),
      maxPriorityFeePerGas: ethers.BigNumber.from(
        (feeData.maxPriorityFeePerGas * feeRatio.highFeeRatio).toFixed(0),
      ),
    };
    dispatch({
      type: SET_FEE_DATA,
      payload: {
        low: lowFeeData,
        medium: mediumFeeData,
        high: highFeeData,
      },
    });
  });
};

export const setGettingFeeDataTimerId = (dispacth, timerId) => {
  dispacth({type: SET_GETTING_FEE_DATA_TIMER_ID, payload: timerId});
};
