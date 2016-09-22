import { polyfill } from 'es6-promise';
polyfill();

import fetch from 'isomorphic-fetch';

export const ARTIFACTS_DATA_REQUEST = 'ARTIFACTS_DATA_REQUEST';
export const ARTIFACTS_DATA_RESPONSE = 'ARTIFACTS_DATA_RESPONSE';
export const ARTIFACTS_DATA_ERROR_RESPONSE = 'ARTIFACTS_DATA_ERROR_RESPONSE';

const dataUrls = {
  artifacts: 'http://localhost:4000/reverse-archaeology-content/data/artifacts.json'
};

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
    return fetch(dataUrls.artifacts)
      .then(response => response.json())
      .then(json => dispatch(receiveArtifactsData(json)))
      .catch(error => dispatch(receiveArtifactsDataError(error)));
  });
}
