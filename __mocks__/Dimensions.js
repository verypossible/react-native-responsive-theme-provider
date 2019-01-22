'use strict';

const listeners = [];
const Dimensions = {
  get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
  addEventListener: (type, fn) => {
    listeners.push(fn);
  },
  removeEventListener: () => {},
  emit: (props) => {
    listeners.forEach((fn) => {
      fn(props);
    });
  },
};

module.exports = Dimensions;
