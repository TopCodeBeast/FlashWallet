import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {updateTokenBalanceInfo} from '../redux/actions/BalancesActions';

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{name: '_owner', type: 'address'}],
    name: 'balanceOf',
    outputs: [{name: 'balance', type: 'uint256'}],
    type: 'function',
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{name: '', type: 'uint8'}],
    type: 'function',
  },
];

const TokenBalanceText = ({
  token,
  style,
  address,
  balancesInfo,
  networks,
  currentNetwork,
  updateTokenBalanceInfo,
}) => {
  const {tokenAddress, tokenDecimal, tokenSymbol} = token;
  useEffect(() => {
    let beforeBalance = balancesInfo[address]
      ? balancesInfo[address][tokenAddress]
        ? parseFloat(balancesInfo[address][tokenAddress])
        : 0
      : 0;
    // console.log('init beforeBalance:::: ', beforeBalance);
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);

    const contract = new ethers.Contract(tokenAddress, minABI, provider);
    provider.on('block', blockNum => {
      contract.balanceOf(address).then(res => {
        const value = ethers.utils.formatUnits(res, tokenDecimal);
        // console.log('beforeBalance is ::::: ', beforeBalance);
        if (parseFloat(beforeBalance) !== parseFloat(value)) {
          // console.log(
          //   'Updating Token ' +
          //     tokenSymbol +
          //     ' Balance of ' +
          //     address +
          //     ' ..............',
          //   value,
          // );
          beforeBalance = parseFloat(value);
          updateTokenBalanceInfo({
            address,
            balance: value,
            tokenAddress,
          });
        }
      });
    });
    return () => {
      provider.off('block');
    };
  }, []);

  useEffect(() => {
    let beforeBalance = balancesInfo[address]
      ? balancesInfo[address][tokenAddress]
        ? parseFloat(balancesInfo[address][tokenAddress])
        : 0
      : 0;
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    const contract = new ethers.Contract(tokenAddress, minABI, provider);
    contract.balanceOf(address).then(res => {
      const value = ethers.utils.formatUnits(res, tokenDecimal);
      if (parseFloat(beforeBalance) !== parseFloat(value)) {
        // console.log(
        //   'Updating Token11 ' +
        //     tokenSymbol +
        //     ' Balance of ' +
        //     address +
        //     ' ..............',
        //   value,
        // );
        updateTokenBalanceInfo({
          address,
          balance: value,
          tokenAddress,
        });
      }
    });
  }, [currentNetwork]);

  return (
    <Text style={style}>
      {balancesInfo[address] != undefined &&
      balancesInfo[address][tokenAddress] != undefined
        ? parseFloat(balancesInfo[address][tokenAddress]) > 0
          ? parseFloat(balancesInfo[address][tokenAddress]).toFixed(4) +
            ' ' +
            tokenSymbol
          : '0 ' + tokenSymbol
        : '0 ' + tokenSymbol}
    </Text>
  );
};

const mapStateToProps = state => ({
  balancesInfo: state.balances.balancesInfo,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
});
const mapDispatchToProps = dispatch => ({
  updateTokenBalanceInfo: data => updateTokenBalanceInfo(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenBalanceText);
