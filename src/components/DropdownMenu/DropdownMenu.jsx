import PropTypes from 'prop-types';
import { useState, useRef, Children } from 'react';
import useClickAway from '@hooks/useClickAway';

function DropdownMenu({ defaultTitle, selected, children }) {
  const [active, setActive] = useState(false);
  const containerRef = useRef();
  useClickAway({ root: containerRef, callback: () => setActive(false) });

  return (
    <div
      className={`dropdown-menu ${active ? 'active' : ''}`}
      ref={containerRef}
      data-testid="dropdown-menu"
    >
      <button
        className="dropdown-menu__action"
        onClick={() => setActive((p) => !p)}
        data-testid="action-btn"
      >
        {selected || defaultTitle}
      </button>
      <div
        className={`dropdown-menu__content ${active ? 'fadeIn' : 'fadeOut'}`}
        onClick={(_) => setActive(false)}
      >
        {children}
      </div>
    </div>
  );
}

DropdownMenu.propTypes = {
  defaultTitle: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];
    Children.forEach(prop, (child) => {
      if (child.type.name !== 'DropdownMenuItem') {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`DropdownMenuItem\`.`,
        );
      }
    });
    return error;
  },
};

export default DropdownMenu;
