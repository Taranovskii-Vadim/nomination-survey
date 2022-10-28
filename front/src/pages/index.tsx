import React, { lazy, Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import { getUrlFor } from '../routes';
import userStore from '../store/user';
import { getLoadingMessage } from '../utils';

import { Loader } from '../components/ui';

const Survey = lazy(() => import('./Survey'));
const General = lazy(() => import('./General'));

const ProtectedPages = (): JSX.Element => {
  useEffect(() => {
    userStore.getProfileData();
  }, []);

  if (userStore.isLoading || !userStore.data) {
    return <Loader text={getLoadingMessage('профиля')} />;
  }

  return (
    <Suspense fallback={<Loader text={getLoadingMessage('страницы')} />}>
      <Routes>
        <Route path={getUrlFor('surveys')} element={<General />} />
        <Route path={getUrlFor('surveys', 'surveyId')} element={<Survey />} />
      </Routes>
    </Suspense>
  );
};

export default observer(ProtectedPages);
