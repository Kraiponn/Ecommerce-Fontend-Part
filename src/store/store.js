import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/auth';
import categoryReducer from './reducers/category';
import productReducer from './reducers/product';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['category', 'product']
}

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);
  return {
    store, persistor
  }
}