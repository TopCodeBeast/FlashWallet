import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import WalletTab from './WalletTab/WalletTab';
import SettingsTab from './SettingsTab/SettingsTab';

const MainScreen = ({navigation, currentNetwork}) => {
  useEffect(() => {}, [currentNetwork]);

  const tabBar = ({state, descriptors, navigation}) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 40}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

          const icon =
            label === 'Wallet' ? (
              <FontAwesome
                style={{
                  fontSize: 24,
                  color: isFocused ? colors.green5 : colors.grey9,
                }}
                icon={SolidIcons.wallet}
              />
            ) : label === 'Swap' ? (
              <FontAwesome
                style={{
                  fontSize: 24,
                  color: isFocused ? colors.green5 : colors.grey9,
                }}
                icon={SolidIcons.exchangeAlt}
              />
            ) : (
              <FontAwesome
                style={{
                  fontSize: 24,
                  color: isFocused ? colors.green5 : colors.grey9,
                }}
                icon={SolidIcons.cog}
              />
            );

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={Math.random()}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                {icon}
                <Text
                  style={{
                    color: isFocused ? colors.green5 : colors.grey5,
                    ...fonts.para_semibold,
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
        <Tab.Navigator
          backBehavior={() => {
            navigation.goBack();
          }}
          tabBar={tabBar}>
          <Tab.Screen
            name="Wallet"
            component={WalletTab}
            options={{
              tabBarLabel: 'Wallet',
            }}
          />
          <Tab.Screen name="Swap" component={WalletTab} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  currentNetwork: state.networks.currentNetwork,
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
