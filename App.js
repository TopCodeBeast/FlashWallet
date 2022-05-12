import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';

import { store, persistor } from './src/redux/store';
import { MenuProvider } from 'react-native-popup-menu';
import AppView from './src/AppViewContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
      <Provider store={store}>
        <NavigationContainer>
          <PersistGate
            loading={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <View style={styles.container}>
                <ActivityIndicator color={colors.red} />
              </View>
            }
            persistor={persistor}
          >
            <AppView />
          </PersistGate>
        </NavigationContainer>
      </Provider>
      </MenuProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
