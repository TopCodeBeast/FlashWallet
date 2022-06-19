import {
  getPriceDataBinance,
  getSwapEstimatedGasLimitBinance,
} from './swapBinance';
import {
  getPriceDataEthereum,
  getSwapEstimatedGasLimitEthereum,
} from './swapEthereum';

export const getPriceData = (currentNetwork, fromTokenData, toTokenData) => {
  if (currentNetwork.chainType == 'ethereum') {
    return getPriceDataEthereum(currentNetwork, fromTokenData, toTokenData);
  } else if (currentNetwork.chainType == 'binance') {
    return getPriceDataBinance(currentNetwork, fromTokenData, toTokenData);
  }
};

export const getSwapEstimatedGasLimit = data => {
  const {currentNetwork} = data;
  if (currentNetwork.chainType == 'ethereum') {
    return getSwapEstimatedGasLimitEthereum(data);
  } else if (currentNetwork.chainType == 'binance') {
    return getSwapEstimatedGasLimitBinance(data);
  }
};
