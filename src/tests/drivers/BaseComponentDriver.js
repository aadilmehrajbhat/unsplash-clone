import { queryByTestId, prettyDOM, fireEvent } from '@testing-library/react';

class BaseComponentDriver {
  constructor(parent, aid = null) {
    this.parent = parent;
    this.aid = aid;
  }

  get element() {
    return this.aid ? queryByTestId(this.parent, this.aid) : this.parent;
  }

  get exists() {
    return !!this.element;
  }

  get text() {
    return this.element.textContent;
  }

  get disabled() {
    return this.element.disabled;
  }

  focus() {
    this.element.focus();
  }

  blur() {
    this.element.blur();
  }

  click() {
    fireEvent.click(this.element);
  }

  debug() {
    console.log(this.toString());
  }

  triggerEvent(type, data) {
    fireEvent[type](this.element, data);
  }

  getAttribute(attribute) {
    return this.element.getAttribute(attribute);
  }
}

BaseComponentDriver.prototype.toString = function () {
  return `${this.constructor.name} ${
    this.aid ? `(aid: ${this.aid})` : ''
  }:\n${prettyDOM(this.element)}`;
};

export default BaseComponentDriver;
