import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Dimensions,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import {Avatar, Badge, ButtonGroup, Button} from 'react-native-elements';
import {colors, commonStyles, fonts} from '../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useColorModeValue} from 'native-base';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../components/Buttons';

import TokenItemRow from './TokenItemRow';
import CollectibleItemRow from './CollectibleItemRow';

const backImage = require('../../assets/images/mainscreen/backimage.png');
const avatar1Image = require('../../assets/avatars/avatar1.png');
const avatarBadgeSvgXml = require('./SVGData').avatarBadge;
const buyIconSvgXml = require('./SVGData').buyIcon;

const WalletTab = ({navigation}) => {
  const refRBNetworkSelectSheet = useRef(null);
  const [curTabIndex, setCurTabIndex] = useState(0);
  const [tabRoutes] = useState([
    {
      key: 'first',
      title: 'Token',
    },
    {
      key: 'second',
      title: 'Collectibles',
    },
  ]);

  useEffect(() => {
    return () => {};
  });

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
              width: '90%',
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
            <View>
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

  const renderHeader = () => {
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
        <View>
          <Avatar
            rounded
            source={avatar1Image}
            size={36}
            overlayContainerStyle={{backgroundColor: colors.grey22}}
          />
          <View style={{position: 'absolute', bottom: -8, right: -8}}>
            <SvgXml xml={avatarBadgeSvgXml} />
          </View>
        </View>
        <View
          style={{
            width: '90%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              refRBNetworkSelectSheet.current.open();
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{...fonts.caption_small12_16_regular, color: 'white'}}>
                Ethereum Main
              </Text>
              <FontAwesome
                style={{paddingLeft: 8, fontSize: 16, color: 'white'}}
                icon={SolidIcons.chevronDown}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
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
      </View>
    );
  };

  const renderNetworkBalance = () => {
    return (
      <View style={{marginLeft: 24, marginTop: 24}}>
        <View>
          <MaskedView
            maskElement={<Text style={{...fonts.big_type1}}>9.2363 ETH</Text>}>
            <LinearGradient colors={colors.gradient8}>
              <Text style={{...fonts.big_type1, opacity: 0}}>9.2363 ETH</Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={{marginTop: 24, flexDirection: 'row'}}>
          <View>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              $16,858.15
            </Text>
          </View>
          <View style={{marginLeft: 8}}>
            <Text style={{...fonts.para_regular, color: colors.green5}}>
              +0.7%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTransactionButtonGroup = () => {
    return (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 40,
        }}>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {}}
            text="Sent"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowUp}
              />
            }
          />
        </View>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {}}
            text="Receive"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowDown}
              />
            }
          />
        </View>
        <View>
          <SecondaryButton
            onPress={() => {}}
            text="Buy"
            icon={<SvgXml style={{marginRight: 16}} xml={buyIconSvgXml} />}
          />
        </View>
      </View>
    );
  };

  const renderTokenAndCollectiblesTab = () => {
    const TokenRoute = () => (
      <ScrollView style={{flex: 1}}>
        <TokenItemRow
          name="Binance Coin"
          balance={19.2371}
          unit="BNB"
          usdAmount={226.69}
          trend={2}
        />
        <TokenItemRow
          name="USD Coin"
          balance={92.3}
          unit="USDC"
          usdAmount={1}
          trend={4.3}
        />
        <TokenItemRow
          name="Synthetix"
          balance={42.74}
          unit="SNX"
          usdAmount={20.83}
          trend={-1.3}
        />
      </ScrollView>
    );

    const CollectibleRoute = () => (
      <View style={{flex: 1, backgroundColor: '#673ab7'}} />
    );

    const initialLayout = {
      width: Dimensions.get('window').width,
    };
    const renderScene = SceneMap({
      first: TokenRoute,
      second: CollectibleRoute,
    });

    const renderTabBar = props => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      return (
        <View style={{flexDirection: 'row'}}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            });
            const color =
              curTabIndex === i
                ? useColorModeValue('white', colors.grey12)
                : useColorModeValue(colors.grey12, colors.grey12);
            const borderColor =
              curTabIndex === i
                ? 'white'
                : useColorModeValue('coolGray.200', 'gray.400');
            return (
              <View
                key={'tabbar_' + i}
                style={{
                  marginHorizontal: 24,
                  borderBottomWidth: curTabIndex === i ? 3 : 0,
                  borderColor: 'white',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    setCurTabIndex(i);
                  }}>
                  <Animated.Text
                    style={{
                      color,
                    }}>
                    {route.title}
                  </Animated.Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      );
    };

    return (
      <TabView
        style={{marginTop: 40, marginHorizontal: 24, marginBottom: '30%'}}
        navigationState={{index: curTabIndex, routes: tabRoutes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setCurTabIndex}
        initialLayout={initialLayout}
      />
    );
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        {renderHeader()}
        <Image
          source={backImage}
          style={{position: 'absolute', right: '-15%', top: '10%'}}
        />
        {renderNetworkBalance()}
        {renderTransactionButtonGroup()}
        {renderTokenAndCollectiblesTab()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default WalletTab;
