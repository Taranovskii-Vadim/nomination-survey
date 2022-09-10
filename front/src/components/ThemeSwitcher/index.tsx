import React from "react";
import { createPortal } from "react-dom";
import { Box, useColorMode } from "@chakra-ui/react";

import { COLORS } from "src/styles/theme";
import { MoonIcon, SunIcon } from "../icons";

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitcherIcon = colorMode === "dark" ? MoonIcon : SunIcon;

  const Component = (
    <Box
      cursor="pointer"
      position="absolute"
      bottom="30px"
      right="30px"
      width="60px"
      height="60px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      backgroundColor={COLORS["primary"]}
      onClick={() => toggleColorMode()}
    >
      <SwitcherIcon size={8} color={COLORS["white"]} />
    </Box>
  );

  return createPortal(Component, document.querySelector("body"));
};

export default ThemeSwitcher;
