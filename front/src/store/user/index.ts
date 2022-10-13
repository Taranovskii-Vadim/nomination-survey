import { makeObservable, observable, runInAction } from "mobx";

import { api } from "src/api";
import getToken from "src/api/postLogin";

import { User } from "./types";
import { getUserFromStorage } from "../../utils";

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
    const result: User = await api();

    runInAction(() => {
      this.data = result;
    });
  };

  getToken = async (payload: string): Promise<void> => {
    try {
      const login = payload.trim();
      if (!login) throw new Error("Необходимо указать логин");

      this.isLoading = true;
      await api(getToken, undefined, login);

      await this.getProfileData();
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
