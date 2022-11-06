import { extendTheme } from '@chakra-ui/react';

export const COLORS = {
  primary: 'teal.400',
  primaryLight: 'teal.300',
  white: '#ffffff',
  black: '#000000',
  gray: 'gray.400',
};

export const template = {
  components: {
    Button: {
      variants: {
        solid: () => ({
          bg: COLORS.primary,
          color: COLORS.white,
          '&:hover': {
            bg: COLORS.primaryLight,
          },
          '&:disabled': {
            bg: COLORS.primaryLight,
            '&:hover': {
              bg: COLORS.primaryLight,
            },
          },
        }),
      },
    },
  },
  styles: {
    global: {
      body: {
        position: 'static',
      },
    },
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
};

export const theme = extendTheme(template);
