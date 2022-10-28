'use strict';

// TODO add eslint --fix after prettier
const actions = ['prettier --write', 'git add'];

module.exports = {
  '.*.js': actions,
  '*.{js,ts,tsx}': actions,
};
