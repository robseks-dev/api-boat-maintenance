import { Router } from "express";
import BoatController from "../controllers/boat.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/", catchAsync(BoatController.getAll));
route.get("/list", catchAsync(BoatController.getGroup));

route.post("/", catchAsync(BoatController.create));

route.put("/:id", catchAsync(BoatController.update));

route.delete("/:id", catchAsync(BoatController.delete));

export default route;
