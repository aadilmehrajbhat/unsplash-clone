import { render, cleanup, act } from '@tests/utils';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';
import SearchBarDriver from './SearchBar.driver';

describe('<SearchBar />', () => {
  const renderComponent = ({ defaultValue, onChange, onSubmit } = {}) => {
    const { container } = render(
      <SearchBar
        defaultValue={defaultValue}
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

    return {
      driver: new SearchBarDriver(container),
      user: userEvent.setup(),
    };
  };

  beforeEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('input', () => {
    it('should render empty text by default', () => {
      const { driver } = renderComponent();

      expect(driver.input.value).toBe('');
    });

    it('should render correct default text', () => {
      const { driver } = renderComponent();

      expect(driver.input.value).toBe('');
      driver.input.change('Hospital');
      expect(driver.input.value).toBe('Hospital');
    });

    it('should render correct text', () => {
      const { driver } = renderComponent({ defaultValue: 'Planes' });

      expect(driver.input.value).toBe('Planes');
    });

    describe('clear', () => {
      it('should not render by default', () => {
        const { driver } = renderComponent();

        expect(driver.clear.exists).toBe(false);
      });

      it('should render with text', () => {
        const { driver } = renderComponent();

        driver.input.change('some query');

        expect(driver.clear.exists).toBe(true);
      });

      describe('on click', () => {
        it('should clear the input', () => {
          const { driver } = renderComponent();

          driver.input.change('some query');
          expect(driver.clear.exists).toBe(true);

          driver.clear.click();
          expect(driver.input.value).toBe('');
        });
      });
    });

    describe('on change', () => {
      it('should call onChange', () => {
        const onChange = jest.fn();
        const { driver } = renderComponent({ onChange });

        driver.input.change('some query');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('some query');
      });
    });

    describe('on submit', () => {
      it('should call onSubmit', () => {
        const onSubmit = jest.fn();
        const { driver } = renderComponent({ onSubmit });

        driver.input.change('some query');
        driver.input.submit();

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('some query');
      });
    });
  });
});
