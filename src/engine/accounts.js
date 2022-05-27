// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

export const getBalance = async (address, network) => {
  const provider = network.networkType
    ? ethers.getDefaultProvider(network.networkType)
    : new ethers.providers.JsonRpcProvider(network.rpc);
  return ethers.utils.formatEther(await provider.getBalance(address));
};

export const watchAccountBalance = () => {
  const provider = ethers.getDefaultProvider('rinkeby');
  const filter = {
    address: '0x632Bd9a598cd5c52F1625c850A6c46ECd4Cb7829',
  };
  provider.off('block');
  provider.on('block', blockNum => {
    console.log('Detect: ', blockNum);
  });
};
