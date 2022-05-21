import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions, Pressable, Animated, ScrollView} from 'react-native';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useColorModeValue} from 'native-base';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {TextButton} from '../../../components/Buttons';

import TokenItemRow from './TokenItemRow';
import CollectibleItemRow from './CollectibleItemRow';

const TokenAndCollectiblesTab = ({navigation, tokenPressed}) => {
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

  const TokenRoute = () => (
    <View style={{flex: 1}}>
      <ScrollView>
        <TokenItemRow
          onPress={() => {
            tokenPressed('BNB');
          }}
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
      <View style={{marginTop: 24}}>
        <TextButton
          text="Add Tokens"
          icon={
            <FontAwesome
              style={{fontSize: 24, color: colors.green5, marginRight: 12}}
              icon={SolidIcons.plus}
            />
          }
        />
      </View>
    </View>
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
      style={{marginTop: 40, marginHorizontal: 24, marginBottom: '20%'}}
      navigationState={{index: curTabIndex, routes: tabRoutes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setCurTabIndex}
      initialLayout={initialLayout}
    />
  );
};

export default TokenAndCollectiblesTab;
