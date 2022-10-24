import React from "react";
import { observer } from "mobx-react-lite";

import store from "./store/user";

import ProtectedPages from "./pages";
import Login from "./components/Login";
import ThemeSwitcher from "./components/ThemeSwitcher";

// TODO drop for main window (hard)

// TODO mobile version (medium)

// TODO perfomance barChart and whole application (hard)

const App = (): JSX.Element => (
  <>
    <ThemeSwitcher />
    {store.isLoginForm ? (
      <Login isLoading={store.isLoading} onLogin={store.signIn} />
    ) : (
      <ProtectedPages />
    )}
  </>
);

export default observer(App);
