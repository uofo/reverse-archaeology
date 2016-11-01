import { combineReducers } from 'redux';

import * as actions from './actions';
import { cleanArtifacts } from '../models/artifacts';

export default {
  artifacts: combineReducers({

    data (state = { isFetching: false, items: [] }, action) {
      switch (action.type) {
        case actions.SITE_DATA_REQUEST:
          return Object.assign({}, state, {
            isFetching: true,
            error: null
          });
        case actions.SITE_DATA_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            items: cleanArtifacts(action.data.artifacts),
            error: null
          });
        case actions.SITE_DATA_ERROR_RESPONSE:
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
        case actions.SITE_DATA_REQUEST:
          return Object.assign({}, state, {
            isFetching: true,
            error: null
          });
        case actions.SITE_DATA_RESPONSE:
          return Object.assign({}, state, {
            isFetching: false,
            items: action.data.pages,
            error: null
          });
        case actions.SITE_DATA_ERROR_RESPONSE:
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
