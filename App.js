import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers/index';
import Main from './src/Main';

const Stack = createStackNavigator();
const store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
