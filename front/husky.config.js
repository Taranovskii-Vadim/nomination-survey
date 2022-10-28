'use strict';

module.exports = {
  hooks: {
    'pre-commit': ['lint-staged', 'npm run test'].join(' && '),
  },
};
