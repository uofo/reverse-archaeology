import { polyfill } from 'es6-promise';
polyfill();

import fetch from 'isomorphic-fetch';

import config from '../config';

export const SITE_DATA_REQUEST = 'SITE_DATA_REQUEST';
export const SITE_DATA_RESPONSE = 'SITE_DATA_RESPONSE';
export const SITE_DATA_ERROR_RESPONSE = 'SITE_DATA_ERROR_RESPONSE';


export function requestSiteData () {
  return {
    type: SITE_DATA_REQUEST
  };
}

export function receiveSiteData (json) {
  return {
    type: SITE_DATA_RESPONSE,
    data: json
  };
}

export function receiveSiteDataError (error) {
  return {
    type: SITE_DATA_ERROR_RESPONSE,
    error
  };
}

export function fetchSiteData () {
  return (dispatch => {
    dispatch(requestSiteData());
    return fetch(config.dataUrls.data)
      .then(response => response.json())
      .then(json => dispatch(receiveSiteData(json)))
      .catch(error => dispatch(receiveSiteDataError(error)));
  });
}
