import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import BoatRoutes from "./routes/boat.routes.js";
import PartRoutes from "./routes/part.routes.js";
import ConsumptionRoutes from "./routes/consumption.routes.js";
import StatisticsRoutes from "./routes/statistics.routes.js";
import PeriodicityRoutes from "./routes/periodicity.routes.js";
import MaintenanceRoutes from "./routes/maintenance.routes.js";
import SpareRoutes from "./routes/spare.routes.js";
import InspectionRoutes from "./routes/inspection.route.js";
import UserRoutes from "./routes/user.routes.js";
import AuthRoutes from "./routes/auth.routes.js";

import handleGlobalError from "./middlewares/error.controller.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cookieParser());

const whitelist = [
  "https://boraboraboat.app/",
  "https://boraboraboat.app",
  "https://www.boraboraboat.app/",
  "https://www.boraboraboat.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/boats", BoatRoutes);
app.use("/api/v1/parts", PartRoutes);
app.use("/api/v1/consumptions", ConsumptionRoutes);
app.use("/api/v1/statistics", StatisticsRoutes);
app.use("/api/v1/periodicities", PeriodicityRoutes);
app.use("/api/v1/maintenances", MaintenanceRoutes);
app.use("/api/v1/spares", SpareRoutes);
app.use("/api/v1/inspection", InspectionRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);

app.use(handleGlobalError);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error(err);
}
