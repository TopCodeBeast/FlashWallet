// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

export const watchBalance = (accounts, currentNetwork, balanceChanged) => {
  const provider = currentNetwork.networkType
    ? ethers.getDefaultProvider(currentNetwork.networkType)
    : new ethers.providers.JsonRpcProvider(currentNetwork.rpc);
  let isChanged = false;
  provider.off('block');
  provider.on('block', () => {
    let newAccounts = accounts.map(async account => {
      const balance = await provider.getBalance(account.address);
      const balanceInEther = ethers.utils.formatEther(balance).toString();
      console.log(balanceInEther);
      const curBalance = account.balance | '0';
      if (parseFloat(balanceInEther) !== parseFloat(curBalance)) {
        isChanged = true;
        return {
          ...account,
          balance: balanceInEther,
        };
      } else {
        return account;
      }
    });

    console.log(isChanged, newAccounts);
  });
  provider.off;
};
