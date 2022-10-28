'use strict';

const actions = ['prettier --write', 'git add'];

module.exports = {
  '.*.js': actions,
  '*.{js,ts,tsx}': actions,
};
