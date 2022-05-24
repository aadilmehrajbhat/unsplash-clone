import { queryAllByTestId } from '@tests/utils';
import { BaseComponentDriver, BaseLinkDriver } from '@tests/drivers';

class SuggestionListDriver extends BaseComponentDriver {
  constructor(parent, aid = 'suggestion-list') {
    super(parent, aid);
  }

  get title() {
    return new BaseComponentDriver(this.element, 'title');
  }

  get content() {
    return new BaseComponentDriver(this.element, 'content');
  }

  get suggestions() {
    const items = queryAllByTestId(this.content.element, 'suggestion');
    return {
      length: items.length,
      at(i) {
        const linkDriver = new BaseLinkDriver(items[i]);

        Object.defineProperty(linkDriver, 'startAdornment', {
          get() {
            return new BaseComponentDriver(
              linkDriver.element,
              'start-adornment',
            );
          },
        });

        return linkDriver;
      },
    };
  }
}

export default SuggestionListDriver;
