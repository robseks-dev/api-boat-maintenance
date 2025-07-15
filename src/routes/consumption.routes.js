import { Router } from "express";
import ConsumptionController from "../controllers/consumption.controller.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

route.post("/", upload.single("image"), catchAsync(ConsumptionController.create));

export default route;
