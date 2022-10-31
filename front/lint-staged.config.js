'use strict';

const actions = ['prettier --write', 'eslint --fix', 'git add'];

module.exports = {
  '.*.js': actions,
  '*.{js,ts,tsx}': actions,
};
