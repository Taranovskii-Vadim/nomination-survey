import { makeObservable, observable, runInAction } from "mobx";

import { api } from "src/api";
import postLogin from "src/api/postLogin";

import { User } from "./types";

import getProfile from "src/api/getProfile";

class UserStore {
  data: User = undefined;

  isLoading = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      data: observable,
    });
  }

  getProfileData = async (): Promise<void> => {
    try {
      this.isLoading = true;

      const result: User = await api(getProfile);

      runInAction(() => {
        this.data = result;
      });
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  };

  signIn = async (payload: string): Promise<void> => {
    try {
      const login = payload.trim();
      if (!login) throw new Error("Необходимо указать логин");

      this.isLoading = true;
      await api(postLogin, undefined, login);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
