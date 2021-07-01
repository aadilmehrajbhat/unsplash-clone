import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenuItem from '../DropdownMenuItem';
describe('DropdownMenuItem component', () => {
  it('should render as expected', () => {
    render(<DropdownMenuItem>Red</DropdownMenuItem>);
    expect(screen.getByTestId('dropdown-menu-item')).toBeInTheDocument();
  });

  it('should call onItemClick prop as expected', () => {
    const onItemClick = jest.fn();
    render(
      <DropdownMenuItem onItemClick={onItemClick} value="red">
        Red
      </DropdownMenuItem>,
    );
    fireEvent.click(screen.getByTestId('dropdown-menu-item'));
    expect(onItemClick).toBeCalledTimes(1);
    expect(onItemClick).toBeCalledWith('red');
  });

  it('should show check mark with checked prop as expected', () => {
    render(
      <DropdownMenuItem value="red" checked>
        Red
      </DropdownMenuItem>,
    );
    expect(screen.getByTestId('dropdown-menu-item').dataset.checked).toBe(
      'true',
    );
  });
});
