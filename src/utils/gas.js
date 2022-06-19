// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';
import {transferETHGasLimit, estimateGasRatio} from '../engine/constants';

import erc20ABI from '../abis/erc20ABI.json';

export const getEstimatedGasLimit = (
  privateKey,
  currentNetworkRPC,
  sendingValue,
  toAddress,
  token,
) => {
  return new Promise(async (resolve, reject) => {
    if (token === 'main') {
      return resolve(transferETHGasLimit);
    } else {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          currentNetworkRPC,
        );
        const wallet = new ethers.Wallet(privateKey, provider);
        const tokenContract = new ethers.Contract(
          token.tokenAddress,
          erc20ABI,
          provider,
        );
        const rawTx = await tokenContract.populateTransaction.transfer(
          toAddress,
          utils.parseUnits(sendingValue.toString(), token.tokenDecimal),
        );
        const gasLimit = await wallet.estimateGas(rawTx);
        resolve(parseInt(gasLimit.toNumber() * estimateGasRatio));
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }
  });
};
