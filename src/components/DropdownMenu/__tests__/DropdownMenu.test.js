import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';
describe('DropdownMenu component', () => {
  const options = ['Red', 'Green', 'Blue'].map((color) => (
    <DropdownMenuItem key={color}>{color}</DropdownMenuItem>
  ));
  it('should render as expected', () => {
    render(<DropdownMenu defaultTitle="Select Color">{options}</DropdownMenu>);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('should show menu on click as expected', () => {
    render(<DropdownMenu defaultTitle="Select Color">{options}</DropdownMenu>);
    fireEvent.click(screen.getByTestId('action-btn'));
    expect(screen.getByTestId('dropdown-menu')).toHaveClass(
      'dropdown-menu active',
    );
  });

  it('should hide menu on click outside as expected', () => {
    render(<DropdownMenu defaultTitle="Select Color">{options}</DropdownMenu>);
    fireEvent.click(screen.getByTestId('action-btn'));
    fireEvent.click(document.body);
    expect(screen.getByTestId('dropdown-menu')).toHaveClass('dropdown-menu');
  });
});
