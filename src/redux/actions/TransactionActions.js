// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import erc20ABI from '../../abis/erc20ABI.json';

export const sendTransaction = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();
  const {currentNetworkRPC, fromPrivateKey, toAddress, value, token} = data;
  const provider = new ethers.providers.JsonRpcProvider(currentNetworkRPC);
  const wallet = new ethers.Wallet(fromPrivateKey, provider);
  if (token === 'main') {
    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther(value.toString()),
    };
    wallet
      .sendTransaction(tx)
      .then(receipt => {
        console.log(receipt);
        successCallback(receipt);
      })
      .catch(err => {
        console.log('Transaction Action Error:::::: ', err);
        failCallback();
      });
  } else {
    const tokenContract = new ethers.Contract(
      token.tokenAddress,
      erc20ABI,
      provider,
    );
    tokenContract.populateTransaction
      .transfer(toAddress, ethers.utils.parseEther(value.toString()))
      .then(rawTx => {
        console.log('Transaction actions raw tx: ', rawTx);
        wallet
          .sendTransaction(rawTx)
          .then(receipt => {
            console.log(receipt);
            successCallback(receipt);
          })
          .catch(err => {
            console.log('Transaction Action Error:::::: ', err);
            failCallback();
          });
      })
      .catch(err => {
        console.log('Transaction Action Error:::::: ', err);
        failCallback();
      });
  }
};
