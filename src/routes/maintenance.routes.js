import { Router } from "express";
import MaintenanceController from "../controllers/maintenance.controller.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = Router();

route.get("/", catchAsync(MaintenanceController.getAll));
route.get("/part/:id", catchAsync(MaintenanceController.getByPart));
route.get("/count/:id", catchAsync(MaintenanceController.getCountByPart));

route.post("/", upload.single("evidence"), catchAsync(MaintenanceController.create));
route.post("/invoice", catchAsync(MaintenanceController.generateInvoice));

export default route;
