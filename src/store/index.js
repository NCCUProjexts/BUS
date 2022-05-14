import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import auth from './auth';
import error from './error';
import course from "./course";
import courseDetail from "./courseDetail";
import courseRate from "./courseRate";

const App = combineReducers({
  auth,
  error,
  course,
  courseDetail,
  courseRate,
})

const store = configureStore({
  reducer: App,
  // Note that this will replace all default middleware
  middleware: [thunkMiddleware],
})

export default store