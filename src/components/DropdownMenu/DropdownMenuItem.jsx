import PropTypes from 'prop-types';
import { ReactComponent as CheckIcon } from '@assets/svgs/check.svg';

function DropdownMenuItem({ children, onItemClick, checked, value, style }) {
  return (
    <div
      className="dropdown-menu__content-item"
      data-checked={checked}
      role="button"
      onClick={(_) => onItemClick && onItemClick(value)}
      style={style}
      data-testid="dropdown-menu-item"
    >
      <span className="dropdown-menu__checked">
        <CheckIcon width={20} height={20} />
      </span>
      {children}
    </div>
  );
}

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
