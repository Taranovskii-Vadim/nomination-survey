import { makeObservable } from "mobx";

class User {
  constructor() {
    makeObservable(this, {});
  }

  async getToken(login: string): Promise<void> {
    try {
      if (!login) throw new Error("Заполните поле");
      console.log(login);
    } catch (e) {
      console.log(e);
    }
  }
}

export default User;
