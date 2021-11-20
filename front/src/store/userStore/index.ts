import { makeObservable, observable } from "mobx";

class User {
  token: string = "";

  constructor() {
    makeObservable(this, {
      token: observable,
    });
  }

  getToken = async (login: string): Promise<void> => {
    try {
      this.token = login;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new User();
