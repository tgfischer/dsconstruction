const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("login", "/login");
routes.add("reset", "/reset/:type");
