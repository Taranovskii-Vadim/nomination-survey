import React from "react";
import { observer } from "mobx-react-lite";

import user from "./store/userStore";

import ProtectedPages from "./pages";
import Login from "./pages/Login";

const App = observer(
  (): JSX.Element =>
    user.token ? (
      <ProtectedPages />
    ) : (
      <Login isLoading={user.isLoading} getToken={user.getToken} />
    )
);

export default App;
