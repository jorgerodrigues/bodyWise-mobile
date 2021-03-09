import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers/index';
import Main from './src/Main';
import Reactotron from './src/config/ReactToTronConfig';
import {
  useFonts,
  Oxygen_400Regular,
  Oxygen_700Bold,
  Oxygen_300Light,
} from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';

if (__DEV__) {
  import('./src/config/ReactToTronConfig');
}

const store = createStore(allReducers, Reactotron.createEnhancer());

export default function App() {
  const [loadedFont] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
    Oxygen_300Light,
    Nobile_700Bold,
  });

  if (!loadedFont) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {!loadedFont ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <Main />
      )}
    </Provider>
  );
}
