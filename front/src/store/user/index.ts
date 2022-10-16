import { makeObservable, observable, runInAction } from "mobx";

import { api } from "src/api";
import postLogin from "src/api/postLogin";
import getProfile from "src/api/getProfile";

import { getItem } from "src/utils";

import { User } from "./types";

const PROFILE_KEY = "profile";

class UserStore {
  data: User = getItem(PROFILE_KEY);

  isLoading = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      data: observable,
    });
  }

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
