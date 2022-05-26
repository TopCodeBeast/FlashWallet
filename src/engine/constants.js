export const MAINNET = 'mainnet';
export const ROPSTEN = 'ropsten';
export const KOVAN = 'kovan';
export const RINKEBY = 'rinkeby';
export const GOERLI = 'goerli';
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
  },
  [ROPSTEN]: {
    name: 'Ropsten Test Network',
    shortName: 'Ropsten',
    networkId: 3,
    chainId: 3,
    hexChainId: '0x3',
    color: '#ff4a8d',
    networkType: 'ropsten',
  },
  [KOVAN]: {
    name: 'Kovan Test Network',
    shortName: 'Kovan',
    networkId: 42,
    chainId: 42,
    hexChainId: '0x2a',
    color: '#7057ff',
    networkType: 'kovan',
  },
  [RINKEBY]: {
    name: 'Rinkeby Test Network',
    shortName: 'Rinkeby',
    networkId: 4,
    chainId: 4,
    hexChainId: '0x4',
    color: '#f6c343',
    networkType: 'rinkeby',
  },
  [GOERLI]: {
    name: 'Goerli Test Network',
    shortName: 'Goerli',
    networkId: 5,
    chainId: 5,
    hexChainId: '0x5',
    color: '#3099f2',
    networkType: 'goerli',
  },
  [RPC]: {
    name: 'Private Network',
    shortName: 'Private',
    color: '#f2f3f4',
    networkType: 'rpc',
  },
};
