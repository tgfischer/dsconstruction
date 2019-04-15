import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/blueGrey";

export default createMuiTheme({
  palette: {
    primary: { light: blue[500], main: blue[500], dark: blue[500] },
    secondary: {
      light: grey[900],
      main: grey[900],
      dark: grey[900]
    }
  },
  overrides: {
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
