import React from "react";
import { observer } from "mobx-react-lite";

import User from "./store/user";

import ProtectedPages from "./pages";
import Login from "./pages/Login";
import ThemeSwitcher from "./components/ThemeSwitcher";

const userStore = new User();

// TODO drop for main window (hard)

// TODO mobile version (medium)

// TODO perfomance barChart and whole application (hard)

const App = (): JSX.Element => (
  <>
    <ThemeSwitcher />
    {userStore.data ? (
      <ProtectedPages userStore={userStore} />
    ) : (
      <Login isLoading={userStore.isLoading} getToken={userStore.getToken} />
    )}
  </>
);

export default observer(App);
