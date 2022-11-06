import { template } from './theme';

describe('styles', () => {
  test('theme object', () => {
    expect(template.components.Button.variants.solid()).toBeDefined();
  });
});
