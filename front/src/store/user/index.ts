import { makeObservable, observable, runInAction } from "mobx";

import { api } from "src/api";
import getToken from "src/api/getToken";

import { User } from "./types";
import { getUserFromStorage } from "../../utils";

class UserStore {
  data: User = undefined;

  isLoading = false;

  constructor() {
    const userResult = getUserFromStorage();

    if (userResult) {
      const { id, role } = userResult;
      this.data = { id, role };
    }

    makeObservable(this, {
      isLoading: observable,
      data: observable,
    });
  }

  getToken = async (payload: string): Promise<void> => {
    try {
      const login = payload.trim();
      if (!login) throw new Error("Необходимо указать логин");

      this.isLoading = true;
      const result: User = await api(getToken, undefined, login);

      runInAction(() => {
        this.data = result;
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
