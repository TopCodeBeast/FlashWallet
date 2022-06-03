// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

export const sendTransaction = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();
  const {currentNetworkRPC, fromPrivateKey, toAddress, value} = data;
  const provider = new ethers.providers.JsonRpcProvider(currentNetworkRPC);
  const wallet = new ethers.Wallet(fromPrivateKey, provider);
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
};
