import { Router } from "express";
import InspectionController from "../controllers/inspection.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/boat", catchAsync(InspectionController.getBoatToday));
route.post("/boat/date", catchAsync(InspectionController.getBoatByDate));

route.get("/passenger", catchAsync(InspectionController.getPassengerToday));
route.post("/passenger/date", catchAsync(InspectionController.getPassengerByDate));

route.post("/boat", catchAsync(InspectionController.createBoat));
route.post("/passenger", catchAsync(InspectionController.createPassenger));
route.post("/accident", catchAsync(InspectionController.createAccident));

export default route;
