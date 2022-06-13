// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import erc20ABI from '../../abis/erc20ABI.json';
import Toast from 'react-native-toast-message';

export const sendTransaction = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  beforeWork();
  const {currentNetworkRPC, fromPrivateKey, toAddress, value, token, feeInfo} =
    data;
  const provider = new ethers.providers.JsonRpcProvider(currentNetworkRPC);
  const wallet = new ethers.Wallet(fromPrivateKey, provider);
  if (token === 'main') {
    const rawTx = {
      to: toAddress,
      value: ethers.utils.parseEther(value.toString()),
      ...feeInfo,
    };
    wallet
      .populateTransaction(rawTx)
      .then(tx => {
        console.log('Transaction Action send Main: ', tx);
        successCallback(tx);
        wallet
          .sendTransaction(tx)
          .then(resTxn => {
            console.log('transaction action:::::', resTxn);
            resTxn
              .wait()
              .then(receipt => {
                Toast.show({
                  type: 'txnCompleted',
                  position: 'bottom',
                  bottomOffset: 120,
                  props: {
                    transaction: {...resTxn},
                  },
                });
              })
              .catch(err => {
                console.log(err, err.reason);
                if (err.reason != 'cancelled') {
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    bottomOffset: 120,
                    text1: 'Error occured',
                    props: {
                      error: err,
                    },
                  });
                }
              });
          })
          .catch(err => {
            console.log('Transaction Action Error:::::: ', err);
            failCallback();
          });
      })
      .catch(err => {
        console.log('Transaction Action Error:::::: ', err);
        failCallback();
      });
  } else {
    const tokenContract = new ethers.Contract(
      token.tokenAddress,
      erc20ABI,
      provider,
    );
    tokenContract.populateTransaction
      .transfer(toAddress, ethers.utils.parseEther(value.toString()))
      .then(rawTx => {
        console.log('Transaction actions raw tx: ', rawTx);
        successCallback({...rawTx, ...feeInfo});
        wallet
          .sendTransaction({...rawTx, ...feeInfo})
          .then(resTxn => {
            console.log(
              'Token send Transaction actions;;;;;;; Res txn:::: ',
              resTxn,
            );
            resTxn
              .wait()
              .then(receipt => {
                Toast.show({
                  type: 'txnCompleted',
                  position: 'bottom',
                  bottomOffset: 120,
                  props: {
                    transaction: {...resTxn},
                  },
                });
              })
              .catch(err => {
                console.log(err, err.reason);
                if (err.reason != 'cancelled') {
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    bottomOffset: 120,
                    text1: 'Error occured',
                    props: {
                      error: err,
                    },
                  });
                }
              });
          })
          .catch(err => {
            console.log('Transaction Action Error:::::: ', err);
            failCallback();
          });
      })
      .catch(err => {
        console.log('Transaction Action Error:::::: ', err);
        failCallback();
      });
  }
};
