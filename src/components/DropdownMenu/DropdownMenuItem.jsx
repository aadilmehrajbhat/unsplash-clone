import PropTypes from 'prop-types';
import { default as CheckIcon } from '@assets/svgs/check.svg';
import styled from 'styled-components';

const DropdownMenuItem = ({ children, onItemClick, checked, value, style }) => (
  <S.Container
    data-aid="dropdown-menu-item"
    data-checked={checked}
    role="button"
    onClick={(_) => onItemClick && onItemClick(value)}
    style={style}
    checked={checked}
  >
    <S.Check checked={checked}>
      <CheckIcon width={20} height={20} />
    </S.Check>
    {children}
  </S.Container>
);

const S = {
  Container: styled.div`
    padding: 0.75em 1em 0.75em 2em;
    color: #767676;
    cursor: ${({ checked }) => (checked ? 'default' : 'pointer')};
    position: relative;
    user-select: none;
    white-space: nowrap;
    pointer-events: ${({ checked }) => (checked ? 'none' : '')};

    &:hover {
      color: #111;
      background: ${({ checked }) => (checked ? '#f5f5f5' : '')};
    }
  `,
  Check: styled.span`
    position: absolute;
    left: 0.4em;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  `,
};

DropdownMenuItem.propTypes = {
  onItemClick: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  style: PropTypes.object,
  children: PropTypes.any,
};

export default DropdownMenuItem;
