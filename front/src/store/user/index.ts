import { makeObservable, observable, runInAction } from 'mobx';

import { api } from 'src/api';
import postLogin from 'src/api/postLogin';
import getUserRole from 'src/api/getUserRole';

import { SignInFormValues, UserRole } from './types';

class UserStore {
  data: UserRole = undefined;

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
    const result = await api(getUserRole);

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
