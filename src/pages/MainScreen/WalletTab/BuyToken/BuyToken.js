import React, {useRef} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SvgXml} from 'react-native-svg';
import {SecondaryButton} from '../../../../components/Buttons';
import {colors, fonts} from '../../../../styles';

const BuyToken = ({onPressClose}) => {
  const refRBWyreSheet = useRef(null);

  const renderWyreRBSheet = () => {
    return (
      <RBSheet
        height={400}
        ref={refRBWyreSheet}
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
        <View style={{height: '100%'}}>
          <Text
            style={{
              marginTop: 16,
              ...fonts.title2,
              color: 'white',
              textAlign: 'center',
            }}>
            Wyre Support
          </Text>
          <View style={{marginTop: 40, marginHorizontal: 16}}>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              Paying with Apple pay, powered by Wyre is support in the United
              States except for CT, HI, NC, NH, NY, VA and VT.
            </Text>
            <Text
              style={{
                marginTop: 12,
                ...fonts.para_regular,
                color: colors.blue5,
              }}>
              wyre terms of service apply
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column-reverse',
              marginBottom: 80,
              marginHorizontal: 24,
            }}>
            <SecondaryButton
              text="Close"
              onPress={() => {
                refRBWyreSheet.current.close();
              }}
            />
          </View>
        </View>
      </RBSheet>
    );
  };

  return (
    <View style={{marginHorizontal: 24}}>
      {renderWyreRBSheet()}
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
            Purchase Method
          </Text>
        </View>

        <FontAwesome
          onPress={onPressClose}
          style={{fontSize: 16, color: 'white'}}
          icon={SolidIcons.times}
        />
      </View>
      <View style={{marginTop: 40}}>
        <Text style={{...fonts.title1, color: 'white', textAlign: 'center'}}>
          How do you want to make your purchase?
        </Text>
      </View>
      <View style={{marginTop: 60}}>
        <View
          style={{
            paddingBottom: 40,
            marginBottom: 40,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey9,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.title2, color: 'white'}}>Apple Pay</Text>
            <Text
              style={{
                marginLeft: 12,
                ...fonts.para_regular,
                color: colors.grey9,
              }}>
              via
            </Text>
            <TouchableOpacity
              onPress={() => {
                refRBWyreSheet.current.open();
              }}>
              <SvgXml xml={fonts.wyreIconSvgXml} style={{marginLeft: 12}} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              1-2 minutes
            </Text>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{...fonts.para_regular, color: colors.grey9}}>
                Max $ 450 weekly
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Text style={{...fonts.para_regular, color: colors.grey9}}>
                  U.S. Only
                </Text>
                <FontAwesome
                  style={{color: colors.blue5, fontSize: 18, marginRight: 12}}
                  icon={SolidIcons.infoCircle}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{...fonts.para_regular, color: colors.grey9}}>
                Requires debit card
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Text style={{...fonts.para_regular, color: colors.grey9}}>
                  Some States excluded
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingBottom: 40,
            borderBottomColor: colors.grey9,
            borderBottomWidth: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Bank Transfer or {'\n'}Debit Card
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              requires registration
            </Text>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{...fonts.para_regular, color: colors.grey9}}>
                Option and fees vary {'\n'}based on location
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Text style={{...fonts.para_regular, color: colors.grey9}}>
                  59 Countries
                </Text>
                <FontAwesome
                  style={{color: colors.blue5, fontSize: 18, marginRight: 12}}
                  icon={SolidIcons.infoCircle}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BuyToken;
