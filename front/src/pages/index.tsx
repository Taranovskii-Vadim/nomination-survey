import React, { lazy, Suspense, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { DndProvider } from "react-dnd";
import { Switch, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getUrlFor } from "../routes";
import userStore from "../store/user";
import { getLoadingMessage } from "../utils";

import { Loader } from "../components/ui";

const Survey = lazy(() => import("./Survey"));
const General = lazy(() => import("./General"));

const ProtectedPages = (): JSX.Element => {
  useEffect(() => {
    userStore.getProfileData();
  }, []);

  if (userStore.isLoading || !userStore.data) {
    return <Loader text={getLoadingMessage("профиля")} />;
  }

  return (
    <Suspense fallback={<Loader text={getLoadingMessage("страницы")} />}>
      <Switch>
        <Route exact path={getUrlFor("surveys")}>
          <General />
        </Route>
        <Route path={getUrlFor("surveys", "surveyId")}>
          <Survey />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default observer(ProtectedPages);
