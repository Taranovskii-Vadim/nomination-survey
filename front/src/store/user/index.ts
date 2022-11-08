import { makeObservable, observable, runInAction } from 'mobx';

import { api } from 'src/api';
import postLogin from 'src/api/postLogin';
import getProfile from 'src/api/getProfile';

import { SignInFormValues, User } from './types';

class UserStore {
  data: User = undefined;

  isSubmit = false;

  isLoginForm = !document.cookie.includes('token');

  constructor() {
    makeObservable(this, {
      data: observable,
      isSubmit: observable,
      isLoginForm: observable,
    });
  }

  resetLoginForm = (): void => {
    this.isLoginForm = true;
  };

  getProfileData = async (): Promise<void> => {
    // TODO try to use just axios for easy unit tests
    const result: User = await api(getProfile);

    runInAction(() => {
      this.data = result;
    });
  };

  signIn = async ({ login }: SignInFormValues): Promise<void> => {
    try {
      this.isSubmit = true;
      await api(postLogin, undefined, login);
      this.isLoginForm = !document.cookie.includes('token');
    } finally {
      this.isSubmit = false;
    }
  };
}

export default new UserStore();
