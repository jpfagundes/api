const { Router } = require("express")

const ordersRoutes = Router()

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post("/", ordersController.create)

module.exports = ordersRoutes
