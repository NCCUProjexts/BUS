import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import auth from './auth';
import bus from "./bus"
import error from './error';

const App = combineReducers({
  auth,
  bus,
  error,
})

const store = configureStore({
  reducer: App,
  // Note that this will replace all default middleware
  middleware: [thunkMiddleware],
})

export default store