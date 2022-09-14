import React, { lazy, Suspense } from "react";
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

const ProtectedPages = ({ userStore }: Props): JSX.Element => (
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

export default ProtectedPages;
