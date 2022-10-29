import { makeObservable, observable, runInAction } from 'mobx';

import { api } from 'src/api';
import postLogin from 'src/api/postLogin';
import getProfile from 'src/api/getProfile';

import { getItem } from 'src/utils';

import { SignInFormValues, User } from './types';

const PROFILE_KEY = 'profile';

class UserStore {
  data: User = getItem(PROFILE_KEY);

  isLoading = false;

  isLoginForm = !document.cookie.includes('token');

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isLoginForm: observable,
    });
  }

  resetLoginForm = (): void => {
    this.isLoginForm = true;
  };

  getProfileData = async (): Promise<void> => {
    if (!this.data) {
      try {
        this.isLoading = true;

        const result: User = await api(getProfile);

        localStorage.setItem(PROFILE_KEY, JSON.stringify(result));

        runInAction(() => {
          this.data = result;
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  };

  signIn = async ({ login }: SignInFormValues): Promise<void> => {
    try {
      this.isLoading = true;
      await api(postLogin, undefined, login);
      this.isLoginForm = !document.cookie.includes('token');
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default new UserStore();
