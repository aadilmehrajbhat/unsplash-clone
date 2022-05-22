import { BaseComponentDriver } from '@tests/drivers';
import DropdownMenuItemDriver from './DropdownMenuItem.driver';

class DropdownMenuDriver extends BaseComponentDriver {
  constructor(parent, aid = 'dropdown-menu') {
    super(parent, aid);
  }

  get toggleMenu() {
    return new BaseComponentDriver(this.element, 'toggle-menu');
  }

  get menu() {
    const self = this;
    const menuDriver = new BaseComponentDriver(this.element, 'menu-content');
    const options = menuDriver.element?.children ?? [];

    Object.assign(menuDriver, {
      length: options.length,
      at(i) {
        return self.getItem(options[i]);
      },
    });

    return menuDriver;
  }

  getItem(el) {
    return new DropdownMenuItemDriver(el, null);
  }
}

export default DropdownMenuDriver;
