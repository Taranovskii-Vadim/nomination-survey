import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { getUrlFor } from "./routes";

const General = lazy(() => import("./pages/General"));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <header></header>
      <main>
        <Switch>
          {/* <Route exact path={getUrlFor("loginPage")}>
            1
          </Route> */}
          <Route path={getUrlFor("surveys")} component={General} />
          {/* <Route path={getUrlFor("surveys", "surveyId")} /> */}
        </Switch>
      </main>
      <footer></footer>
    </Suspense>
  );
};

export default App;
