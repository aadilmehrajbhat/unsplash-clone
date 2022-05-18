const { useRef, useState, useEffect } = require('react');

const useMouseHover = () => {
  const ref = useRef();
  const [isHovering, setHovering] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const onMouseleave = () => setHovering(false);
    const onMouseHover = () => setHovering(true);

    el.addEventListener('mouseenter', onMouseHover);
    el.addEventListener('mouseleave', onMouseleave);

    return () => {
      el.removeEventListener('mouseenter', onMouseHover);
      el.removeEventListener('mouseleave', onMouseleave);
    };
  }, [ref]);

  return [ref, isHovering];
};

export default useMouseHover;
