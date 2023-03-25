const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);
const DishesController = require("../controllers/DishesController");
const DishImgController = require("../controllers/DishImgController");

const dishesRoutes = Router();

const dishesController = new DishesController();
const dishImgController = new DishImgController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id",dishesController.show);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.patch("/image/:id", upload.single("image"), dishImgController.update);
dishesRoutes.put("/:id", dishesController.att)




module.exports = dishesRoutes;