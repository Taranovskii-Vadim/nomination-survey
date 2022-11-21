import store from '.';

describe('user store', () => {
  test('getProfileData method', async () => {
    await store.getProfileData();

    expect(store.data).toBeDefined();
  });

  test('signIn method', async () => {
    const login = 'test';

    await store.signIn({ login });

    expect(store.isSubmit).toBe(false);
    expect(store.isLoginForm).toBe(true);
  });
});
