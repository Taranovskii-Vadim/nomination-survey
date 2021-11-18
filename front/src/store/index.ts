import User from "./userStore";

export interface Stores {
  userStore: User;
}

export const stores: Stores = { userStore: new User() };
