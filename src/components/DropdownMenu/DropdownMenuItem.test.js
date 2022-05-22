import { render } from '@tests/utils';

import DropdownMenuItem from './DropdownMenuItem';
import DropdownMenuItemDriver from './DropdownMenuItem.driver';

describe('DropdownMenuItem component', () => {
  const renderComponent = ({
    children = 'Menu option',
    checked,
    value,
    onItemClick,
  } = {}) => {
    const { baseElement } = render(
      <DropdownMenuItem
        checked={checked}
        onItemClick={onItemClick}
        value={value}
      >
        {children}
      </DropdownMenuItem>,
    );

    return {
      driver: new DropdownMenuItemDriver(baseElement),
    };
  };

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  it('should render correct option text', () => {
    const { driver } = renderComponent();

    expect(driver.text).toBe('Menu option');
  });

  it('should not be checked by default', () => {
    const { driver } = renderComponent();

    expect(driver.checked).toBe(false);
  });

  it('should render checked option as expected', () => {
    const { driver } = renderComponent({ checked: true });

    expect(driver.checked).toBe(true);
  });

  describe('on click', () => {
    it('should call onItemClick as expected', () => {
      const onItemClick = jest.fn();

      const { driver } = renderComponent({ onItemClick });

      driver.click();

      expect(onItemClick).toBeCalledTimes(1);
    });

    it('should call onItemClick with correct value', () => {
      const onItemClick = jest.fn();
      const value = 'red';

      const { driver } = renderComponent({
        onItemClick,
        value,
      });

      driver.click();

      expect(onItemClick).toBeCalledWith('red');
      expect(onItemClick).toBeCalledTimes(1);
    });
  });
});
