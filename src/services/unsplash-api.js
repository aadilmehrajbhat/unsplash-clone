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

export async function scrapUnsplashSearchSuggestions() {
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

export function fetchUnsplashSearchSuggestions() {
  const url = `/api/suggestions/`;
  return fetch(url)
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        return response.json();
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
  const url = `${UNSPLASH_API_URL}/photos/${id}`;

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
