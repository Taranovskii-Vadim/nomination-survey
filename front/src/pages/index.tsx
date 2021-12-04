import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import { getUrlFor } from "../routes";

const General = lazy(() => import("./General"));
const Survey = lazy(() => import("./Survey"));

const ProtectedPages = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      {/* TODO move to level below */}
      <Container as="main" maxWidth="container.md">
        <Switch>
          <Route exact path={getUrlFor("surveys")} component={General} />
          <Route path={getUrlFor("surveys", "surveyId")} component={Survey} />
        </Switch>
      </Container>
      {/* <footer></footer> */}
    </Suspense>
  );
};

export default ProtectedPages;
