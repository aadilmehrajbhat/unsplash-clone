import { render } from '@tests/utils';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuDriver from './DropdownMenu.driver';
import DropdownMenuItem from './DropdownMenuItem';

describe('DropdownMenu component', () => {
  const options = ['Red', 'Green', 'Blue'].map((color) => (
    <DropdownMenuItem key={color}>{color}</DropdownMenuItem>
  ));

  const renderComponent = ({ defaultTitle = 'Select color' } = {}) => {
    const { container } = render(
      <DropdownMenu defaultTitle={defaultTitle}>
        <DropdownMenuItem>Red</DropdownMenuItem>
        <DropdownMenuItem>Green</DropdownMenuItem>
        <DropdownMenuItem>Blue</DropdownMenuItem>
      </DropdownMenu>,
    );

    return {
      driver: new DropdownMenuDriver(container),
    };
  };

  it('should render', () => {
    const { driver } = renderComponent();
    expect(driver.exists).toBe(true);
  });

  fdescribe('toggle action', () => {
    it('should render', () => {
      const { driver } = renderComponent();
      expect(driver.toggleMenu.exists).toBe(true);
    });

    it('should render correct text', () => {
      const { driver } = renderComponent();
      expect(driver.toggleMenu.text).toBe('Select color');
    });

    it('should not be disabled', () => {
      const { driver } = renderComponent();
      expect(driver.toggleMenu.disabled).toBe(false);
    });

    describe('on click', () => {
      describe('menu content', () => {
        it('should not render by default', () => {
          const { driver } = renderComponent();

          expect(driver.menu.exists).toBe(false);
        });

        it('should render', () => {
          const { driver } = renderComponent();
          driver.toggleMenu.click();

          expect(driver.menu.exists).toBe(true);
        });

        describe('items', () => {
          it('should render correct menu items', () => {
            const { driver } = renderComponent();
            driver.toggleMenu.click();

            expect(driver.menu.length).toBe(3);
          });

          it('should render correct menu text', () => {
            const { driver } = renderComponent();
            driver.toggleMenu.click();

            expect(driver.menu.at(0).text).toBe('Red');
          });

          describe('on click', () => {
            it('should close the menu', () => {
              const { driver } = renderComponent();
              driver.toggleMenu.click();
              driver.menu.at(0).click();
              expect(driver.menu.exists).toBe(false);
            });
          });
        });
      });
    });
  });
});
