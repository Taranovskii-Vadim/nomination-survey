import React from 'react';
import { observer } from 'mobx-react-lite';

import store from './store/user';

import ProtectedPages from './pages';
import Login from './components/Login';
import ThemeSwitcher from './components/ThemeSwitcher';

// TODO can write more powerfull unit test by changing api contract and mock axios module.
// We can remove some store tests and api tests
const App = (): JSX.Element => (
  <>
    <ThemeSwitcher />
    {store.isLoginForm ? <Login /> : <ProtectedPages />}
  </>
);

export default observer(App);
