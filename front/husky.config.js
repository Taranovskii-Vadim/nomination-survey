'use strict';

module.exports = {
  hooks: {
    // TODO remove this comment later
    // 'pre-commit': ['lint-staged', 'npm run test'].join(' && '),
    'pre-commit': ['lint-staged'],
  },
};
