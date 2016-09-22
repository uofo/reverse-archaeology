import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const middleware = [thunkMiddleware];

export const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(...middleware)
);
