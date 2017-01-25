import { combineReducers } from 'redux';

import * as actions from './actions';
import { cleanArtifacts } from '../models/artifacts';

export default {
  menuOpen: (state=false, action) => {
    if (action.type === actions.MENU_VISIBILITY) {
      return action.value;
    }
    return state;
  },

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

  bios: (state = [], action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.bios;
      default:
        return state;
    }
  },

  blurbs: (state = [], action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.blurbs;
      default:
        return state;
    }
  },

  chasmpolicies: (state = [], action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.chasmpolicies;
      default:
        return state;
    }
  },

  funders: (state = [], action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.funders;
      default:
        return state;
    }
  },

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

  slideshowimages: (state = [], action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.slideshowimages;
      default:
        return state;
    }
  },

  themes: (state = {}, action) => {
    switch (action.type) {
      case actions.SITE_DATA_RESPONSE:
        return action.data.themes;
      default:
        return state;
    }
  }
};
