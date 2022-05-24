import { renderWithContext, mock, waitFor, cleanup } from '@tests/utils';
import SearchSuggestion from './SearchSuggestion';
import SearchSuggestionDriver from './SearchSuggestion.driver';
import { BASE_URL } from '@services/constants';

describe('<SearchSuggestion />', () => {
  const mockTrendingSearches = ['Meadows', 'gulmarg', 'kashmir valley'];
  const mockRecentSearches = ['Hiking', 'Camping'];

  const renderComponent = async ({
    trendingSearches = mockTrendingSearches,
    recentSearches = mockRecentSearches,
    waitUntilLoaded = true,
  } = {}) => {
    mockGetRecentSearches({ recentSearches });
    const scope = mockGetSuggestions({ trendingSearches });

    const { container } = renderWithContext({
      component: SearchSuggestion,
      props: {},
    });

    const driver = new SearchSuggestionDriver(container);

    if (waitUntilLoaded) {
      await waitFor(() => {
        expect(scope.isDone()).toBe(true);
        expect(driver.trendingSearches.exists).toBe(true);
      });
    }

    return {
      driver,
      scope,
    };
  };

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mock.cleanAll();
    cleanup();
  });

  const mockGetSuggestions = ({
    trendingTopics = [],
    trendingSearches = [],
    trendingCollections = [],
  } = {}) =>
    mock(BASE_URL).get('/api/suggestions/').reply(200, {
      trendingTopics,
      trendingSearches,
      trendingCollections,
    });

  const mockGetRecentSearches = ({ recentSearches }) => {
    localStorage.setItem('recent-searches', JSON.stringify(recentSearches));
  };

  it('should render', async () => {
    const { driver } = await renderComponent();

    expect(driver.exists).toBe(true);
  });

  describe('recent searches', () => {
    it('should not render by default', async () => {
      const { driver } = await renderComponent({ recentSearches: [] });

      expect(driver.recentSearches.exists).toBe(false);
    });

    describe('title', () => {
      it('should render', async () => {
        const { driver } = await renderComponent();

        expect(driver.recentSearches.title.exists).toBe(true);
      });

      it('should render correct text', async () => {
        const { driver } = await renderComponent();

        expect(driver.recentSearches.title.text).toBe(
          'Search suggestions ·Clear',
        );
      });

      describe('clear', () => {
        it('should render', async () => {
          const { driver } = await renderComponent();

          expect(driver.recentSearches.clear.exists).toBe(true);
        });

        it('should render correct text', async () => {
          const { driver } = await renderComponent();

          expect(driver.recentSearches.clear.text).toBe(' ·Clear');
        });

        describe('on click', () => {
          it('should clear the recent searches', async () => {
            const { driver } = await renderComponent();

            expect(driver.recentSearches.suggestions.length).toBe(2);
            driver.recentSearches.clear.click();
            expect(driver.recentSearches.exists).toBe(false);
          });
        });
      });
    });

    describe('suggestions', () => {
      it('should render', async () => {
        const { driver } = await renderComponent();

        expect(driver.recentSearches.exists).toBe(true);
      });

      it('should render correct suggestions length', async () => {
        const { driver } = await renderComponent();

        expect(driver.recentSearches.suggestions.length).toBe(2);
      });

      it('should render correct text', async () => {
        const { driver } = await renderComponent();

        expect(driver.recentSearches.suggestions.at(0).text).toBe('Hiking');
      });

      it('should not render start adornment', async () => {
        const { driver } = await renderComponent();

        expect(
          driver.recentSearches.suggestions.at(0).startAdornment.exists,
        ).toBe(false);
      });
    });
  });

  describe('trending searches', () => {
    it('should not render by default', async () => {
      const { driver } = await renderComponent({ waitUntilLoaded: false });

      expect(driver.trendingSearches.exists).toBe(false);
    });

    describe('title', () => {
      it('should render', async () => {
        const { driver } = await renderComponent();

        expect(driver.trendingSearches.title.exists).toBe(true);
      });

      it('should render correct text', async () => {
        const { driver } = await renderComponent();

        expect(driver.trendingSearches.title.text).toBe('Trending Searches');
      });
    });

    describe('suggestions', () => {
      it('should render', async () => {
        const { driver } = await renderComponent();

        expect(driver.trendingSearches.exists).toBe(true);
      });

      it('should render correct suggestions length', async () => {
        const { driver } = await renderComponent();

        expect(driver.trendingSearches.suggestions.length).toBe(3);
      });

      it('should render correct text', async () => {
        const { driver } = await renderComponent();

        expect(driver.trendingSearches.suggestions.at(0).text).toBe('Meadows');
      });

      it('should render start adornment', async () => {
        const { driver } = await renderComponent();

        expect(
          driver.trendingSearches.suggestions.at(0).startAdornment.exists,
        ).toBe(true);
      });
    });
  });
});
