import 'isomorphic-fetch';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import * as matchers from 'jest-extended';
import { configure } from '@testing-library/dom';
import matchMediaPolyfill from 'mq-polyfill';
import axios from 'axios';

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

axios.defaults.adapter = require('axios/lib/adapters/http');
