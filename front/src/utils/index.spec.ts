import { firstLetterToUpperCase } from '.';

describe('utils', () => {
  test('firstLetterToUpperCase method', () => {
    const value = 'hello';
    const result = firstLetterToUpperCase(value);

    expect(result).toBe('Hello');
  });
});
