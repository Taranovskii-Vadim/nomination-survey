import { extendTheme } from "@chakra-ui/react";

import { COLORS } from "./styles/constants";

export const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
  colors: { ...COLORS },
});
