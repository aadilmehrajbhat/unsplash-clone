import { queryAllByTestId } from '@tests/utils';
import { BaseComponentDriver } from '@tests/drivers';

class MasonryGridDriver extends BaseComponentDriver {
  constructor(parent, aid = 'masonry-grid', itemDriver = BaseComponentDriver) {
    super(parent, aid);
    this.itemDriver = itemDriver;
  }

  get columns() {
    const self = this;
    const columns = queryAllByTestId(this.element, 'masonry-column');

    return {
      length: columns.length,

      at(col) {
        const column = columns[col];
        const items = column.children;
        return {
          length: items.length,
          at(row) {
            return self.getItem(items[row]);
          },
        };
      },
    };
  }

  getItem(el) {
    return new BaseComponentDriver(el);
  }
}

export default MasonryGridDriver;
