import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import {fonts, colors} from '../../../../styles';
import Toast from 'react-native-toast-message';
import CustomToast from '../../../../components/CustomToast';
import QRCode from 'react-native-qrcode-svg';
import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../../components/Buttons';
import Clipboard from '@react-native-clipboard/clipboard';
import CanSendTokenList from '../../../../components/CanSendTokenList';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import RBSheet from 'react-native-raw-bottom-sheet';

const SendLink = ({token, onPressClose}) => {
  const [status, setStatus] = useState('check_amount');
  const [selectedToken, setSelectedToken] = useState(token);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const refRBQRCodeSheet = useRef(null);

  const onPressNext = () => {
    if (Number(amount) !== parseFloat(amount)) {
      setError('Invalid Amount');
      return;
    }
    setStatus('send_link');
  };

  const renderCheckAmount = () => {
    return (
      <>
        <View>
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
                }}
              />
            </View>
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
                  value={amount}
                  style={{...fonts.big_type1}}
                />
              }>
              <LinearGradient colors={colors.gradient8}>
                <TextInput
                  placeholder="0"
                  value={amount}
                  style={{...fonts.big_type1, opacity: 0}}
                  onChangeText={value => {
                    setAmount(value);
                    setError('');
                  }}
                />
              </LinearGradient>
            </MaskedView>
          </View>
          <View
            style={{
              marginTop: 24,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 100,
                  ...fonts.para_regular,
                  color: 'white',
                  backgroundColor: colors.grey22,
                }}>
                $ 55.99312
              </Text>
            </TouchableOpacity>
          </View>
          {error.length > 0 && (
            <Text
              style={{
                marginTop: 24,
                color: colors.red5,
                ...fonts.para_regular,
                textAlign: 'center',
              }}>
              {error}
            </Text>
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
            onPress={() => {
              onPressNext();
            }}
            text="Next"
            enableFlag={amount.length > 0}
          />
        </View>
      </>
    );
  };

  const renderSendLink = () => {
    const renderQRRBSheet = () => {
      return (
        <RBSheet
          height={500}
          ref={refRBQRCodeSheet}
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
          <Text
            style={{
              marginTop: 12,
              color: 'white',
              ...fonts.title2,
              textAlign: 'center',
            }}>
            Send Link
          </Text>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <QRCode
              value={
                'https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq'
              }
              size={200}
            />
          </View>
          <Text
            style={{
              marginTop: 24,
              textAlign: 'center',
              color: colors.grey9,
              ...fonts.para_regular,
            }}>
            Payment Request QR Code
          </Text>
        </RBSheet>
      );
    };

    return (
      <>
        {renderQRRBSheet()}
        <View
          style={{
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{alignItems: 'center'}}>
            <SvgXml xml={fonts.sendLinkIconSvgXml} />
            <Text style={{marginTop: 24, ...fonts.title1, color: 'white'}}>
              Send Link
            </Text>
            <Text
              style={{
                marginTop: 12,
                ...fonts.para_regular,
                color: colors.grey9,
                textAlign: 'center',
                marginHorizontal: '10%',
              }}>
              Your request link is already to send! Send this link to a friend,
              and it will ask them to send 0.0001 ETH
            </Text>
            <Text
              style={{
                marginTop: 40,
                ...fonts.para_regular_link,
                color: colors.blue5,
                textAlign: 'center',
                marginHorizontal: '5%',
              }}>
              https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            marginBottom: 80,
            marginHorizontal: 24,
          }}>
          <PrimaryButton
            onPress={() => {}}
            text="Send Link"
            enableFlag={amount.length > 0}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginBottom: 40,
            }}>
            <TextButton
              text="Copy Link"
              onPress={() => {
                Clipboard.setString(
                  'https://dege.app.link/send/0xBBB6A12945aC14C84185a17C6BD2eAe96e/value=21jq',
                );
                Toast.show({
                  type: 'copy',
                  text1: 'Link copied to clipboard',
                  props: {
                    color: colors.blue5,
                  },
                  position: 'top',
                  topOffset: 160,
                });
              }}
            />
            <TextButton
              text="QR Code"
              onPress={() => {
                refRBQRCodeSheet.current.open();
              }}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{height: '100%', flexDirection: 'column'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{marginLeft: 12}}>
          <FontAwesome
            onPress={() => {
              onPressClose();
            }}
            style={{fontSize: 16, color: 'white', marginRight: 16}}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
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
      {status === 'check_amount' && renderCheckAmount()}
      {status === 'send_link' && renderSendLink()}
      <CustomToast />
    </View>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  balancesInfo: state.balances.balancesInfo,
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  gasPrice: state.networks.gasPrice,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SendLink);
