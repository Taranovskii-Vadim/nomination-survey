import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";

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
    <Suspense fallback={<Loader />}>
      {/* TODO move to level below */}
      <Container as="main" maxWidth="container.md">
        <Switch>
          <Route exact path={getUrlFor("surveys")} component={General} />
          <Route path={getUrlFor("surveys", "surveyId")}>
            <Survey userStore={userStore} />
          </Route>
        </Switch>
      </Container>
      {/* <footer></footer> */}
    </Suspense>
  );
};

export default ProtectedPages;
