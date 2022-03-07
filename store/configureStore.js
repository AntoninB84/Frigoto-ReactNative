// Store/configureStore.js

import { createStore } from 'redux'
import setApiToken from './reducers/userReducer'
import { persistCombineReducers } from 'redux-persist'
import {AsyncStorage } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

export default createStore(persistCombineReducers(persistConfig, {setApiToken}))
