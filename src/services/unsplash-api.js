import axios from 'axios';
import getValue from 'lodash/get';
import { appClient, unsplashApiClient, unsplashWebClient } from './constants';

export async function fetchUnsplashPhotos({ page = 1, pageSize = 20 } = {}) {
  const url = `/photos/?page=${page}&per_page=${pageSize}`;
  return unsplashApiClient
    .get(url)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        return data;
      }

      return Promise.reject(new Error('[Invalid status code] - ' + status));
    })
    .catch((error) => {
      throw new Error(
        'Error while fetching the unsplash photos: ' + error.message,
      );
    });
}

export async function searchUnsplashPhotos({
  page = 1,
  pageSize: page_size = 20,
  query,
  orderBy: order_by,
  color,
  orientation,
} = {}) {
  const url = `/search/photos/`;

  return unsplashApiClient
    .get(url, {
      params: { query, page, page_size, order_by, orientation, color, query },
    })
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        return data;
      }

      return Promise.reject(new Error('[Invalid status code] - ' + status));
    })
    .catch((error) => {
      throw new Error(
        'Error while searching the unsplash photo: ' + error.message,
      );
    });
}

export async function scrapUnsplashSearchSuggestions() {
  const { data: html } = await unsplashWebClient.get('/', {
    responseType: 'text',
  });
  const match = html.match(/JSON.parse\((.*?)\);/);
  let result = {
    trendingSearches: [],
    trendingTopics: [],
    trendingCollections: [],
  };

  if (Array.isArray(match) && match.length > 1) {
    const state = JSON.parse(JSON.parse(match[1]));
    const filterValues = (value) => !value || value !== 'null';

    result = {
      trendingTopics: getValue(
        state,
        'ui.searchSuggestions.trendingTopics',
        [],
      ).filter(filterValues),
      trendingSearches: getValue(
        state,
        'ui.searchSuggestions.trendingSearches',
        [],
      ).filter(filterValues),
      trendingCollections: getValue(
        state,
        'ui.searchSuggestions.trendingSearches',
        [],
      ).filter(filterValues),
    };
  }

  return result;
}

export function fetchUnsplashSearchSuggestions() {
  const url = `/api/suggestions`;
  return appClient
    .get(url)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        return response.data;
      }

      return Promise.reject(new Error('[Invalid status code] - ' + status));
    })
    .catch((error) => {
      throw new Error(
        'Error while fetching the search suggestions: ' + error.message,
      );
    });
}

export function fetchPhotoById(id) {
  const url = `/photos/${id}`;

  return unsplashApiClient
    .get(url)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        return data;
      }

      return Promise.reject(new Error('[Invalid status code] - ' + status));
    })
    .catch((error) => {
      throw new Error(
        `Error while fetching the image details with image id (${id}): ` +
          error.message,
      );
    });
}

const UnsplashApi = {
  fetchUnsplashPhotos,
  fetchPhotoById,
  searchUnsplashPhotos,
  scrapUnsplashSearchSuggestions,
  fetchUnsplashSearchSuggestions,
};

export default UnsplashApi;
