import { extendTheme } from "@chakra-ui/react";

import { COLORS } from "./styles/constants";

export const theme = extendTheme({
  colors: { ...COLORS },
});
