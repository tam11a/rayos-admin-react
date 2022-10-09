// 314C3D -> Dark Green
// D5E4DB -> Light Green

import { createTheme } from "@mui/material/styles";

// colors
const primary = "#314C3D";
const primaryLight = "#D5E4DB";
const black = "#252E42";
const blackDark = "#1F283B";
const blackLight = "#2F3B52";

// breakpoints
const breakpoints = {
  // for responsiveness
  values: {
    xs: 0,
    xms: 380,
    sm: 600, // Phone
    md: 900, // Tablet/Laptop
    lg: 1200, // Desktop
    xl: 1536,
  },
};
const theme = createTheme({
  breakpoints: breakpoints,
  palette: {
    primary: {
      main: primary,
      contrastText: primaryLight,
    },
    secondary: {
      main: primaryLight,
      contrastText: primary,
    },
    black: {
      main: black,
      dark: blackDark,
      light: blackLight,
      search: "#2C3448",
      contrastText: "#fff",
    },
    error: {
      main: "#e86161",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      contrastText: "#2C3448",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "2px",
          fontWeight: "500",
        },
      },
    },
  },
});

theme.typography.normal = {
  ...theme.typography.subtitle2,
  textAlign: "justify",
  fontWeight: "light",
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
};

export default theme;
