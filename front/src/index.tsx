import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";
import { stores } from "./store";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
