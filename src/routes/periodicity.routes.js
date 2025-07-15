import { Router } from "express";
import PeriodicityController from "../controllers/periodicity.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/", catchAsync(PeriodicityController.getAll));
route.post("/", catchAsync(PeriodicityController.create));

export default route;
