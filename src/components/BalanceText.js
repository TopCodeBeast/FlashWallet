import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {updateBalanceInfo} from '../redux/actions/BalancesActions';

const BalanceText = ({
  style,
  address,
  balancesInfo,
  networks,
  currentNetwork,
  updateBalanceInfo,
}) => {
  useEffect(() => {
    let beforeBalance = balancesInfo[address]
      ? balancesInfo[address].main
        ? parseFloat(balancesInfo[address].main)
        : 0
      : 0;
    // console.log('init beforeBalance:::: ', beforeBalance);
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    provider.on('block', blockNum => {
      provider.getBalance(address).then(res => {
        const value = ethers.utils.formatEther(res);
        // console.log(
        //   'Balance of ',
        //   address,
        //   'Detail: ',
        //   balancesInfo[address],
        //   parseFloat(balancesInfo[address].main),
        //   parseFloat(value),
        //   !balancesInfo[address] ||
        //     !(parseFloat(balancesInfo[address].main) === parseFloat(value)),
        // );
        // console.log('beforeBalance is ::::: ', beforeBalance);
        if (parseFloat(beforeBalance) !== parseFloat(value)) {
          // console.log(
          //   'Updating Balance of ' + address + ' ..............',
          //   parseFloat(beforeBalance),
          //   parseFloat(value),
          // );
          beforeBalance = parseFloat(value);
          updateBalanceInfo({
            address,
            balance: value,
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
      ? balancesInfo[address].main
        ? parseFloat(balancesInfo[address].main)
        : 0
      : 0;
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    provider.getBalance(address).then(res => {
      const value = ethers.utils.formatEther(res);
      if (parseFloat(beforeBalance) !== parseFloat(value)) {
        // console.log(
        //   'Updating Balance of ' + address + ' ..............',
        //   value,
        // );
        updateBalanceInfo({
          address,
          balance: value,
        });
      }
    });
  }, [currentNetwork]);

  const currentNetworkSymbol = networks[currentNetwork].symbol;
  return (
    <Text style={style}>
      {balancesInfo[address]
        ? parseFloat(balancesInfo[address].main) > 0
          ? parseFloat(balancesInfo[address].main).toFixed(4) +
            ' ' +
            currentNetworkSymbol
          : '0 ' + currentNetworkSymbol
        : '0 ' + currentNetworkSymbol}
    </Text>
  );
};

const mapStateToProps = state => {
  return {
    balancesInfo: state.balances.balancesInfo,
    networks: state.networks.networks,
    currentNetwork: state.networks.currentNetwork,
  };
};
const mapDispatchToProps = dispatch => ({
  updateBalanceInfo: data => updateBalanceInfo(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceText);
