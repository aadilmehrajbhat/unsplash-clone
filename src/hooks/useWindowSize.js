import { useCallback, useEffect, useState } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: null, height: null });

  const onWindowResize = useCallback(
    (_) => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
    [setWindowSize],
  );

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);

    onWindowResize();

    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return windowSize;
}

export default useWindowSize;
