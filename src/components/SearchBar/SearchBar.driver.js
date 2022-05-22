import { BaseComponentDriver } from '@tests/drivers';
import BaseInputDriver from '@tests/drivers/BaseInputDriver';

class SearchBarDriver extends BaseComponentDriver {
  constructor(parent, aid = 'search-bar') {
    super(parent, aid);
  }

  get input() {
    return new BaseInputDriver(this.element, 'input');
  }

  get clear() {
    return new BaseComponentDriver(this.element, 'clear-input');
  }
}

export default SearchBarDriver;
