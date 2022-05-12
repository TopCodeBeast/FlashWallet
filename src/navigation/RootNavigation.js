import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import StackNavigationData from './stackNavigationData';
import { colors } from '../styles';
import { hostname } from '../constant';

const Stack = createStackNavigator();

export default function NavigatorView(props) {

  const currentUser = global.user;
  const {navigation, route} = props;

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Image
          source={require('../assets/images/menu.png')}
          resizeMode="contain"
          style={{
            height: 20,
          }}
          tintColor={colors.white}
        />
      </TouchableOpacity>
    )
  }

  // const headerRightComponentMenu = () => {
  //   return (
  //     <Avatar
  //       avatar_path={currentUser.avatar_path == null ? hostname + '/images/avatar.png' : hostname + currentUser.avatar_path}
  //       navigation={navigation}
  //       route={route}
  //     />
  //   )
  // }

  return (
    <Stack.Navigator>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            // headerRight: headerRightComponentMenu,
            headerBackground: () => (
              <View style={styles.header}/>
            ),
            headerTitleStyle: item.headerTitleStyle,
            title: item.title
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
  header:{
    backgroundColor:colors.header,
    width: 100 + '%',
    height: 100 + '%',
  }
});
