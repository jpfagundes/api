const { Router } = require("express");

const usersRouter = require("./users.routes");
const platesRouter = require("./plates.routes");
const ingredientsRouter = require("./ingredients.routes");
const sessionsRouter = require("./sessions.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/plates", platesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);




module.exports = routes;