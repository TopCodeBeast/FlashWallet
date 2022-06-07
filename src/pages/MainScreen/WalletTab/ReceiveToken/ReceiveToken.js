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
import QRCode from 'react-native-qrcode-svg';
import {PrimaryButton, SecondaryButton} from '../../../../components/Buttons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import SendLink from './SendLink';
import CustomToast from '../../../../components/CustomToast';
import {toastConfig} from '../../../../components/utils/CustomToastConfig';

const ReceiveToken = ({token, accounts, currentAccountIndex}) => {
  const refRBCheckAmountSheet = useRef(null);
  const toastRef = useRef(null);

  const currentAccount = accounts[currentAccountIndex];

  const renderCheckAmount = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 150}
        ref={refRBCheckAmountSheet}
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
        <SendLink
          token={token}
          onPressClose={() => {
            refRBCheckAmountSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  return (
    <>
      <View>
        {renderCheckAmount()}
        <View style={{height: '100%'}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Receive
            </Text>
          </View>
          <View
            style={{
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <QRCode value={currentAccount.address} size={200} />
          </View>
          <Text
            style={{
              marginTop: 24,
              color: colors.grey9,
              ...fonts.para_regular,
              textAlign: 'center',
            }}>
            Scan address to Receive payment
          </Text>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SecondaryButton
              onPress={() => {
                Clipboard.setString(currentAccount.address);
                if (toastRef)
                  toastRef.current.show({
                    type: 'copy',
                    position: 'bottom',
                    text1: 'Copied on the clipboard',
                    bottomOffset: 115,
                    props: {
                      color: colors.green5,
                    },
                  });
              }}
              text={
                currentAccount.address.slice(0, 6) +
                '...' +
                currentAccount.address.slice(-4)
              }
              icon2={
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5, marginLeft: 16}}
                  icon={RegularIcons.copy}
                />
              }
            />
            <SecondaryButton
              style={{marginLeft: 12}}
              text=""
              icon={
                <FontAwesome
                  style={{fontSize: 16, color: colors.green5}}
                  icon={SolidIcons.shareAlt}
                />
              }
            />
          </View>
          <View style={{marginTop: 70, marginHorizontal: 24}}>
            <PrimaryButton
              text="Request Payment"
              onPress={() => {
                refRBCheckAmountSheet.current.open();
              }}
            />
          </View>
        </View>
      </View>
      <Toast ref={toastRef} config={toastConfig({hasRef: true, toastRef})} />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveToken);
