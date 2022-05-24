import { renderWithContext, cleanup } from '@tests/utils';
import SuggestionList from './SuggestionList';
import SuggestionListDriver from './SuggestionList.driver';

describe('<SuggestionList />', () => {
  const renderComponent = ({
    title = '',
    suggestions = [],
    startAdornment,
  } = {}) => {
    const { container } = renderWithContext({
      component: SuggestionList,
      props: {
        title,
        suggestions,
        startAdornment,
      },
    });

    return {
      driver: new SuggestionListDriver(container),
    };
  };

  afterEach(cleanup);

  it('should render', () => {
    const { driver } = renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('title', () => {
    it('should render', () => {
      const { driver } = renderComponent();

      expect(driver.title.exists).toBe(true);
    });

    it('should render correct text', () => {
      const { driver } = renderComponent({
        title: 'Recent Searches',
      });

      expect(driver.title.text).toBe('Recent Searches');
    });
  });

  describe('content', () => {
    it('should render', () => {
      const { driver } = renderComponent();

      expect(driver.content.exists).toBe(true);
    });

    describe('suggestions', () => {
      it('should render', () => {
        const suggestions = ['Planes', 'Mountains', 'Remote work'];
        const { driver } = renderComponent({ suggestions });

        expect(driver.suggestions.length).toBe(3);
      });

      it('should render correct text', () => {
        const suggestions = ['Planes', 'Mountains', 'Remote work'];
        const { driver } = renderComponent({ suggestions });

        expect(driver.suggestions.at(2).text).toBe('Remote work');
      });

      it('should render correct link', () => {
        const suggestions = ['Planes', 'Mountains', 'Remote work'];
        const { driver } = renderComponent({ suggestions });

        expect(driver.suggestions.at(2).href).toBe('/s/photos/Remote%20work');
      });

      describe('start adornment', () => {
        it('should not render by default', () => {
          const suggestions = ['Planes', 'Mountains', 'Remote work'];
          const { driver } = renderComponent({ suggestions });

          expect(driver.suggestions.at(0).startAdornment.exists).toBe(false);
        });

        it('should render', () => {
          const suggestions = ['Planes', 'Mountains', 'Remote work'];
          const { driver } = renderComponent({
            suggestions,
            startAdornment: <span></span>,
          });

          expect(driver.suggestions.at(0).startAdornment.exists).toBe(true);
        });
      });
    });
  });
});
