import { polyfill } from 'es6-promise';
polyfill();

import fetch from 'isomorphic-fetch';

import config from '../config';

export const ARTIFACTS_DATA_REQUEST = 'ARTIFACTS_DATA_REQUEST';
export const ARTIFACTS_DATA_RESPONSE = 'ARTIFACTS_DATA_RESPONSE';
export const ARTIFACTS_DATA_ERROR_RESPONSE = 'ARTIFACTS_DATA_ERROR_RESPONSE';

export const PAGES_DATA_REQUEST = 'PAGES_DATA_REQUEST';
export const PAGES_DATA_RESPONSE = 'PAGES_DATA_RESPONSE';
export const PAGES_DATA_ERROR_RESPONSE = 'PAGES_DATA_ERROR_RESPONSE';

export function requestArtifactsData () {
  return {
    type: ARTIFACTS_DATA_REQUEST
  };
}

export function receiveArtifactsData (json) {
  return {
    type: ARTIFACTS_DATA_RESPONSE,
    items: json
  };
}

export function receiveArtifactsDataError (error) {
  return {
    type: ARTIFACTS_DATA_ERROR_RESPONSE,
    error
  };
}

export function fetchArtifactsData () {
  return (dispatch => {
    dispatch(requestArtifactsData());
    return fetch(config.dataUrls.artifacts)
      .then(response => response.json())
      .then(json => dispatch(receiveArtifactsData(json)))
      .catch(error => dispatch(receiveArtifactsDataError(error)));
  });
}

export function requestPagesData () {
  return {
    type: PAGES_DATA_REQUEST
  };
}

export function receivePagesData (json) {
  return {
    type: PAGES_DATA_RESPONSE,
    items: json
  };
}

export function receivePagesDataError (error) {
  return {
    type: PAGES_DATA_ERROR_RESPONSE,
    error
  };
}

export function fetchPagesData () {
  return (dispatch => {
    dispatch(requestPagesData());
    return fetch(config.dataUrls.pages)
      .then(response => response.json())
      .then(json => dispatch(receivePagesData(json)))
      .catch(error => dispatch(receivePagesDataError(error)));
  });
}
