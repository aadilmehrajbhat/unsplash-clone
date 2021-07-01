import { useEffect, useState, useCallback } from 'react';
import { fetchUnsplashPhotos } from '@services/unsplash-api';
import { uniqueItems } from '@utils/lists';

function useUnsplashPhotos({ limit = 20 } = {}) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(limit);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = useCallback(() => {
    if (loading) return;

    setLoading(true);
    fetchUnsplashPhotos({ page, pageSize })
      .then((data) => {
        setPhotos((prevData) => uniqueItems([...prevData, ...data], 'id'));
        setPage((prev) => prev + 1);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [page, pageSize, loading]);

  useEffect(() => setPageSize(limit), [limit]);

  return {
    photos,
    fetchPhotos,
    loading,
  };
}

export default useUnsplashPhotos;
