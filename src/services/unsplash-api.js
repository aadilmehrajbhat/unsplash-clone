const UNSPLASH_URL = 'https://api.unsplash.com';

export async function fetchUnsplashPhotos({ page = 1, pageSize = 20 } = {}) {
  const url = `${UNSPLASH_URL}/photos/?page=${page}&per_page=${pageSize}`;
  return fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
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
  const url = new URL(`${UNSPLASH_URL}/search/photos/`);
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
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
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

const UnsplashApi = {
  fetchUnsplashPhotos,
  searchUnsplashPhotos,
};

export default UnsplashApi;
