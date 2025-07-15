import { Router } from "express";
import PartController from "../controllers/part.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/", catchAsync(PartController.getAll));
route.get("/list", catchAsync(PartController.getGroup));
route.get("/boat/:id", catchAsync(PartController.getByBoat));
route.get("/boat-keys/:id", catchAsync(PartController.getKeysByBoat));

route.post("/", catchAsync(PartController.create));

route.put("/:id", catchAsync(PartController.update));

route.delete("/:id", catchAsync(PartController.delete));

export default route;
