import * as React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Pressable} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {Block, Icon, Text} from 'galio-framework';

import {colors, commonStyles} from '../styles';

import SplashScreen from '../pages/SplashScreen';
import ThroughScreen from '../pages/ThroughScreen';
import ImportWalletScreen from '../pages/ImportWallet/ImportWalletScreen';

import SignInScreen from '../pages/SignInScreen';
import HomeScreen from '../pages/HomeScreen';
import CharterPricingScreen from '../pages/CharterPricingScreen';
import CharterJoinScreen from '../pages/CharterJoinScreen';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import {Rowing} from '@material-ui/icons';

const drawerData = [
  {
    name: 'General',
    icon: 'tool',
  },
];

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {zcard} = props;

  return (
    <DrawerContentScrollView {...props} style={{padding: 0}}>
      <DrawerItem
        key={`drawer_item-0`}
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Icon
              name="setting"
              family="AntDesign"
              color={colors.primary}
              size={20}
            />
            <Text style={[styles.menuTitle, {color: colors.primary}]}>
              Template Settings
            </Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('TemplateSettings')}
      />
      <DrawerItem
        key={`drawer_item-1`}
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Icon
              name="creditcard"
              family="AntDesign"
              color={colors.primary}
              size={20}
            />
            <Text style={[styles.menuTitle, {color: colors.primary}]}>
              Card Settings
            </Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('CardSettings')}
      />
      {zcard != null && zcard.enable_icon_banner == 1 && (
        <DrawerItem
          key={`drawer_item-2`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Icon
                name="isv"
                family="AntDesign"
                color={colors.primary}
                size={20}
              />
              <Text style={[styles.menuTitle, {color: colors.primary}]}>
                Custom URLS & Icons
              </Text>
            </View>
          )}
          onPress={() => props.navigation.navigate('CustomURLS')}
        />
      )}
      <DrawerItem
        key={`drawer_item-3`}
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Icon
              name="picture"
              family="AntDesign"
              color={colors.primary}
              size={20}
            />
            <Text style={[styles.menuTitle, {color: colors.primary}]}>
              Main Images & Photos
            </Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('MainImages')}
      />
      {zcard != null &&
        zcard.product_type == 3 &&
        zcard.enable_notifications != 0 && (
          <DrawerItem
            key={`drawer_item-4`}
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Icon
                  name="notification"
                  family="AntDesign"
                  color={colors.primary}
                  size={20}
                />
                <Text style={[styles.menuTitle, {color: colors.primary}]}>
                  {zcard.newsletter_section_text == null
                    ? 'Push notifications'
                    : zcard.newsletter_section_text}
                </Text>
              </View>
            )}
            onPress={() => props.navigation.navigate('Newsletter')}
          />
        )}
      <DrawerItem
        key={`drawer_item-4`}
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Icon
              name="sort"
              family="Font-Awesome"
              color={colors.primary}
              size={20}
            />
            <Text style={[styles.menuTitle, {color: colors.primary}]}>
              Edit Section
            </Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('SectionEdit')}
      />
      {/* {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Icon name={item.icon} family="AntDesign" color={colors.primary} size={20} />
              <Text style={[styles.menuTitle, { color: colors.primary }]}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))} */}
    </DrawerContentScrollView>
  );
};

const EditCardStack = props => {
  let zcard = props.route.params.zcard;
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colors.backgroundLight,
      }}
      drawerContent={props => <CustomDrawerContent {...props} zcard={zcard} />}>
      <Drawer.Screen name="EditCard" component={NavigatorView} />
    </Drawer.Navigator>
  );
};

const ImportWalletHeader = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey24,
        paddingTop: 44,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{width: 20}}>
          <FontAwesome
            style={{fontSize: 16, color: 'white'}}
            icon={SolidIcons.chevronLeft}
          />
        </Pressable>
      </View>
      <View
        style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
        <Text style={commonStyles.headerText}>Import from Seed</Text>
      </View>
    </View>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="through"
          component={ThroughScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="importwallet"
          component={ImportWalletScreen}
          options={{
            header: ImportWalletHeader,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CharterPricing"
          component={CharterPricingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CharterJoin"
          component={CharterJoinScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditCard"
          component={EditCardStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    fontSize: 18,
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
  },
  divider: {
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
});
