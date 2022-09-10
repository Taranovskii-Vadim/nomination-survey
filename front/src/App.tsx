import React from "react";
import { observer } from "mobx-react-lite";

import User from "./store/user";

import ProtectedPages from "./pages";
import Login from "./components/Login";
import ThemeSwitcher from "./components/ThemeSwitcher";

const store = new User();

// TODO drop for main window (hard)

// TODO mobile version (medium)

// TODO perfomance barChart and whole application (hard)

const App = (): JSX.Element => (
  <>
    <ThemeSwitcher />
    {store.data ? (
      <ProtectedPages userStore={store} />
    ) : (
      <Login isLoading={store.isLoading} getToken={store.getToken} />
    )}
  </>
);

export default observer(App);
