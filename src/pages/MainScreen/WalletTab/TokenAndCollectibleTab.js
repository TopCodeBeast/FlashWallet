import React, {useEffect, useState, useMemo, createRef, useRef} from 'react';
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
import {
  getTokensList,
  setSelectedToken,
} from '../../../redux/actions/TokensActions';
import TokenAdd from './TokenAdd/TokenAdd';
import RBSheet from 'react-native-raw-bottom-sheet';

const screenHeight = Dimensions.get('screen').height;

const TokenAndCollectiblesTab = ({
  navigation,
  tokenPressed,
  networks,
  currentNetwork,
  balances,
  accounts,
  currentAccountIndex,
  getTokensList,
  tokens,
  setSelectedToken,
}) => {
  const [curTabIndex, setCurTabIndex] = useState(0);

  const refRBTokenAddSheet = useRef(null);

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

  const renderTokenAdd = () => {
    return (
      <RBSheet
        height={screenHeight - 100}
        ref={refRBTokenAddSheet}
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
        <TokenAdd
          onCancel={() => {
            refRBTokenAddSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  const TokenRoute = () => {
    const tokensList = tokens[currentNetwork]
      ? tokens[currentNetwork][currentAccountIndex]
        ? tokens[currentNetwork][currentAccountIndex].tokensList
        : []
      : [];
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TokenItemRow
            token={'main'}
            onPress={() => {
              setSelectedToken('main');
              navigation.navigate('tokenshow');
            }}
          />
          {tokensList.map(token => {
            return (
              <TokenItemRow
                token={token}
                onPress={() => {
                  setSelectedToken(token);
                  navigation.navigate('tokenshow');
                }}
                key={'tokenRoute_' + token.tokenAddress}
              />
            );
          })}
        </ScrollView>
        <View style={{marginTop: 24}}>
          <TextButton
            text="Add Tokens"
            onPress={() => {
              refRBTokenAddSheet.current.open();
            }}
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
  };

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
              key={'tokenandcollectibletabbar_' + i}
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
    <>
      {renderTokenAdd()}
      <TabView
        style={{marginTop: 40, marginHorizontal: 24, marginBottom: '20%'}}
        navigationState={{index: curTabIndex, routes: tabRoutes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setCurTabIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

const mapStateToProps = state => ({
  networks: state.networks.networks,
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
  balances: state.balances,
  tokens: state.tokens.tokensData,
});
const mapDispatchToProps = dispatch => ({
  getTokensList: (currentNetwork, currentAccountIndex, successCallback) =>
    getTokensList(
      dispatch,
      currentNetwork,
      currentAccountIndex,
      successCallback,
    ),
  setSelectedToken: token => setSelectedToken(dispatch, token),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenAndCollectiblesTab);
