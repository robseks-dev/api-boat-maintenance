import { Router } from "express";
import SpareController from "../controllers/spare.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/", catchAsync(SpareController.getAll));
route.post("/", catchAsync(SpareController.create));
route.put("/:id", catchAsync(SpareController.update));
route.delete("/:id", catchAsync(SpareController.delete));

export default route;
