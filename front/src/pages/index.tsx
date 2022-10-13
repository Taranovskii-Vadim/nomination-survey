import React, { lazy, Suspense, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { DndProvider } from "react-dnd";
import { Switch, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getUrlFor } from "../routes";
import UserStore from "../store/user";
import { getLoadingMessage } from "../utils";

import { Loader } from "../components/ui";

const Survey = lazy(() => import("./Survey"));
const General = lazy(() => import("./General"));

interface Props {
  userStore: UserStore;
}

const ProtectedPages = ({ userStore }: Props): JSX.Element => {
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
          <DndProvider backend={HTML5Backend}>
            <General userStore={userStore} />
          </DndProvider>
        </Route>
        <Route path={getUrlFor("surveys", "surveyId")}>
          <Survey userStore={userStore} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default observer(ProtectedPages);
