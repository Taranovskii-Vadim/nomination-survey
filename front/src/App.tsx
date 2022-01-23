import React from "react";
import { observer } from "mobx-react-lite";

import User from "./store/userStore";

import ProtectedPages from "./pages";
import Login from "./pages/Login";

const userStore = new User();

// TODO dark theme and customize chakra theme (easy)

// TODO drop for main window (hard)

// TODO mobile version (medium)

// TODO perfomance barChart and whole application (hard)

const App = (): JSX.Element =>
  userStore.data ? (
    <ProtectedPages userStore={userStore} />
  ) : (
    <Login isLoading={userStore.isLoading} getToken={userStore.getToken} />
  );

export default observer(App);
