import '@testing-library/jest-dom';
import * as matchers from 'jest-extended';
import { configure } from '@testing-library/dom';
import matchMediaPolyfill from 'mq-polyfill';

matchMediaPolyfill(window);

expect.extend(matchers);

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

configure({
  testIdAttribute: 'data-aid',
});
