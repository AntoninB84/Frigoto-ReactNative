import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistStore} from 'redux-persist'
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigation from './navigation/Navigation'

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let persistor = persistStore(Store)

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
};

export default App;
