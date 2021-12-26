import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { getUrlFor } from "../routes";
import UserStore from "../store/userStore";

import { Loader } from "../components/ui";

const General = lazy(() => import("./General"));
const Survey = lazy(() => import("./Survey"));

interface Props {
  userStore: UserStore;
}

const ProtectedPages = ({ userStore }: Props) => {
  return (
    <Suspense fallback={<Loader text="Идет загрузка приложения..." />}>
      <Switch>
        <Route exact path={getUrlFor("surveys")}>
          <General userStore={userStore} />
        </Route>
        <Route path={getUrlFor("surveys", "surveyId")}>
          <Survey userStore={userStore} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default ProtectedPages;
