import { createMuiTheme } from "@material-ui/core/styles";
import primary from "@material-ui/core/colors/blue";
import secondary from "@material-ui/core/colors/grey";

export default createMuiTheme({
  palette: {
    primary: {
      light: primary[800],
      main: primary[800],
      dark: primary[800]
    },
    secondary: {
      light: secondary[900],
      main: secondary[900],
      dark: secondary[900]
    }
  },
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "none"
      }
    },
    MuiTypography: {
      h4: {
        textTransform: "uppercase",
        fontWeight: 700
      },
      h3: {
        textTransform: "uppercase",
        fontWeight: 700
      },
      h2: {
        textTransform: "uppercase",
        fontWeight: 700
      },
      h1: {
        textTransform: "uppercase",
        fontWeight: 700
      },
      title: {
        textTransform: "uppercase",
        fontWeight: 700
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
