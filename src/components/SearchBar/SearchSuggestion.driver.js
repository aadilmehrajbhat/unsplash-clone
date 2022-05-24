import { BaseComponentDriver } from '@tests/drivers';
import SuggestionListDriver from './SuggestionList.driver';

class SearchSuggestion extends BaseComponentDriver {
  constructor(parent, aid = 'search-suggestion') {
    super(parent, aid);
  }

  get recentSearches() {
    const driver = new SuggestionListDriver(this.element, 'recent-searches');
    Object.defineProperty(driver, 'clear', {
      get() {
        return new BaseComponentDriver(driver.element, 'clear');
      },
    });

    return driver;
  }

  get trendingSearches() {
    return new SuggestionListDriver(this.element, 'trending-searches');
  }
}

export default SearchSuggestion;
