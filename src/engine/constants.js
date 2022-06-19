export const infuraApiKey = '9aa3d95b3bc440fa88ea12eaa4456161';
export const coinmarketcapApiKey = '35b4830d-54a6-45f1-802e-29dc8647e044';
export const uniswapRouterAddress =
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
export const pancakeSwapRouterAddress =
  '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'; //0x10ED43C718714eb63d5aA57B78B54704E256024E
export const MAINNET = '1';
export const ROPSTEN = '3';
export const KOVAN = '42';
export const RINKEBY = '4';
export const GOERLI = '5';
export const RPC = 'rpc';
export const NO_RPC_BLOCK_EXPLORER = 'NO_BLOCK_EXPLORER';
export const PRIVATENETWORK = 'PRIVATENETWORK';
export const BSCTESTNET = '97';

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
    symbol: 'ETH',
    chainType: 'ethereum',
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
    symbol: 'ETH',
    chainType: 'ethereum',
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
    symbol: 'ETH',
    chainType: 'ethereum',
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
    symbol: 'ETH',
    chainType: 'ethereum',
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
    symbol: 'ETH',
    chainType: 'ethereum',
  },
  [BSCTESTNET]: {
    name: 'Binance Smart Chain Test Network',
    shortName: 'BSC Test',
    networkId: 97,
    chainId: 97,
    hexChainId: '0x61',
    color: '#d6f344',
    networkType: 'bsctestnet',
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    symbol: 'BNB',
    chainType: 'binance',
  },
};

export const feeRatio = {
  lowFeeRatio: 0.939999999,
  highFeeRatio: 1.333333334,
};

export const transferETHGasLimit = 21000;
export const uniswapGasLimit = 200000;
export const estimateGasRatio = 1.5;
export const swapGasRatio = 2.5;
export const gettingFeeDataTimerInterval = 5000; //ms
export const minimumEthToSwap = 0.0005;

export const numeratorForNewTxn = 13;
export const denominatorForNewTxn = 10;

export const initialSettings = {
  baseCurrency: 'USD',
  currentLanguage: 'en',
  searchEngine: 'duckduckgo',
  privacyCurrency: 'native',
  autoLockTime: 60, //s
};
