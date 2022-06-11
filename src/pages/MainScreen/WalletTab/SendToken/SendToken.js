import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import {fonts, colors} from '../../../../styles';
import {Avatar} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import BalanceText from '../../../../components/BalanceText';
import TokenBalanceText from '../../../../components/TokenBalanceText';
import {PrimaryButton} from '../../../../components/Buttons';
import {isValidAddress} from '../../../../utils/common';
import CanSendTokenList from '../../../../components/CanSendTokenList';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers, utils} from 'ethers';

//actions
import {sendTransaction} from '../../../../redux/actions/TransactionActions';
import {setCurrentAccountIndex} from '../../../../redux/actions/AccountsActions';
import NetworkFeeRBSheet from './NetworkFeeRBSheet';

import {
  transferETHGasLimit,
  gettingFeeDataTimerInterval,
} from '../../../../engine/constants';
import {getEstimatedGasLimit} from '../../../../engine/gas';
import {
  getFeeData,
  setGettingFeeDataTimerId,
} from '../../../../redux/actions/EngineAction';

const avatars = require('../../../../constants').default.avatars;
const avatarsCount = require('../../../../constants').default.avatarsCount;

const SendToken = ({
  onPressClose,
  accounts,
  currentAccountIndex,
  token,
  isToken,
  balancesInfo,
  networks,
  currentNetwork,
  sendTransaction,
  setCurrentAccountIndex,
  feeData,
  getFeeData,
  gettingFeeDataTimerId,
  setGettingFeeDataTimerId,
  onSubmitTxn,
  onErrorOccured,
}) => {
  const refRBNetworkFeeSheet = useRef(null);
  const refRBAccountsListSheet = useRef(null);

  const [sendAddress, setSendAddress] = useState('');
  const [status, setStatus] = useState('default');
  const [selectedToken, setSelectedToken] = useState(isToken ? token : 'main');
  const [sendValue, setSendValue] = useState('');
  const [gasLimit, setGasLimit] = useState('');
  const [error, setError] = useState('');
  const [foundAccount, setFoundAccount] = useState(undefined);
  const [amountLoading, setAmountLoading] = useState(false);
  const [sendTransactionLoading, setSendTransactionLoading] = useState(false);
  const [showMyAccounts, setShowMyAccounts] = useState(false);
  const [maxPriorityFee, setMaxPriorityFee] = useState(
    feeData.medium.maxPriorityFeePerGas,
  );
  const [maxFee, setMaxFee] = useState(feeData.medium.maxFeePerGas);
  const [networkFeeType, setNetworkFeeType] = useState('medium');
  const [sendTxnError, setSendTxnError] = useState('');

  const currentAccount = accounts[currentAccountIndex];
  const currentNetworkSymbol = networks[currentNetwork].symbol;

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('Getting Feedata');
      getFeeData(networks[currentNetwork].rpc);
    }, gettingFeeDataTimerInterval);
    setGettingFeeDataTimerId(timerId);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (networkFeeType !== 'advanced') {
      if (networkFeeType === 'low') {
        if (feeData.low.maxFeePerGas.toString() !== maxFee.toString()) {
          setMaxFee(feeData.low.maxFeePerGas);
        }
        if (
          feeData.low.maxPriorityFeePerGas.toString() !==
          maxPriorityFee.toString()
        ) {
          setMaxPriorityFee(feeData.low.maxPriorityFeePerGas);
        }
      } else if (networkFeeType === 'medium') {
        if (feeData.medium.maxFeePerGas.toString() !== maxFee.toString()) {
          setMaxFee(feeData.medium.maxFeePerGas);
        }
        if (
          feeData.medium.maxPriorityFeePerGas.toString() !==
          maxPriorityFee.toString()
        ) {
          setMaxPriorityFee(feeData.medium.maxPriorityFeePerGas);
        }
      } else if (networkFeeType === 'high') {
        if (feeData.high.maxFeePerGas.toString() !== maxFee.toString()) {
          setMaxFee(feeData.high.maxFeePerGas);
        }
        if (
          feeData.high.maxPriorityFeePerGas.toString() !==
          maxPriorityFee.toString()
        ) {
          setMaxPriorityFee(feeData.high.maxPriorityFeePerGas);
        }
      }
    }
  }, [feeData, networkFeeType]);

  const getSendingEtherGasFee = () => {
    return (
      parseFloat(utils.formatEther(feeData.high.maxFeePerGas)) *
      transferETHGasLimit
    );
  };

  const getSendingEtherMaxGasFee = () => {
    return (
      parseFloat(utils.formatEther(feeData.high.maxFeePerGas)) *
      transferETHGasLimit
    );
  };

  const findAccountNameFromAddress = address => {
    const foundIndex = accounts.findIndex(
      item => item.address.toString() === address.toString(),
    );
    if (foundIndex >= 0) {
      setFoundAccount({...accounts[foundIndex]});
    } else {
      setFoundAccount(undefined);
    }
  };

  const onAmountConfirm = () => {
    if (!(Number(sendValue) === parseFloat(sendValue))) {
      setError('Invalid Amount');
      return;
    }
    const curBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address][
          selectedToken === 'main' ? 'main' : selectedToken.tokenAddress
        ]
        ? parseFloat(
            balancesInfo[currentAccount.address][
              selectedToken === 'main' ? 'main' : selectedToken.tokenAddress
            ],
          )
        : 0
      : 0;
    if (selectedToken === 'main') {
      if (
        parseFloat(curBalance) <
        getSendingEtherGasFee() + parseFloat(sendValue)
      ) {
        setError('Insufficient Funds');
      } else {
        setGasLimit(transferETHGasLimit);
        setStatus('confirm');
      }
      return;
    }
    if (parseFloat(curBalance) < parseFloat(sendValue)) {
      setError('Insufficient Funds');
      return;
    }
    const mainBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address]['main']
      : 0;
    setAmountLoading(true);
    clearTimeout(gettingFeeDataTimerId);
    getEstimatedGasLimit(
      currentAccount.privateKey,
      networks[currentNetwork].rpc,
      sendValue,
      sendAddress,
      selectedToken,
    )
      .then(res => {
        console.log('RES::::::: ', res);
        if (parseFloat(mainBalance) < res * utils.formatEther(maxFee)) {
          setError('Insufficient ETH to send token');
          setAmountLoading(false);
        } else {
          setAmountLoading(false);
          setGasLimit(res);
          setStatus('confirm');
        }
        const timerId = setInterval(() => {
          console.log('Getting Feedata');
          getFeeData(networks[currentNetwork].rpc);
        }, gettingFeeDataTimerInterval);
        setGettingFeeDataTimerId(timerId);
      })
      .catch(err => {
        console.log(err);
        setError('Cannot send (maybe insufficient ETH to send token)');
        setAmountLoading(false);
        const timerId = setInterval(() => {
          console.log('Getting Feedata');
          getFeeData(networks[currentNetwork].rpc);
        }, gettingFeeDataTimerInterval);
        setGettingFeeDataTimerId(timerId);
      });
  };

  const onSendTransaction = () => {
    const mainBalance = balancesInfo[currentAccount.address]
      ? balancesInfo[currentAccount.address]['main']
      : 0;
    const totalGasFee = parseFloat(utils.formatEther(maxFee)) * gasLimit;
    if (selectedToken === 'main') {
      const totalAmount = parseFloat(sendValue) + totalGasFee;
      if (totalAmount > mainBalance) {
        setSendTxnError('Not enough ETH to send this transaction.');
        return;
      }
    } else {
      if (totalGasFee > mainBalance) {
        setSendTxnError('Not enough ETH to send this transaction.');
        return;
      }
    }
    if (sendTxnError.length > 0) {
      setSendTxnError('');
    }
    sendTransaction(
      {
        currentNetworkRPC: networks[currentNetwork].rpc,
        fromPrivateKey: currentAccount.privateKey,
        toAddress: sendAddress,
        value: sendValue,
        token: selectedToken,
        feeInfo: {
          maxFeePerGas: maxFee,
          maxPriorityFeePerGas: maxPriorityFee,
          gasLimit: ethers.BigNumber.from(gasLimit),
        },
      },
      () => {
        setSendTransactionLoading(true);
      },
      resTxn => {
        console.log('From Send Token:::::: ', resTxn);
        setSendTransactionLoading(false);
        onSubmitTxn(resTxn);
      },
      error => {
        setSendTransactionLoading(false);
        onErrorOccured(error);
      },
    );
  };

  const renderAccountRow = ({
    accountName,
    accountAddress,
    accountIcon,
    onPress,
    selected,
    hasKey,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        key={
          typeof hasKey === 'boolean' && hasKey === true
            ? 'renderAccountRowinsendtoken_' + accountAddress
            : Math.random().toString()
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.grey23,
                marginRight: 16,
              }}>
              <View style={{position: 'absolute', left: 0, top: 0}}>
                {accountIcon}
              </View>
            </View>
            <View>
              <View>
                <Text style={{...fonts.title2, color: 'white'}}>
                  {accountName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  {accountAddress.slice(0, 6) +
                    '...' +
                    accountAddress.slice(-4)}
                </Text>
              </View>
            </View>
            {selected && (
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5}}
                  icon={RegularIcons.checkCircle}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAccountsListRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refRBAccountsListSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <View style={{marginTop: 12}}>
          <Text style={{color: 'white', textAlign: 'center', ...fonts.title2}}>
            Accounts
          </Text>
        </View>
        <View style={{marginTop: 24, marginHorizontal: 12}}>
          {accounts.map(account => {
            return renderAccountRow({
              accountName: account.name,
              accountAddress: account.address,
              accountIcon: (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: colors.grey23,
                  }}>
                  <View style={{position: 'absolute', left: 0, top: 0}}>
                    <Avatar rounded source={avatars[account.icon]} size={24} />
                  </View>
                </View>
              ),
              onPress: () => {
                setCurrentAccountIndex(account.index);
                refRBAccountsListSheet.current.close();
              },
              selected: account.index === currentAccountIndex,
              hasKey: true,
            });
          })}
        </View>
      </RBSheet>
    );
  };

  const renderFromAccountPanel = ({canSelect}) => {
    return (
      <View style={{marginTop: 24, marginHorizontal: 24}}>
        <View>
          <Text style={{...fonts.title2, color: 'white'}}>From</Text>
        </View>
        <TouchableOpacity
          onPress={
            canSelect
              ? () => {
                  refRBAccountsListSheet.current.open();
                }
              : () => {}
          }
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.grey23,
            }}>
            <View style={{position: 'absolute', left: 0, top: 0}}>
              <Avatar rounded source={avatars[currentAccount.icon]} size={24} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 16,
            }}>
            <View>
              <Text style={{...fonts.title2, color: 'white'}}>
                {currentAccount.name}
              </Text>
              <Text
                style={{
                  ...fonts.caption_small12_18_regular,
                  color: colors.grey9,
                }}>
                Balance:{' '}
                {!isToken ? (
                  <BalanceText
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}
                    address={currentAccount.address}
                  />
                ) : (
                  <TokenBalanceText
                    address={currentAccount.address}
                    token={selectedToken}
                    style={{
                      ...fonts.caption_small12_18_regular,
                      color: colors.grey9,
                    }}
                  />
                )}
              </Text>
            </View>
            {canSelect && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  marginRight: 16,
                }}>
                <FontAwesome
                  style={{fontSize: 16, color: 'white', marginRight: 24}}
                  icon={SolidIcons.chevronRight}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecentAccountsPanel = () => {
    return (
      <View style={{marginTop: 24, marginHorizontal: 24}}>
        <Text style={{...fonts.title2, color: colors.grey9}}>Recent</Text>
        <View style={{marginTop: 16}}>
          {renderAccountRow({
            accountName: 'Beexay',
            accountAddress: '0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996',
            accountIcon: (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.grey23,
                }}>
                <View style={{position: 'absolute', left: 0, top: 0}}>
                  <Avatar rounded source={avatars[0]} size={24} />
                </View>
              </View>
            ),
            onPress: () => {},
          })}
          {renderAccountRow({
            accountName: 'Dasun Bussi',
            accountAddress: '0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996',
            accountIcon: (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.grey23,
                }}>
                <View style={{position: 'absolute', left: 0, top: 0}}>
                  <Avatar rounded source={avatars[1]} size={24} />
                </View>
              </View>
            ),
            onPress: () => {},
          })}
          {renderAccountRow({
            accountName: 'Smart Gevan',
            accountAddress: '0xD5cB0bdA7579E9bfb9D670218b8CFe1Ac7024996',
            accountIcon: (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.grey23,
                }}>
                <View style={{position: 'absolute', left: 0, top: 0}}>
                  <Avatar rounded source={avatars[2]} size={24} />
                </View>
              </View>
            ),
            onPress: () => {},
          })}
        </View>
      </View>
    );
  };

  const renderDefaultStatus = () => {
    return (
      <View style={{height: '100%'}}>
        <ScrollView style={{marginBottom: 120}}>
          {renderAccountsListRBSheet()}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                Send to
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome
                onPress={onPressClose}
                style={{fontSize: 16, color: 'white', marginRight: 16}}
                icon={SolidIcons.times}
              />
            </TouchableOpacity>
          </View>
          {renderFromAccountPanel({canSelect: true})}
          <View style={{marginTop: 24, marginHorizontal: 24}}>
            <View>
              <Text style={{...fonts.title2, color: 'white'}}>To</Text>
            </View>
            {isValidAddress(sendAddress) ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {renderAccountRow({
                  accountName: foundAccount ? foundAccount.name : 'Unknown',
                  accountAddress: sendAddress,
                  accountIcon: (
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: colors.grey23,
                      }}>
                      <View style={{position: 'absolute', left: 0, top: 0}}>
                        <Avatar
                          rounded
                          source={avatars[foundAccount ? foundAccount.icon : 0]}
                          size={24}
                        />
                      </View>
                    </View>
                  ),
                })}
                <TouchableOpacity
                  style={{flex: 1, flexDirection: 'row-reverse'}}>
                  <FontAwesome
                    onPress={() => {
                      setSendAddress('');
                      setFoundAccount(undefined);
                      setShowMyAccounts(false);
                    }}
                    style={{fontSize: 16, color: 'white'}}
                    icon={SolidIcons.times}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View
                  style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: colors.grey12,
                    paddingHorizontal: 16,
                  }}>
                  <View>
                    <TextInput
                      style={{
                        padding: 16,
                        height: 64,
                        color: 'white',
                        ...fonts.para_semibold,
                        width: Dimensions.get('screen').width - 120,
                      }}
                      placeholder={'Search public address (0x) or ENS'}
                      placeholderTextColor={colors.grey12}
                      value={sendAddress}
                      onChangeText={value => {
                        setSendAddress(value);
                        if (isValidAddress(value)) {
                          findAccountNameFromAddress(value);
                        } else {
                          setFoundAccount(undefined);
                        }
                      }}
                    />
                  </View>

                  <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                    <SvgXml xml={fonts.qrScanSvgXml} />
                  </View>
                </View>
                {foundAccount != undefined && (
                  <Text
                    style={{
                      color: colors.green5,
                      ...fonts.para_regular,
                      marginLeft: 12,
                    }}>
                    {foundAccount.name}
                  </Text>
                )}
              </>
            )}
          </View>
          {isValidAddress(sendAddress) ? (
            <></>
          ) : (
            <>
              {!showMyAccounts ? (
                <TouchableOpacity
                  style={{marginTop: 24, marginHorizontal: 24}}
                  onPress={() => {
                    setShowMyAccounts(true);
                  }}>
                  <Text style={{...fonts.btn_medium_link, color: colors.blue5}}>
                    Transfer Between My Accounts
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginTop: 24, marginHorizontal: 24}}>
                  {accounts.map(account =>
                    renderAccountRow({
                      accountName: account.name,
                      accountAddress: account.address,
                      accountIcon: (
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.grey23,
                          }}>
                          <View style={{position: 'absolute', left: 0, top: 0}}>
                            <Avatar
                              rounded
                              source={avatars[account.icon]}
                              size={24}
                            />
                          </View>
                        </View>
                      ),
                      onPress: () => {
                        setSendAddress(account.address);
                        setFoundAccount(account);
                      },
                    }),
                  )}
                </View>
              )}
              {renderRecentAccountsPanel()}
            </>
          )}
        </ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 80,
            marginHorizontal: 24,
          }}>
          <PrimaryButton
            onPress={() => {
              setStatus('selected');
            }}
            text="Next"
            enableFlag={isValidAddress(sendAddress)}
          />
        </View>
      </View>
    );
  };

  const renderNetworkFeeRBSheet = () => {
    return (
      <RBSheet
        height={700}
        ref={refRBNetworkFeeSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <NetworkFeeRBSheet
          networkFeeType={networkFeeType}
          maxFee={maxFee}
          maxPriorityFee={maxPriorityFee}
          gasLimit={gasLimit}
          onSave={({type, data}) => {
            // console.log(type, data);
            if (type !== 'advanced') {
              setNetworkFeeType(type);
              setMaxFee(feeData[type].maxFeePerGas);
              setMaxPriorityFee(feeData[type].maxPriorityFeePerGas);
              setGasLimit(parseInt(data.gasLimit));
            } else {
              setNetworkFeeType('advanced');
              setMaxFee(utils.parseUnits(data.maxFee, 'gwei'));
              setMaxPriorityFee(utils.parseUnits(data.maxPriorityFee, 'gwei'));
              setGasLimit(parseInt(data.gasLimit));
            }
            refRBNetworkFeeSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const renderSelectedStatus = () => {
    return (
      <View style={{height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginLeft: 12}}>
            <FontAwesome
              onPress={() => {
                setStatus('default');
                setSendAddress('');
                setFoundAccount(undefined);
                setShowMyAccounts(false);
                setError('');
                setSendValue('');
              }}
              style={{fontSize: 16, color: 'white', marginRight: 16}}
              icon={SolidIcons.chevronLeft}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Amount
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressClose();
            }}>
            <FontAwesome
              onPress={onPressClose}
              style={{fontSize: 16, color: 'white', marginRight: 16}}
              icon={SolidIcons.times}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 24,
            marginRight: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <CanSendTokenList
              selectedToken={selectedToken}
              onSelectToken={token => {
                setSelectedToken(token);
                setSendValue('');
              }}
            />
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 12}}
            onPress={() => {
              const curBalance = balancesInfo[currentAccount.address]
                ? balancesInfo[currentAccount.address][
                    selectedToken === 'main'
                      ? 'main'
                      : selectedToken.tokenAddress
                  ]
                  ? parseFloat(
                      balancesInfo[currentAccount.address][
                        selectedToken === 'main'
                          ? 'main'
                          : selectedToken.tokenAddress
                      ],
                    )
                  : 0
                : 0;
              setSendValue(
                parseFloat(
                  selectedToken === 'main'
                    ? curBalance - getSendingEtherGasFee()
                    : curBalance,
                ).toString(),
              );
            }}>
            <Text style={{...fonts.btn_medium_normal, color: colors.green5}}>
              Use Max
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaskedView
            maskElement={
              <TextInput
                placeholder="0"
                value={sendValue}
                style={{...fonts.big_type1}}
              />
            }>
            <LinearGradient colors={colors.gradient8}>
              <TextInput
                placeholder="0"
                value={sendValue}
                style={{...fonts.big_type1, opacity: 0}}
                onChangeText={value => {
                  setSendValue(value);
                  setError('');
                }}
              />
            </LinearGradient>
          </MaskedView>
        </View>
        {error.length > 0 && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 16,
              ...fonts.para_regular,
              color: colors.red5,
            }}>
            {error}
          </Text>
        )}
        <View style={{marginTop: 40}}>
          {selectedToken === 'main' ? (
            <BalanceText
              address={currentAccount.address}
              style={{
                ...fonts.para_regular,
                color: 'white',
                textAlign: 'center',
              }}
            />
          ) : (
            <TokenBalanceText
              address={currentAccount.address}
              style={{
                ...fonts.para_regular,
                color: 'white',
                textAlign: 'center',
              }}
              token={selectedToken}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 80,
            marginHorizontal: 24,
          }}>
          <PrimaryButton
            loading={amountLoading}
            onPress={onAmountConfirm}
            text="Next"
            enableFlag={sendValue.length > 0}
          />
        </View>
      </View>
    );
  };

  const renderConfirmStatus = () => {
    const totalGasFee = parseFloat(utils.formatEther(maxFee)) * gasLimit;
    return (
      <View style={{height: '100%'}}>
        {renderNetworkFeeRBSheet()}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginLeft: 12}}>
            <FontAwesome
              onPress={() => {
                setStatus('selected');
              }}
              style={{fontSize: 16, color: 'white', marginRight: 16}}
              icon={SolidIcons.chevronLeft}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Confirm
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome
              onPress={onPressClose}
              style={{fontSize: 16, color: 'white', marginRight: 16}}
              icon={SolidIcons.times}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 24}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              ...fonts.para_regular,
            }}>
            Amount
          </Text>
        </View>
        <View style={{marginTop: 24}}>
          <MaskedView
            maskElement={
              <Text style={{textAlign: 'center', ...fonts.big_type1}}>
                {selectedToken === 'main'
                  ? sendValue + ' ' + currentNetworkSymbol
                  : sendValue + ' ' + selectedToken.tokenSymbol}
              </Text>
            }>
            <LinearGradient colors={colors.gradient8}>
              <Text
                style={{textAlign: 'center', ...fonts.big_type1, opacity: 0}}>
                {selectedToken === 'main'
                  ? sendValue + ' ' + currentNetworkSymbol
                  : sendValue + ' ' + selectedToken.tokenSymbol}
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
        {renderFromAccountPanel({canSelect: false})}
        <View style={{marginTop: 24, marginHorizontal: 24}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>To</Text>
          </View>
          {renderAccountRow({
            accountName: foundAccount ? foundAccount.name : 'Unknown',
            accountAddress: sendAddress,
            accountIcon: (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.grey23,
                }}>
                <View style={{position: 'absolute', left: 0, top: 0}}>
                  <Avatar
                    rounded
                    source={avatars[foundAccount ? foundAccount.icon : 0]}
                    size={24}
                  />
                </View>
              </View>
            ),
          })}
        </View>
        <View
          style={{
            marginTop: 40,
            padding: 16,
            marginHorizontal: 24,
            borderWidth: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderColor: colors.grey22,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                Amount
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                {sendValue +
                  ' ' +
                  (selectedToken === 'main'
                    ? '' + currentNetworkSymbol
                    : selectedToken.tokenSymbol)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <View style={{flexDirection: 'row', alignItem: 'center'}}>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                Network Fee
              </Text>
              <TouchableOpacity
                onPress={() => {
                  refRBNetworkFeeSheet.current.open();
                }}>
                <Text
                  style={{
                    ...fonts.para_semibold,
                    color: colors.green5,
                    marginLeft: 12,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{...fonts.para_regular, color: 'white'}}>
                {totalGasFee + ' ' + currentNetworkSymbol}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 24,
            padding: 16,
            borderWidth: 1,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderColor: colors.grey22,
            borderTopColor: 'transparent',
            flexDirection: 'row',
          }}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>Total Amount</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 30}}>
            <View>
              <Text style={{...fonts.title2, color: 'white'}}>
                {selectedToken === 'main'
                  ? (parseFloat(sendValue) + totalGasFee).toString() +
                    ' ' +
                    currentNetworkSymbol
                  : sendValue +
                    ' ' +
                    selectedToken.tokenSymbol +
                    ' + ' +
                    totalGasFee +
                    ' ' +
                    currentNetworkSymbol}
              </Text>
            </View>
          </View>
        </View>
        {sendTxnError.length > 0 && (
          <Text
            style={{
              marginLeft: 40,
              marginTop: 12,
              ...fonts.caption_small12_16_regular,
              color: colors.red5,
            }}>
            {sendTxnError}
          </Text>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 80,
            marginHorizontal: 24,
          }}>
          <PrimaryButton
            onPress={() => {
              onSendTransaction();
            }}
            loading={sendTransactionLoading}
            text="Send"
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {status === 'default' && renderDefaultStatus()}
      {status === 'selected' && renderSelectedStatus()}
      {status === 'confirm' && renderConfirmStatus()}
    </>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  balancesInfo: state.balances.balancesInfo,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  feeData: state.engine.feeData,
  gettingFeeDataTimerId: state.engine.gettingFeeDataTimerId,
});
const mapDispatchToProps = dispatch => ({
  sendTransaction: (data, beforeWork, successCallback, failCallback) =>
    sendTransaction(dispatch, data, beforeWork, successCallback, failCallback),
  setCurrentAccountIndex: index => setCurrentAccountIndex(dispatch, index),
  getFeeData: currentNetworkRPC => getFeeData(dispatch, currentNetworkRPC),
  setGettingFeeDataTimerId: timerId =>
    setGettingFeeDataTimerId(dispatch, timerId),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendToken);
