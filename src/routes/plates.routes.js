const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const PlatesController = require("../controllers/PlatesController");
const PlateImgController = require("../controllers/PlateImgController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const platesController = new PlatesController();
const plateImgController = new PlateImgController();

platesRoutes.get("/", platesController.index);
platesRoutes.post("/", platesController.create);
platesRoutes.get("/:id", platesController.show);
platesRoutes.delete("/:id", platesController.delete);
platesRoutes.patch("/image/:id",ensureAuthenticated, upload.single("image"), plateImgController.update);

module.exports = platesRoutes;