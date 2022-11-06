import React, { Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import { getRouteData } from 'src/routes';
import userStore from '../store/user';

import Loader from '../components/ui/Loader';

const ProtectedPages = (): JSX.Element => {
  useEffect(() => {
    userStore.getProfileData();
  }, []);

  if (!userStore.data) {
    return <Loader text="профиля" />;
  }

  return (
    <Suspense fallback={<Loader text="страницы" />}>
      <Routes>
        {getRouteData().map(({ id, ...props }) => (
          <Route key={id} {...props} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default observer(ProtectedPages);
