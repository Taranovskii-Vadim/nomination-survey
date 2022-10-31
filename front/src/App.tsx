import React from 'react';
import { observer } from 'mobx-react-lite';

import store from './store/user';

import ProtectedPages from './pages';
import Login from './components/Login';
import ThemeSwitcher from './components/ThemeSwitcher';

// TODO drop for main window (hard)

// TODO mobile version (medium)

const App = (): JSX.Element => (
  <>
    <ThemeSwitcher />
    {store.isLoginForm ? <Login /> : <ProtectedPages />}
  </>
);

export default observer(App);
