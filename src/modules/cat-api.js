import axios from 'axios';

const API_KEY =
  'live_gdOCejEPQlxN8D7hQetsYIujaOJxF7nZPmY4xxZqAIGDBbCAGbEoiIeVyQZUxRue';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const GET_BREAD = 'breeds';
const GET_IMAGES_SEARCH = 'images/search';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function apiCall(endpoint, queryParameters = null) {
  if (queryParameters) {
    endpoint += '?' + new URLSearchParams(queryParameters);
  }

  return axios(BASE_URL + endpoint).then(res =>
    res.status === 200 ? res.data : Promise.reject(res.statusText)
  );
}

export function fetchBreeds() {
  return apiCall(GET_BREAD);
}

export function fetchCatByBreed(breedId) {
  return apiCall(GET_IMAGES_SEARCH, { breed_ids: breedId }).then(res => res[0]);
}
