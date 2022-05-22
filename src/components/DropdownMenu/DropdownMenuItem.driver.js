import { BaseComponentDriver } from '@tests/drivers';

class DropdownMenuItemDriver extends BaseComponentDriver {
  constructor(parent, aid = 'dropdown-menu-item') {
    super(parent, aid);
  }

  get checked() {
    return this.element.dataset.checked === 'true';
  }
}

export default DropdownMenuItemDriver;
