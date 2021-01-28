import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers/index';
import Main from './src/Main';

const store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
