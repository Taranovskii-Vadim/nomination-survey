import { makeObservable, observable } from "mobx";

class User {
  token: string = "";

  isLoading = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      token: observable,
    });
  }

  getToken = async (login: string): Promise<void> => {
    try {
      this.isLoading = true;
      this.token = login;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };
}

export default new User();
