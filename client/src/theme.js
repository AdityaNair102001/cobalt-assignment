import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Chillax Variable",
  body: "Chillax Variable",
  mono: `monospace`,
};
// const fonts = {
//   heading: `'Open Sans', sans-serif`,
//   body: `'Raleway', sans-serif`,
//   mono: `monospace`,
// };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  colors: {
    black: {
      50: "#ADADBA",
      100: "#A2A2B0",
      200: "#8C8C9E",
      300: "#75758B",
      400: "#636375",
      500: "#50505F",
      600: "#363641",
      700: "#1D1D22",
      800: "#030304",
      900: "#000000",
    },
    brand: {
      white: "#FFFBEB",
      blue1: "#495579",
      blue2: "#263159",
      blue3: "#251749",
    },
  },
  fonts,
  breakpoints,
  styles: {
    global: () => ({
      body: {},
    }),
  },
});

export default theme;
