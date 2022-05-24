import bip39 from 'bip39';

const createMnemonic = () => {
  const mnemonic = bip39.generateMnemonic();
  console.log(mnemonic);
};

export default {
  createMnemonic,
};
