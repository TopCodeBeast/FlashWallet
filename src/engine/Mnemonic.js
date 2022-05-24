import bip39 from 'react-native-bip39';

const createMnemonic = () => {
  bip39
    .generateMnemonic()
    .then(mnemonic => {
      console.log(mnemonic);
    })
    .catch(err => console.log('ERRORRRRRRRRRRR!!!!!: ', err));
};

export default {
  createMnemonic,
};
