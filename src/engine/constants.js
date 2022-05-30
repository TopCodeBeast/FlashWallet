const infuraApiKey = '9aa3d95b3bc440fa88ea12eaa4456161';

export const MAINNET = '1';
export const ROPSTEN = '3';
export const KOVAN = '42';
export const RINKEBY = '4';
export const GOERLI = '5';
export const RPC = 'rpc';
export const NO_RPC_BLOCK_EXPLORER = 'NO_BLOCK_EXPLORER';
export const PRIVATENETWORK = 'PRIVATENETWORK';

export const NetworkList = {
  [MAINNET]: {
    name: 'Ethereum Main Network',
    shortName: 'Ethereum',
    networkId: 1,
    chainId: 1,
    hexChainId: '0x1',
    color: '#3cc29e',
    networkType: 'mainnet',
    rpc: 'https://mainnet.infura.io/v3/' + infuraApiKey,
  },
  [ROPSTEN]: {
    name: 'Ropsten Test Network',
    shortName: 'Ropsten',
    networkId: 3,
    chainId: 3,
    hexChainId: '0x3',
    color: '#ff4a8d',
    networkType: 'ropsten',
    rpc: 'https://ropsten.infura.io/v3/' + infuraApiKey,
  },
  [KOVAN]: {
    name: 'Kovan Test Network',
    shortName: 'Kovan',
    networkId: 42,
    chainId: 42,
    hexChainId: '0x2a',
    color: '#7057ff',
    networkType: 'kovan',
    rpc: 'https://kovan.infura.io/v3/' + infuraApiKey,
  },
  [RINKEBY]: {
    name: 'Rinkeby Test Network',
    shortName: 'Rinkeby',
    networkId: 4,
    chainId: 4,
    hexChainId: '0x4',
    color: '#f6c343',
    networkType: 'rinkeby',
    rpc: 'https://rinkeby.infura.io/v3/' + infuraApiKey,
  },
  [GOERLI]: {
    name: 'Goerli Test Network',
    shortName: 'Goerli',
    networkId: 5,
    chainId: 5,
    hexChainId: '0x5',
    color: '#3099f2',
    networkType: 'goerli',
    rpc: 'https://goerli.infura.io/v3/' + infuraApiKey,
  },
};
