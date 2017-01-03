import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import reducers from './reducers';

const middleware = [thunkMiddleware];

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {},
  applyMiddleware(...middleware)
);
