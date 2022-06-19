import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

const minAbi = [
  // decimals
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{name: '', type: 'uint8'}],
    type: 'function',
  },
  //name
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  //symbol
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const getTokenDataFromAddress = (tokenAddress, currentNetworkRPC) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(currentNetworkRPC);
      const contract = new ethers.Contract(tokenAddress, minAbi, provider);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      const name = await contract.name();
      resolve({decimals, symbol, name});
    } catch (err) {
      reject(err);
    }
  });
};
