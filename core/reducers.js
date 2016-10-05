import { combineReducers } from 'redux';
import * as actions from './actions';

export default {
  artifacts: combineReducers({

    data (state = { isFetching: false, items: [] }, action) {
      switch (action.type) {
        case actions.ARTIFACTS_DATA_REQUEST:
          return Object.assign({}, state, {
            isFetching: true,
            error: null
          });
        case actions.ARTIFACTS_DATA_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            items: action.items,
            error: null
          });
        case actions.ARTIFACTS_DATA_ERROR_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            error: action.error
          });
        default:
          return state;
      }
    }

  }),

  pages: combineReducers({

    data (state = { isFetching: false, items: [] }, action) {
      switch (action.type) {
        case actions.PAGES_DATA_REQUEST:
          return Object.assign({}, state, {
            isFetching: true,
            error: null
          });
        case actions.PAGES_DATA_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            items: action.items,
            error: null
          });
        case actions.PAGES_DATA_ERROR_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            error: action.error
          });
        default:
          return state;
      }
    }
  }),
};
