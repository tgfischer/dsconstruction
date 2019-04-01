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
      h6: {
        textTransform: "uppercase"
      },
      h4: {
        textTransform: "uppercase"
      },
      h3: {
        textTransform: "uppercase"
      },
      h2: {
        textTransform: "uppercase"
      },
      h1: {
        textTransform: "uppercase"
      },
      title: {
        textTransform: "uppercase"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
