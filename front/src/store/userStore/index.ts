import { makeObservable, observable, runInAction } from "mobx";

import { api } from "../../routes/api";
import { UserApiResponse } from "./types";
import { getUserFromStorage } from "../../utils";
import getUserToken from "../../routes/api/getUserToken";

class UserStore {
  data: UserApiResponse = undefined;

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

  getToken = async (login: string): Promise<void> => {
    try {
      if (!login) throw new Error("Необходимо указать логин");
      this.isLoading = true;
      const apiResult: UserApiResponse = await api(getUserToken, undefined, {
        login,
      });

      runInAction(() => {
        this.data = apiResult;
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
