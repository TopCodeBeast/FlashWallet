import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../components/Buttons';

import {FloatingLabelInput} from 'react-native-floating-label-input';
import FloatLabelInput from '../../../components/FloatLabelInput';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const avatar1Image = require('../../../assets/avatars/avatar1.png');
const avatar2Image = require('../../../assets/avatars/avatar2.png');
const avatar3Image = require('../../../assets/avatars/avatar3.png');
const avatarBadgeSvgXml = require('../SVGData').avatarBadge;

const Header = () => {
  const refRBNetworkSelectSheet = useRef(null);
  const refRBAccountSelectSheet = useRef(null);
  const [accountStatus, setAccountStatus] = useState('default');
  const [accountName, setAccountName] = useState('');
  const [importedPrivateKey, setImportedPrivateKey] = useState('');

  const renderNetworkRow = (networkName, networkColor, isSelected) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          refRBNetworkSelectSheet.current.close();
        }}>
        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 8,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: networkColor,
                marginRight: 16,
              }}></View>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              {networkName}
            </Text>
          </View>
          {isSelected && (
            <View style={{flexDirection: 'row-reverse', flex: 1}}>
              <FontAwesome
                style={{fontSize: 24, color: colors.green5}}
                icon={RegularIcons.checkCircle}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderAccountRow = (
    accountName,
    accountBalance,
    accountIcon,
    isSelected,
  ) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          refRBAccountSelectSheet.current.close();
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            marginHorizontal: 16,
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
                  {accountBalance + ' ETH'}
                </Text>
              </View>
            </View>
          </View>
          {isSelected && (
            <View style={{flexDirection: 'row-reverse', flex: 1}}>
              <FontAwesome
                style={{fontSize: 24, color: colors.green5}}
                icon={RegularIcons.checkCircle}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderNetworkRBSheet = () => {
    return (
      <RBSheet
        height={480}
        ref={refRBNetworkSelectSheet}
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
        <View>
          <View style={{paddingTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Network
            </Text>
          </View>
          <View style={{paddingTop: 24, paddingHorizontal: 24}}>
            {renderNetworkRow('Ethereum Main', colors.primary5, true)}
          </View>

          <View style={{paddingTop: 24, paddingHorizontal: 24}}>
            <Text style={{...fonts.title2, color: colors.grey9}}>
              Other Network
            </Text>
            <View style={{marginTop: 16}}>
              {renderNetworkRow('Ropsten Test', colors.red5, false)}
              {renderNetworkRow('Kovan Test', colors.turquoise5, false)}
              {renderNetworkRow('Goerli Test', colors.blue5, false)}
            </View>
          </View>
          <View style={{paddingTop: 40}}>
            <TextButton
              onPress={() => {
                refRBNetworkSelectSheet.current.close();
              }}
              text="Close"
            />
          </View>
        </View>
      </RBSheet>
    );
  };

  const renderAccountRBSheet = () => {
    const renderDefaultAccountRBSheet = () => {
      return (
        <View>
          <View style={{paddingTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Account
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            {renderAccountRow(
              'Account1',
              9.2362,
              <Avatar rounded source={avatar1Image} size={24} />,
              true,
            )}
            {renderAccountRow(
              'Account2',
              2.43,
              <Avatar rounded source={avatar2Image} size={24} />,
              false,
            )}
            {renderAccountRow(
              'Account3',
              1.27,
              <Avatar rounded source={avatar3Image} size={24} />,
              false,
            )}
          </View>
          <View style={{marginTop: 24}}>
            <TextButton
              text="Create New Account"
              onPress={() => {
                setAccountStatus('create_account');
              }}
            />
          </View>
          <View style={{marginTop: 24}}>
            <TextButton
              text="Import Account"
              onPress={() => {
                setAccountStatus('import_account');
              }}
            />
          </View>
        </View>
      );
    };

    const renderCreateAccountRBSheet = () => {
      return (
        <View>
          <View
            style={{
              paddingTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{flex: 1, marginLeft: 16}}
              onPress={() => {
                setAccountStatus('default');
              }}>
              <FontAwesome
                style={{fontSize: 16, color: 'white'}}
                icon={SolidIcons.chevronLeft}
              />
            </TouchableOpacity>
            <View style={{width: '95%'}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                Create Account
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 24,
              paddingTop: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.grey23,
              }}>
              <Image
                source={backImage}
                width={24}
                height={24}
                style={{
                  position: 'relative',
                  left: 0,
                  top: 0,
                  width: 24,
                  height: 24,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 24, marginHorizontal: '25%'}}>
            <SecondaryButton onPress={() => {}} text="Choose an icon" />
          </View>
          <View style={{marginTop: 40, marginHorizontal: 32}}>
            <FloatLabelInput
              label={'Account Name'}
              value={accountName}
              onChangeText={value => {
                setAccountName(value);
              }}
            />
          </View>
          <View style={{marginTop: 48, marginHorizontal: 24}}>
            <PrimaryButton
              onPress={() => {}}
              enableFlag={accountName.length > 0}
              text="Create"
            />
          </View>
        </View>
      );
    };

    const renderImportAccountRBSheet = () => {
      return (
        <View>
          <View
            style={{
              paddingTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{flex: 1, marginLeft: 16}}
              onPress={() => {
                setAccountStatus('default');
              }}>
              <FontAwesome
                style={{fontSize: 16, color: 'white'}}
                icon={SolidIcons.chevronLeft}
              />
            </TouchableOpacity>
            <View style={{width: '95%'}}>
              <Text
                style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
                Import Account
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 24,
              paddingTop: 16,
              marginHorizontal: 24,
            }}>
            <Text style={{...fonts.caption_large_regular, color: 'white'}}>
              Imported accounts are viewable in your wallet but are not
              recoverable with your DeGe seed phrase.
            </Text>
          </View>
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 24,
            }}>
            <Text style={{...fonts.caption_large_regular, color: 'white'}}>
              Learn more about imported accounts{' '}
              <Text
                style={{
                  color: colors.blue5,
                  ...fonts.caption_large_semibold,
                }}>
                here
              </Text>
              .
            </Text>
          </View>
          <View style={{marginTop: 24, marginHorizontal: 24}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Paste your private key string
            </Text>
          </View>
          <View style={{marginTop: 16, marginHorizontal: 24}}>
            <TextInput
              onChangeText={value => {
                setImportedPrivateKey(value);
              }}
              value={importedPrivateKey}
              placeholder="e.g
              4395a2a6349e069ab44043f01d77cf7b91822b1841e333128d98f7878495bf53"
              placeholderTextColor={colors.grey12}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.grey12,
                padding: 16,
                height: 100,
                color: 'white',
              }}
              scrollEnabled={true}
              numberOfLines={2}
              multiline
            />
          </View>
          <View style={{marginTop: 40}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View>
                <TextButton text={'Scan a QR Code'} />
              </View>
              <View>
                <PrimaryButton
                  text={'Import Account'}
                  enableFlag={importedPrivateKey.length > 0}
                />
              </View>
            </View>
          </View>
        </View>
      );
    };

    return (
      <RBSheet
        height={500}
        ref={refRBAccountSelectSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        onClose={() => {
          setAccountStatus('default');
        }}
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
        {accountStatus === 'default' && renderDefaultAccountRBSheet()}
        {accountStatus === 'create_account' && renderCreateAccountRBSheet()}
        {accountStatus === 'import_account' && renderImportAccountRBSheet()}
      </RBSheet>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.grey24,
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{height: 44, width: 44}}
        onPress={() => {
          refRBAccountSelectSheet.current.open();
        }}>
        <View style={{height: 36, width: 36}}>
          <Avatar
            rounded
            source={avatar1Image}
            size={36}
            overlayContainerStyle={{backgroundColor: colors.grey22}}
          />
          <Badge
            containerStyle={{position: 'absolute', bottom: -8, right: -8}}
            Component={() => <SvgXml xml={avatarBadgeSvgXml} />}
          />
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '90%',
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBNetworkSelectSheet.current.open();
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{...fonts.caption_small12_16_regular, color: 'white'}}>
              Ethereum Main
            </Text>
            <FontAwesome
              style={{paddingLeft: 8, fontSize: 16, color: 'white'}}
              icon={SolidIcons.chevronDown}
            />
          </View>
        </TouchableOpacity>
      </View>
      {renderNetworkRBSheet()}
      {renderAccountRBSheet()}
    </View>
  );
};

export default Header;
