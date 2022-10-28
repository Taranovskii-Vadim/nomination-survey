import { isHaveAccess } from './helpers';

describe('Helpers', () => {
  test('isHaveAccess function', () => {
    const result = isHaveAccess('admin', 'ready');

    expect(result).toBe(true);
  });
});
