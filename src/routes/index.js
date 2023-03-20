const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const sessionsRouter = require("./sessions.routes");
const ordersRouter = require("./orders.routes");
const ordersAdmRouter = require("./orders.adm.routes");
const favoritesRouter = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/orders", ordersRouter);
routes.use("/ordersAdm", ordersAdmRouter);
routes.use("/favorites", favoritesRouter);

module.exports = routes;