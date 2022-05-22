import { render, cleanup } from '@tests/utils';
import MasonryGrid from './MasonryGrid';
import MasonryGridDriver from './MasonryGrid.driver';

describe('<MasonryGrid />', () => {
  const breakpoints = [
    { width: 760, columns: 2 },
    { width: 960, columns: 3 },
  ];

  const children = [1, 2, 3, 4, 5].map((i) => (
    <span data-aid="item" key={i}>
      Item {i}
    </span>
  ));

  const renderComponent = ({ breakpoints } = {}) => {
    const { container } = render(
      <MasonryGrid breakpoints={breakpoints}>{children}</MasonryGrid>,
    );

    return {
      driver: new MasonryGridDriver(container),
    };
  };

  beforeEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('columns', () => {
    it('should render correct default columns', () => {
      const { driver } = renderComponent();

      expect(driver.columns.length).toBe(1);
    });

    it('should render correct items in the column', () => {
      const { driver } = renderComponent();

      expect(driver.columns.at(0).length).toBe(5);
    });

    it('should render correct item text', () => {
      const { driver } = renderComponent();

      expect(driver.columns.at(0).at(0).text).toBe('Item 1');
    });

    describe('breakpoints', () => {
      it('should render columns based on breakpoints as expected', () => {
        window.resizeTo(1024, 500);
        const { driver } = renderComponent({ breakpoints });

        expect(driver.columns.length).toBe(3);
      });

      it('should render correct columns if greater then breakpoint width', () => {
        window.resizeTo(961, 500);
        const { driver } = renderComponent({ breakpoints });

        expect(driver.columns.length).toBe(3);
      });

      it('should render correct columns if equal to breakpoint width', () => {
        window.resizeTo(960, 500);
        const { driver } = renderComponent({ breakpoints });

        expect(driver.columns.length).toBe(2);
      });

      it('should render correct columns if less then breakpoint width', () => {
        window.resizeTo(959, 500);
        const { driver } = renderComponent({ breakpoints });

        expect(driver.columns.length).toBe(2);
      });

      it('should render correct columns for smaller width', () => {
        window.resizeTo(540, 500);
        const { driver } = renderComponent({ breakpoints });

        expect(driver.columns.length).toBe(1);
      });

      it('should render items in same order in row as expected', () => {
        window.resizeTo(1024, 960);
        const { driver } = renderComponent({ breakpoints });

        const [firstColumn, secondColumn, thirdColumn] = [
          driver.columns.at(0),
          driver.columns.at(1),
          driver.columns.at(2),
        ];

        expect(firstColumn.length).toBe(2);
        expect(secondColumn.length).toBe(2);
        expect(thirdColumn.length).toBe(1);

        expect(firstColumn.at(0).text).toBe('Item 1');
        expect(secondColumn.at(0).text).toBe('Item 2');
        expect(thirdColumn.at(0).text).toBe('Item 3');
        expect(secondColumn.at(1).text).toBe('Item 5');
      });
    });
  });
});
