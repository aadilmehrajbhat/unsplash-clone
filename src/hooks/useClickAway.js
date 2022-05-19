import { useRef, useEffect, useCallback } from 'react';

function useClickAway({ root, callback }) {
  const callbackRef = useRef(callback);

  const onClickAway = useCallback(
    (e) => {
      if (root?.current) {
        const $rootEl = root.current;
        const $targetEl = e.target;

        !$rootEl.contains($targetEl) && callbackRef?.current?.();
      }
    },
    [root],
  );

  useEffect(() => {
    document.body.addEventListener('click', onClickAway);

    return () => document.body.removeEventListener('click', onClickAway);
  }, [onClickAway]);
}

export default useClickAway;
