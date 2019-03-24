import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/blueGrey";

export default createMuiTheme({
  palette: {
    primary: { light: red[500], main: red[500], dark: red[500] },
    secondary: {
      light: grey[900],
      main: grey[900],
      dark: grey[900]
    }
  },
  overrides: {
    MuiTypography: {
      h6: {
        textTransform: "uppercase"
      },
      h4: {
        textTransform: "uppercase"
      },
      h3: {
        textTransform: "uppercase"
      },
      body1: {
        textTransform: "uppercase"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
