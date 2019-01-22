const { jestPreset } = require('ts-jest');

const custom = {
  preset: 'react-native',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  transformIgnorePatterns: ['node_modules/(?!react-native)/'],
};

const config = Object.assign(jestPreset, custom);
console.log(config);

module.exports = config;
