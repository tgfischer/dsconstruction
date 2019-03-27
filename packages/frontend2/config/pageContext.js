import { SheetsRegistry } from "jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import theme from "../themes/default";

const createPageContext = () => ({
  theme,
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName()
});

let pageContext;

export default () => {
  if (!process.browser) {
    return createPageContext();
  }

  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
};
