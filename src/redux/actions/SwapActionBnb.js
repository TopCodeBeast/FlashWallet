import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';

import {
  Token,
  WETH,
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Percent,
} from '@pancakeswap/sdk';
import PANCAKESWAP from '@pancakeswap/sdk';
import {pancakeSwapRouterAddress} from '../../engine/constants';

const PANCAKESWAP_ROUTER_ADDRESS = pancakeSwapRouterAddress;
import PANCAKESWAP_ROUTER_ABI from '../../abis/uniswapRouterABI.json';
import Toast from 'react-native-toast-message';

const approveRouter = async (provider, wallet, tokenAddress, amount) => {
  let approveAbi = [
    // approve
    {
      constant: true,
      inputs: [
        {name: '_spender', type: 'address'},
        {name: '_value', type: 'uint256'},
      ],
      name: 'approve',
      outputs: [{name: 'success', type: 'bool'}],
      type: 'function',
    },
  ];
  const contract = new ethers.Contract(tokenAddress, approveAbi, provider);
  const approveTxn = await contract.populateTransaction.approve(
    PANCAKESWAP_ROUTER_ADDRESS, //Router
    amount,
  );
  console.log('Approve Txn:::::::: ', approveTxn);
  const txnRes = await wallet.sendTransaction(approveTxn);
  // console.log("Approve Txn Res::::::: ", txnRes);
  const txnReceipt = await txnRes.wait();
  console.log('Approve Txn Receipt:::::: ', txnReceipt);
};

export const swapTokenBnb = (
  dispatch,
  data,
  beforeWork,
  successCallback,
  failCallback,
) => {
  const {
    currentNetwork,
    currentAccount,
    fromTokenData,
    toTokenData,
    fromValue,
    toValue,
    slippage,
    gasLimit,
  } = data;
  const provider = new ethers.providers.JsonRpcProvider(currentNetwork.rpc);
  const PANCAKESWAP_ROUTER_CONTRACT = new ethers.Contract(
    PANCAKESWAP_ROUTER_ADDRESS,
    PANCAKESWAP_ROUTER_ABI,
    provider,
  );
  const fromToken =
    fromTokenData == 'main'
      ? WETH[currentNetwork.chainId]
      : new Token(
          currentNetwork.chainId,
          fromTokenData.tokenAddress,
          fromTokenData.tokenDecimal,
          fromTokenData.tokenSymbol,
        );
  const toToken =
    toTokenData == 'main'
      ? WETH[currentNetwork.chainId]
      : new Token(
          currentNetwork.chainId,
          toTokenData.tokenAddress,
          toTokenData.tokenDecimal,
          toTokenData.tokenSymbol,
        );

  beforeWork();

  (() => {
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = new ethers.Wallet(currentAccount.privateKey, provider);

        const pair = await Fetcher.fetchPairData(toToken, fromToken, provider); //creating instances of a pair
        const route = await new Route([pair], fromToken); // a fully specified path from input token to output token
        let amountIn = ethers.utils.parseEther(fromValue.toString()); //helper function to convert ETH to Wei
        amountIn = amountIn.toString();

        const slippageTolerance = new Percent(
          parseInt(Number(slippage) * 100),
          '10000',
        ); // 50 bips, or 0.50% - Slippage tolerance

        const trade = new Trade( //information necessary to create a swap transaction.
          route,
          new TokenAmount(fromToken, amountIn),
          TradeType.EXACT_INPUT,
        );

        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
        const amountInMax = trade.maximumAmountIn(slippageTolerance).raw;

        const amountOutMinHex = ethers.BigNumber.from(
          amountOutMin.toString(),
        ).toHexString();
        const amountInMaxHex = ethers.BigNumber.from(
          amountInMax.toString(),
        ).toHexString();
        const path = [fromToken.address, toToken.address]; //An array of token addresses
        const to = currentAccount.address; // should be a checksummed recipient address
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
        const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
        const valueHex = await ethers.BigNumber.from(
          value.toString(),
        ).toHexString(); //convert to hex string
        const amountInHex = valueHex;
        const amountOutValue = trade.outputAmount.raw;
        const amountOutHex = await ethers.BigNumber.from(
          amountOutValue.toString(),
        ).toHexString(); //convert to hex string

        console.log('AmountInMax: ', amountInMax.toString(), amountInMaxHex);
        console.log(
          'AmountOutMin: ',
          amountOutValue.toString(),
          amountOutMinHex,
        );
        console.log('AmountIn: ', value.toString(), amountInHex);
        console.log('AmountOut: ', amountOutValue.toString(), amountOutHex);

        let rawTxn;

        if (fromTokenData == 'main') {
          rawTxn =
            await PANCAKESWAP_ROUTER_CONTRACT.populateTransaction.swapExactETHForTokens(
              amountOutMinHex,
              path,
              to,
              deadline,
              {
                value: valueHex,
              },
            );
        } else if (toTokenData == 'main') {
          rawTxn =
            await PANCAKESWAP_ROUTER_CONTRACT.populateTransaction.swapExactTokensForETH(
              amountInHex,
              amountOutMinHex,
              path,
              to,
              deadline,
            );
        } else {
          rawTxn =
            await PANCAKESWAP_ROUTER_CONTRACT.populateTransaction.swapExactTokensForTokens(
              amountInHex,
              amountOutMinHex,
              path,
              to,
              deadline,
            );
        }

        console.log(rawTxn);
        await approveRouter(provider, wallet, fromToken.address, amountIn);
        const refinedTxn = await wallet.populateTransaction(rawTxn);
        successCallback(refinedTxn);
        const gasLimit = await wallet.estimateGas(rawTxn);
        console.log('Swap gaslimit: ', gasLimit);
        const txnRes = await wallet.sendTransaction(rawTxn);
        console.log('Swap Txn response::::: ', txnRes);
        const txnReceipt = await txnRes.wait();
        Toast.show({
          type: 'txnCompleted',
          position: 'bottom',
          bottomOffset: 120,
          props: {
            transaction: {...txnRes},
          },
        });
        console.log('Swap Txn Receipt:::: ', txnReceipt);
        // resolve(gasLimit);
      } catch (err) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 120,
          text1: 'Error occured',
          props: {
            error: err,
          },
        });
        failCallback(err);
        reject(err);
      }
    });
  })()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('Swap Tokens ERR:::::::', err);
    });
};
