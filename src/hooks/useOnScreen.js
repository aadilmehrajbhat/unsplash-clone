import useIntersectionObserver from './useIntersectionObserver';

function useOnScreen(elementRef, { rootMargin = '0px' }) {
  const entry = useIntersectionObserver(elementRef, { rootMargin });
  return !!entry?.isIntersecting;
}

export default useOnScreen;
