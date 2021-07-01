import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
describe('SearchBar component', () => {
  it('should render as expected', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should render default value as expected', () => {
    render(<SearchBar defaultValue="Planes" />);
    expect(screen.getByTestId('input').value).toBe('Planes');
  });

  it('should call onChange prop as expected', () => {
    const onSearchChange = jest.fn();
    render(<SearchBar onChange={onSearchChange} />);

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'Aadi' },
    });
    fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'l' },
    });

    expect(onSearchChange).toHaveBeenCalledTimes(2);
  });

  it('should call onSubmit prop as expected', () => {
    const onSearchSubmit = jest.fn();
    render(<SearchBar defaultValue="Planes" onSubmit={onSearchSubmit} />);
    fireEvent.submit(screen.getByTestId('input'));
    expect(onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  it('should hide clear button as expected', () => {
    render(<SearchBar defaultValue="Planes" hideClear />);
    expect(screen.queryByTestId('clear-input')).not.toBeInTheDocument();
  });
});
