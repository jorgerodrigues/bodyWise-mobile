import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers/index';
import Main from './src/Main';
import {
  useFonts,
  Oxygen_400Regular,
  Oxygen_700Bold,
  Oxygen_300Light,
} from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import { theme } from './src/Design/Theme';
import { themeIsLoaded } from './src/actions';

import reactotron from './src/config/ReactToTronConfig';

export const store = createStore(allReducers, reactotron.createEnhancer());

export default function App() {
  // theme loading to the state
  useEffect(() => {
    store.dispatch(themeIsLoaded(theme));
  }, []);

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
