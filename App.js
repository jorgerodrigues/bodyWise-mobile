import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers/index';
import Main from './src/Main';
import Reactotron from './src/config/ReactToTronConfig';

if (__DEV__) {
  import('./src/config/ReactToTronConfig');
}

const store = createStore(allReducers, Reactotron.createEnhancer());

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
