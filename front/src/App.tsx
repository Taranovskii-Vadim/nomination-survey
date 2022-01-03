import React from "react";
import { observer } from "mobx-react-lite";

import User from "./store/userStore";

import ProtectedPages from "./pages";
import Login from "./pages/Login";

const userStore = new User();

// TODO perfomance barChart
// TODO bug with chart begins with min not from zero

const App = (): JSX.Element =>
  userStore.data ? (
    <ProtectedPages userStore={userStore} />
  ) : (
    <Login isLoading={userStore.isLoading} getToken={userStore.getToken} />
  );

export default observer(App);
