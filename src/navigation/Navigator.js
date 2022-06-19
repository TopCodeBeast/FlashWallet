import * as React from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {Text} from 'galio-framework';

import {colors, commonStyles, fonts} from '../styles';

import SplashScreen from '../pages/SplashScreen';
import ThroughScreen from '../pages/ThroughScreen';
import ImportWalletScreen from '../pages/ImportWallet/ImportWalletScreen';
import CreateWalletScreen from '../pages/CreateWallet/CreateWalletScreen';
import MainScreen from '../pages/MainScreen/MainScreen';

import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import LogIn from '../pages/LogIn';
import TokenShow from '../pages/MainScreen/WalletTab/TokenShow/TokenShow';

const ImportWalletHeader = ({navigation}) => {
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
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome
            style={{fontSize: 16, color: 'white'}}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
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
          name="login"
          component={LogIn}
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
          name="createwallet"
          component={CreateWalletScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="mainscreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="tokenshow"
          component={TokenShow}
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
