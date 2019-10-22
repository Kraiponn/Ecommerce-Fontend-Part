import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ReactDOM from 'react-dom';
import App from './App';

import configStore from './store/store';

const { store, persistor } = configStore();
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  app, 
  document.getElementById('root')
);
