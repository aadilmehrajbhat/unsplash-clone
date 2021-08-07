import getValue from 'lodash/get';

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const UNSPLASH_WEB_URL = 'https://unsplash.com';

export async function fetchUnsplashPhotos({ page = 1, pageSize = 20 } = {}) {
  const url = `${UNSPLASH_API_URL}/photos/?page=${page}&per_page=${pageSize}`;
  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}`,
    },
  })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        return response.json();
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
  pageSize = 20,
  query,
  orderBy,
  color,
  orientation,
} = {}) {
  const url = new URL(`${UNSPLASH_API_URL}/search/photos/`);
  const search = new URLSearchParams();

  search.append('query', query);
  page && search.append('page', page);
  pageSize && search.append('per_page', pageSize);
  orderBy && search.append('order_by', orderBy);
  color && search.append('color', color);
  orientation && search.append('orientation', orientation);

  url.search = search;

  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}`,
    },
  })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        return response.json();
      }

      return Promise.reject(new Error('[Invalid status code] - ' + status));
    })
    .catch((error) => {
      throw new Error(
        'Error while searching the unsplash photo: ' + error.message,
      );
    });
}

export async function fetchUnsplashSearchSuggestions() {
  const html = await (await fetch(UNSPLASH_WEB_URL)).text();
  const match = html.match(/JSON.parse\((.*?)\);/);
  let result = {
    trendingSearches: null,
    trendingTopics: null,
    trendingCollections: null,
  };

  if (Array.isArray(match) && match.length > 1) {
    const state = JSON.parse(JSON.parse(match[1]));

    result = {
      trendingTopics: getValue(
        state,
        'ui.searchSuggestions.trendingTopics',
        null,
      ),
      trendingSearches: getValue(
        state,
        'ui.searchSuggestions.trendingSearches',
        null,
      ),
      trendingCollections: getValue(
        state,
        'ui.searchSuggestions.trendingSearches',
        null,
      ),
    };
  }

  return result;
}

const UnsplashApi = {
  fetchUnsplashPhotos,
  searchUnsplashPhotos,
  fetchUnsplashSearchSuggestions,
};

export default UnsplashApi;
