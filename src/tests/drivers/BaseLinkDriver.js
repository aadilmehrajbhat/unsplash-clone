import BaseComponentDriver from './BaseComponentDriver';

class BaseLinkDriver extends BaseComponentDriver {
  constructor(parent, aid) {
    super(parent, aid);
  }

  get href() {
    return this.getAttribute('href');
  }
}

export default BaseLinkDriver;
