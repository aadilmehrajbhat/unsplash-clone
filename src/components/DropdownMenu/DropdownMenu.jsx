import PropTypes from 'prop-types';
import { useState, useRef, Children } from 'react';
import useClickAway from '@hooks/useClickAway';
import styled, { keyframes } from 'styled-components';

function DropdownMenu({ defaultTitle, selected, children }) {
  const [active, setActive] = useState(false);
  const containerRef = useRef();
  useClickAway({
    root: containerRef,
    callback: () => setActive(false),
  });

  return (
    <S.Container active={active} ref={containerRef} data-testid="dropdown-menu">
      <S.Action
        onClick={() => setActive((p) => !p)}
        data-testid="action-btn"
        active={active}
      >
        {selected || defaultTitle}
      </S.Action>
      <S.Content onClick={(_) => setActive(false)} active={active}>
        {children}
      </S.Content>
    </S.Container>
  );
}

const K = {
  fadeIn: keyframes`
     0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `,

  fadeOut: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
};

const S = {
  Container: styled.div`
    position: relative;
    color: #767676;
  `,
  Action: styled.button`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0.75em 1em;
    font-size: 0.85rem;
    border: none;
    user-select: none;
    font-weight: 500;
    font-family: inherit;
    line-height: 1;
    color: ${({ active }) => (active ? '#111' : 'inherit')};
    border-top-color: ${({ active }) => (active ? '#767676' : 'unset')};
    cursor: pointer;

    &:hover {
      color: #111;
    }

    &::after {
      content: '';
      color: ${({ active }) => (active ? '#767676' : '#d1d1d1')};
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid currentColor;
      border-color: currentColor transparent transparent;
      position: relative;
      top: 2.5px;
      margin-left: 6px;
    }

    &:hover::after {
      content: '';
      color: #111;
    }
  `,
  Content: styled.div`
    position: absolute;
    display: ${({ active }) => (active ? 'block' : 'none')};
    top: 100%;
    background: rgb(255, 255, 255);
    right: 0.5rem;
    min-width: 135px;
    transform: scale(0.9) translate(4px, -8px);
    padding: 0.25em 0;
    border: 1px solid #d1d1d1;
    z-index: 1;
    box-shadow: 0 8px 16px rgb(0 0 0 / 16%);
    border-radius: 4px;
    animation-name: ${({ active }) => (active ? K.fadeIn : K.fadeOut)};
    animation-duration: 0.3s;
  `,
};

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
