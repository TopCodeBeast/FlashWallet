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
  balances,
  networks,
  currentNetwork,
  updateBalanceInfo,
}) => {
  useEffect(() => {
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    provider.on('block', blockNum => {
      provider.getBalance(address).then(res => {
        const value = ethers.utils.formatEther(res);
        // console.log(
        //   'Balance of ',
        //   address,
        //   'Detail: ',
        //   balances[address],
        //   parseFloat(balances[address].main),
        //   parseFloat(value),
        //   !balances[address] ||
        //     !(parseFloat(balances[address].main) === parseFloat(value)),
        // );
        if (
          !balances[address] ||
          !(parseFloat(balances[address].main) === parseFloat(value))
        ) {
          console.log('Updating Balance of ' + address + ' ..............');
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
    const network = networks[currentNetwork];
    const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    provider.getBalance(address).then(res => {
      const value = ethers.utils.formatEther(res);
      if (
        !balances[address] ||
        !(parseFloat(balances[address].main) === parseFloat(value))
      ) {
        console.log('Updating Balance of ' + address + ' ..............');
        updateBalanceInfo({
          address,
          balance: value,
        });
      }
    });
  }, [currentNetwork]);

  return (
    <Text style={style}>
      {balances[address]
        ? parseFloat(balances[address].main) > 0
          ? parseFloat(balances[address].main).toFixed(4) + ' ETH'
          : '0 ETH'
        : '0 ETH'}
    </Text>
  );
};

const mapStateToProps = state => ({
  balances: state.balances,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
});
const mapDispatchToProps = dispatch => ({
  updateBalanceInfo: data => updateBalanceInfo(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceText);
