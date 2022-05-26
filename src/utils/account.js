const hdkey = require('ethereumjs-wallet').hdkey;

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
    icon: 1,
    path,
  };
};

export {createInitialAccountFromMasterSeed};
