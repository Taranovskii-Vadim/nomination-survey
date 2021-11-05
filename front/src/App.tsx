import React from "react";

const App = (): JSX.Element => {
  return <div>hello {process.env.PREFIX}</div>;
};

export default App;
