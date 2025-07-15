import { Router } from "express";
import StatisticsController from "../controllers/statistics.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.post("/month", catchAsync(StatisticsController.getByMonth));
route.post("/year", catchAsync(StatisticsController.getByYear));

route.post("/tanking/month", catchAsync(StatisticsController.getTankingByMonth));
route.post("/navigation/month", catchAsync(StatisticsController.getNavigationByMonth));
route.post("/preventive/month", catchAsync(StatisticsController.getPreventiveByMonth));
route.post("/corrective/month", catchAsync(StatisticsController.getCorrectiveByMonth));

route.post("/tanking/year", catchAsync(StatisticsController.getTankingByYear));
route.post("/navigation/year", catchAsync(StatisticsController.getNavigationByYear));
route.post("/preventive/year", catchAsync(StatisticsController.getPreventiveByYear));
route.post("/corrective/year", catchAsync(StatisticsController.getCorrectiveByYear));

export default route;
