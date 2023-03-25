const { Router } = require("express")

const ordersAdmRoutes = Router()

const OrdersAdmController = require("../controllers/OrdersAdmController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersAdmController = new OrdersAdmController()

ordersAdmRoutes.use(ensureAuthenticated)

ordersAdmRoutes.get("/", ordersAdmController.index)
ordersAdmRoutes.put("/:id", ordersAdmController.change)

module.exports = ordersAdmRoutes
