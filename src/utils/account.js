const hdkey = require('ethereumjs-wallet').hdkey;

const avatarsCount = require('../constants').default.avatarsCount;

const createInitialAccountFromMasterSeed = masterSeed => {
  let path = "m/44'/60'/" + 0 + "'/" + 0 + "'/" + 0;
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();
  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKey().toString('hex');
  return {
    name: 'Account 1',
    privateKey,
    address,
    icon: 0,
    path,
    index: 0,
  };
};

const generateNewAccount = (masterSeed, path, accountName, index) => {
  let hdwallet = hdkey.fromMasterSeed(masterSeed);
  let wallet = hdwallet.derivePath(path).getWallet();
  let address = '0x' + wallet.getAddress().toString('hex');
  let privateKey = wallet.getPrivateKey().toString('hex');
  return {
    name: accountName,
    privateKey,
    address,
    icon: Math.floor(Math.random() * avatarsCount) % avatarsCount,
    path,
    index,
  };
};

export {createInitialAccountFromMasterSeed, generateNewAccount};
