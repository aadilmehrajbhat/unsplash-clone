import BaseComponentDriver from './BaseComponentDriver';

class BaseInputDriver extends BaseComponentDriver {
  constructor(parent, aid) {
    super(parent, aid);
  }

  get value() {
    return this.element.value;
  }

  change(value) {
    this.triggerEvent('change', { target: { value } });
  }

  submit() {
    this.triggerEvent('submit');
  }
}

export default BaseInputDriver;
