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
} from '@uniswap/sdk';
import UNISWAP from '@uniswap/sdk';
import {estimateGasRatio, uniswapRouterAddress} from '../engine/constants';

const UNISWAP_ROUTER_ADDRESS = uniswapRouterAddress;
import UNISWAP_ROUTER_ABI from '../abis/uniswapRouterABI.json';

export const getPriceData = (currentNetwork, fromTokenData, toTokenData) => {
  const provider = new ethers.providers.JsonRpcProvider(currentNetwork.rpc);
  const UNISWAP_ROUTER_CONTRACT = new ethers.Contract(
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_ROUTER_ABI,
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

  return new Promise(async (resolve, reject) => {
    try {
      console.log('Calculating swap price...');
      const res = await UNISWAP_ROUTER_CONTRACT.getAmountsOut(
        utils.parseEther('1'),
        [toToken.address, fromToken.address],
      );
      console.log(res);
      resolve(utils.formatEther(res[1]).toString());
    } catch (err) {
      reject(err);
    }
  });
};

export const getSwapEstimatedGasLimit = data => {
  const {
    currentNetwork,
    currentAccount,
    fromTokenData,
    toTokenData,
    fromValue,
    toValue,
    slippage,
  } = data;
  const provider = new ethers.providers.JsonRpcProvider(currentNetwork.rpc);
  const UNISWAP_ROUTER_CONTRACT = new ethers.Contract(
    UNISWAP_ROUTER_ADDRESS,
    UNISWAP_ROUTER_ABI,
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
  return new Promise(async (resolve, reject) => {
    try {
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

      // console.log('AmountInMax: ', amountInMax.toString(), amountInMaxHex);
      // console.log('AmountOutMin: ', amountOutValue.toString(), amountOutMinHex);
      // console.log('AmountIn: ', value.toString(), amountInHex);
      // console.log('AmountOut: ', amountOutValue.toString(), amountOutHex);

      const rawTxn =
        await UNISWAP_ROUTER_CONTRACT.populateTransaction.swapExactETHForTokens(
          amountOutMinHex,
          path,
          to,
          deadline,
          {
            value: valueHex,
          },
        );
      // console.log(rawTxn);
      const gasLimit = await provider.estimateGas(rawTxn);
      // console.log('Swap gaslimit: ', gasLimit);
      resolve(gasLimit * estimateGasRatio);
    } catch (err) {
      reject(err);
    }
  });
};
