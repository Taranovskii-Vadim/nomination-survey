import React, { lazy, Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";

import { getUrlFor } from "../routes";
import { getLoadingMessage } from "../utils";
import UserStore from "../store/userStore";

import { Loader } from "../components/ui";

const General = lazy(() => import("./General"));
const Survey = lazy(() => import("./Survey"));

interface Props {
  userStore: UserStore;
}

const ProtectedPages = ({ userStore }: Props) => {
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

export default ProtectedPages;
